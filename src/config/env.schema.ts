import { z } from 'zod';
import { EnvVariableName, NodeEnv } from './env-variables.enum';

const envPort = (name: EnvVariableName, example: number) => {
  const error = `Set Env variable ${name}, example: ${example}`;

  return z.coerce.number({ error }).int({ error }).positive({ error });
};

export const envSchema = z.object({
  NODE_ENV: z.enum(NodeEnv, { error: 'Incorrect NODE_ENV value' }),
  PORT: envPort(EnvVariableName.PORT, 3000),
  INCLUDE_TESTING_MODULE: z
    .enum(['true', 'false', '1', '0', 'enabled', 'disabled'], {
      error:
        'Set Env variable INCLUDE_TESTING_MODULE to enable/disable Dangerous for production TestingModule, example: true, available values: true, false, 0, 1, enabled, disabled',
    })
    .transform((value) => ['true', '1', 'enabled'].includes(value)),
  POSTGRES_DB: z.string().min(1, {
    error: `Set Env variable ${EnvVariableName.POSTGRES_DB}, example: my-postgres-db`,
  }),
  POSTGRES_USER: z.string().min(1, {
    error: `Set Env variable ${EnvVariableName.POSTGRES_USER}, example: my-postgres-user`,
  }),
  POSTGRES_PASSWORD: z.string().min(1, {
    error: `Set Env variable ${EnvVariableName.POSTGRES_PASSWORD}, example: my-postgres-password`,
  }),
  POSTGRES_PORT: envPort(EnvVariableName.POSTGRES_PORT, 5432),
});

export type EnvConfig = z.infer<typeof envSchema>;
