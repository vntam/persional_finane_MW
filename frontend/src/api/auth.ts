import { axiosClient } from './axiosClient';
import type { Tokens } from '../lib/tokens';

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type AuthResponse = {
  user: AuthUser;
  tokens: Tokens;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    '/auth/login',
    payload
  );

  return response.data;
}

export async function register(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    '/auth/register',
    payload
  );

  return response.data;
}
