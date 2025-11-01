import { AxiosError } from 'axios';

type ErrorWithMessage = {
  error?: {
    message?: string;
  };
  message?: string;
};

export function extractErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorWithMessage | undefined;
    return data?.error?.message ?? data?.message ?? fallback;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: string }).message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  return fallback;
}
