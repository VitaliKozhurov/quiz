export const USER_CONSTRAINTS = {
  LOGIN: 'uq_users_login',
  EMAIL: 'uq_users_email',
} as const;

export const USER_UNIQUE_CONSTRAINTS_EXTENSIONS = {
  [USER_CONSTRAINTS.LOGIN]: { field: 'login', message: 'Login already exists' },
  [USER_CONSTRAINTS.EMAIL]: { field: 'email', message: 'Email already exists' },
} as const;
