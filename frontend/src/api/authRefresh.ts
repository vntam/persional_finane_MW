import axios from 'axios';
import {
  getRefreshToken,
  setTokens,
  clearTokens,
  type Tokens,
} from '../lib/tokens';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export async function refreshTokens(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post<{ tokens: Tokens }>(
      `${baseURL}/auth/refresh`,
      { refreshToken }
    );

    const { tokens } = response.data;
    setTokens(tokens);
    return tokens.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}
