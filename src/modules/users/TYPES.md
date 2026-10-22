# Типы и маппинг в модуле users

Этот документ описывает рекомендуемые контракты для CQRS-запроса списка
пользователей. Это целевая структура: она не означает, что все показанные
типы уже реализованы в модуле.

## Направление зависимостей

```text
API -> application <- infrastructure
                    |
                  domain
```

- `api` знает HTTP, Zod и JSON-представление.
- `application` описывает сценарий чтения и его данные.
- `infrastructure` реализует доступ к TypeORM/PostgreSQL.
- `domain` не зависит от остальных слоёв.

Внешние слои могут импортировать типы из `application`. Обратный импорт —
например, из `application` в `api` — нарушает это направление.

## Типы API

HTTP-вход валидируется Zod-схемой в `api/schemas`.

```ts
// api/schemas/get-users.schema.ts
export type GetUsersQueryDto = {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: UsersSortField;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};
```

Тип HTTP-ответа принадлежит `api/dto`, потому что описывает публичный JSON
контракт. Даты обычно отдаются строками в ISO 8601.

```ts
// api/dto/get-users.response.dto.ts
export type UserResponseDto = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type GetUsersResponseDto = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserResponseDto[];
};
```

## Типы application

`GetUsersParams` — вход use case. Он не является HTTP DTO и не импортирует
Zod или типы из `api`.

```ts
// application/queries/get-users/get-users.query.ts
export type GetUsersParams = {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: UsersSortField;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};

export class GetUsersQuery extends Query<UsersListReadModel> {
  constructor(public readonly params: GetUsersParams) {
    super();
  }
}
```

`UsersListReadModel` — результат сценария чтения. Это не TypeORM entity и не
HTTP DTO. Он содержит только данные, требуемые для списка.

```ts
// application/queries/get-users/get-users.read-model.ts
export type UserListItemReadModel = {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
};

export type UsersListReadModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserListItemReadModel[];
};
```

`UsersSortField` и `SortDirection` должны быть доступны application-слою без
импорта из API. Если сортировка используется только в users, держите
`UsersSortField` рядом с query; если используется в нескольких модулях,
`SortDirection` может остаться в `core/query`.

## Контракт репозитория

Application зависит от порта репозитория, а не от `Repository<UserEntity>`.
Входной и выходной типы можно переиспользовать: они выражают условия поиска и
read model сценария.

```ts
// application/queries/get-users/users-query.repository.ts
export abstract class UsersQueryRepository {
  abstract findUsers(
    params: GetUsersParams,
  ): Promise<UsersListReadModel>;
}
```

TypeORM-реализация находится в `infrastructure/typeorm`. Ей разрешено
импортировать application-контракты, поскольку infrastructure — внешний слой.

```ts
// infrastructure/typeorm/users.repository.ts
export class TypeOrmUsersRepository implements UsersQueryRepository {
  async findUsers(
    params: GetUsersParams,
  ): Promise<UsersListReadModel> {
    // Преобразовать params в TypeORM query.
    // Выбрать только id, login, email и createdAt.
    // Не возвращать UserEntity целиком.
  }
}
```

Отдельный технический тип для репозитория нужен только если ему требуются
детали, которые не должны покидать infrastructure: например, `withDeleted`,
блокировка строк или конкретные relations.

## API mapper

Mapper принадлежит `api`: он знает оба края преобразования — API DTO и
application-контракты. Для простых чистых преобразований не нужен Nest
provider или `@Injectable()`.

```ts
// api/mappers/users-api.mapper.ts
export class UsersApiMapper {
  static toGetUsersParams(dto: GetUsersQueryDto): GetUsersParams {
    return {
      searchLoginTerm: dto.searchLoginTerm,
      searchEmailTerm: dto.searchEmailTerm,
      sortBy: dto.sortBy,
      sortDirection: dto.sortDirection,
      pageNumber: dto.pageNumber,
      pageSize: dto.pageSize,
    };
  }

  static toGetUsersResponse(
    model: UsersListReadModel,
  ): GetUsersResponseDto {
    return {
      pagesCount: model.pagesCount,
      page: model.page,
      pageSize: model.pageSize,
      totalCount: model.totalCount,
      items: model.items.map((user) => ({
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      })),
    };
  }
}
```

Если mapper использует конфигурацию, локализацию или другой сервис, его можно
сделать API provider'ом и внедрить в контроллер. Это не меняет его слой.

## Поток данных

```text
GetUsersQueryDto
  -> UsersApiMapper.toGetUsersParams
  -> GetUsersQuery(GetUsersParams)
  -> GetUsersQueryHandler
  -> UsersQueryRepository.findUsers
  -> UsersListReadModel
  -> UsersApiMapper.toGetUsersResponse
  -> GetUsersResponseDto
```

## Безопасность контрактов

`passwordHash`, одноразовые коды, токены и иные чувствительные поля не должны
попадать в `UserListItemReadModel` или `UserResponseDto`. Для логина допустим
отдельный внутренний контракт, например `UserCredentialsReadModel`, потому что
ему действительно нужен `passwordHash` для `PasswordHasher.compare`.

Не следует полагаться только на сериализацию или `@Exclude()`: безопаснее не
выбирать такие поля для списка пользователей и не включать их в типы
результата.

## Краткая таблица

| Тип | Расположение | Назначение |
| --- | --- | --- |
| `GetUsersQueryDto` | `api/schemas` | Валидированный HTTP query-параметр |
| `GetUsersResponseDto` | `api/dto` | Публичный JSON-ответ endpoint |
| `GetUsersParams` | `application/queries/get-users` | Вход сценария чтения |
| `UsersListReadModel` | `application/queries/get-users` | Результат сценария и репозитория |
| `UserListItemReadModel` | `application/queries/get-users` | Один пользователь в результате списка |
| `UsersQueryRepository` | `application/queries/get-users` | Порт чтения пользователей |
