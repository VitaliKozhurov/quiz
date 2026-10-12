import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariableName, NodeEnv } from './env-variables.enum';
import { EnvConfig } from './env.schema';

@Injectable()
export class AppConfigService {
  readonly env: NodeEnv;
  readonly port: number;
  readonly includeTestingModule: boolean;
  readonly postgresDB: string;
  readonly postgresUser: string;
  readonly postgresPassword: string;
  readonly postgresPort: number;

  constructor(private readonly configService: ConfigService<EnvConfig, true>) {
    this.env = this.configService.get(EnvVariableName.NODE_ENV, {
      infer: true,
    });
    this.port = this.configService.get(EnvVariableName.PORT, {
      infer: true,
    });
    this.includeTestingModule = this.configService.get(
      EnvVariableName.INCLUDE_TESTING_MODULE,
      { infer: true },
    );
    this.postgresDB = this.configService.get(EnvVariableName.POSTGRES_DB, {
      infer: true,
    });
    this.postgresUser = this.configService.get(EnvVariableName.POSTGRES_USER, {
      infer: true,
    });
    this.postgresPassword = this.configService.get(
      EnvVariableName.POSTGRES_PASSWORD,
      { infer: true },
    );
    this.postgresPort = this.configService.get(EnvVariableName.POSTGRES_PORT, {
      infer: true,
    });
  }
}
