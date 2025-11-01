import type { Tokens } from '../lib/tokens';

export type ApiError = {
  error?: {
    message?: string;
  };
};

export type AuthSuccess = {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  tokens: Tokens;
};
