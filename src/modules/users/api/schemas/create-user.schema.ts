import z from 'zod';

const LOGIN_REGEX = /^[a-zA-Z0-9_-]*$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const createUserSchema = z.object({
  login: z
    .string()
    .min(3, { error: 'Too small length' })
    .max(10, { error: 'To large ' })
    .regex(LOGIN_REGEX, { error: 'Incorrect login pattern' }),
  password: z
    .string()
    .min(6, { error: 'Too small length' })
    .max(20, { error: 'To large ' }),
  email: z.string().regex(EMAIL_REGEX, { error: 'Incorrect login pattern' }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
