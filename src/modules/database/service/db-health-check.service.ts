import {
  Inject,
  Injectable,
  type LoggerService,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const DATABASE_LOGGER = Symbol('DATABASE_LOGGER');

@Injectable()
export class DatabaseHealthCheck implements OnApplicationBootstrap {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @Inject(DATABASE_LOGGER)
    private readonly logger: LoggerService,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.dataSource.query('SELECT 1');
      this.logger.log('✅ PostgreSQL database connected successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      this.logger.error(
        `❌ PostgreSQL database connection check failed: ${message}`,
      );

      throw error;
    }
  }

  onApplicationShutdown() {
    this.logger.log('PostgreSQL connection closed');
  }
}
