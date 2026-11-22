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
