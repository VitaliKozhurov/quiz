import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { configValidationUtility } from './config-validation.utility';
import { EnvVariableName, NodeEnv } from './env-variables.enum';

type EnvConfig = Record<EnvVariableName, string>;

@Injectable()
export class CoreConfig {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {
    this.env = this.configService.get(EnvVariableName.NODE_ENV);
    this.port = Number(this.configService.get(EnvVariableName.PORT));
    this.mongoURI = this.configService.get(EnvVariableName.MONGO_DB_URL);
    this.includeTestingModule = configValidationUtility.convertToBoolean(
      this.configService.get(EnvVariableName.INCLUDE_TESTING_MODULE),
    ) as boolean;
    this.postgresDB = this.configService.get(EnvVariableName.POSTGRES_DB);
    this.postgresUser = this.configService.get(EnvVariableName.POSTGRES_USER);
    this.postgresPassword = this.configService.get(
      EnvVariableName.POSTGRES_PASSWORD,
    );
    this.postgresPort = Number(
      this.configService.get(EnvVariableName.POSTGRES_PORT),
    );

    configValidationUtility.validateConfig(this);
  }

  @IsNumber(
    {},
    {
      message: 'Set Env variable PORT, example: 3000',
    },
  )
  port: number;

  @IsNotEmpty({
    message: `Set Env variable ${EnvVariableName.MONGO_DB_URL}, example: mongodb://localhost:27017/my-app-local-db`,
  })
  mongoURI: string;

  @IsEnum(NodeEnv, {
    message:
      'Set correct NODE_ENV value, available values: ' +
      configValidationUtility.getEnumValues(NodeEnv).join(', '),
  })
  env: NodeEnv;

  @IsBoolean({
    message:
      'Set Env variable INCLUDE_TESTING_MODULE to enable/disable Dangerous for production TestingModule, example: true, available values: true, false, 0, 1',
  })
  includeTestingModule: boolean;

  @IsNotEmpty({
    message: `Set Env variable ${EnvVariableName.POSTGRES_DB}, example: my-postgres-db`,
  })
  postgresDB: string;

  @IsNotEmpty({
    message: `Set Env variable ${EnvVariableName.POSTGRES_USER}, example: my-postgres-user`,
  })
  postgresUser: string;

  @IsNotEmpty({
    message: `Set Env variable ${EnvVariableName.POSTGRES_PASSWORD}, example: my-postgres-password`,
  })
  postgresPassword: string;

  @IsNumber(
    {},
    {
      message: `Set Env variable ${EnvVariableName.POSTGRES_PORT}, example: 5432`,
    },
  )
  postgresPort: number;
}
