const Errors = {
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  INVALID_TOKEN: 'Invalid token',
  MISSING_TOKEN: 'Missing token',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  MISSING_REFRESH_TOKEN: 'Missing refresh token',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_EMAIL: 'Invalid email',
} as const;

export default Errors;
