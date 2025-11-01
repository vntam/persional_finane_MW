import { Router } from 'express';
import type { Request, Response } from 'express';
import { registerSchema, loginSchema, refreshTokenSchema } from './validation';
import * as authService from './service';
import { authGuard, optionalAuth } from './middleware';

// Auth module handles registration, login, password reset, token refresh flows.
const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    console.log('[REGISTER] Request body:', JSON.stringify(req.body));

    // Validate request body
    const input = registerSchema.parse(req.body);

    // Register user
    const result = await authService.register(input);

    // Format response to match frontend expectations
    res.status(201).json({
      user: result.user,
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    console.error('[REGISTER] Error:', error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred',
      });
    }
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const input = loginSchema.parse(req.body);

    // Login user
    const result = await authService.login(input);

    // Format response to match frontend expectations
    res.status(200).json({
      user: result.user,
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred',
      });
    }
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const input = refreshTokenSchema.parse(req.body);

    // Refresh tokens
    const result = await authService.refreshAccessToken(input.refreshToken);

    // Format response to match frontend expectations
    res.status(200).json({
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred',
      });
    }
  }
});

export default { router, authGuard, optionalAuth };
