import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  // При repository.softRemove() или repository.softDelete() строка физически остаётся в БД, но в deletedAt записывается дата удаления.
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  // Версия записи для optimistic locking — защиты от конфликтов параллельного редактирования. При каждом обновлении TypeORM увеличивает её на 1.
  @VersionColumn()
  version: number;
}
