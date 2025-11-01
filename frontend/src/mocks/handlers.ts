// src/mocks/handlers.ts
import { rest } from 'msw';

const demoUser = {
  id: 'u_1',
  email: 'user@test.com',
  name: 'Demo User',
};

export const handlers = [
  rest.post('/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'user@test.com' && password === '12345678') {
      return res(
        ctx.status(200),
        ctx.json({
          user: demoUser,
          tokens: { accessToken: 'mock_access', refreshToken: 'mock_refresh' },
        })
      );
    }
    return res(
      ctx.status(401),
      ctx.json({ error: { message: 'Invalid credentials' } })
    );
  }),

  rest.post('/auth/register', async (req, res, ctx) => {
    const { email, password, name } = await req.json();
    if (email === 'user@test.com') {
      return res(
        ctx.status(409),
        ctx.json({ error: { message: 'Email already exists' } })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        user: { id: 'u_2', email, name: name || 'New User' },
        tokens: { accessToken: 'mock_access', refreshToken: 'mock_refresh' },
      })
    );
  }),

  rest.post('/auth/refresh', async (req, res, ctx) => {
    const { refreshToken } = await req.json();
    if (!refreshToken) {
      return res(
        ctx.status(400),
        ctx.json({ error: { message: 'Missing refresh token' } })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        tokens: {
          accessToken: 'mock_access_refreshed',
          refreshToken: 'mock_refresh_refreshed',
        },
      })
    );
  }),
];
