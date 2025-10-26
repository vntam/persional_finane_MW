import 'dotenv/config';

// Lightweight env helper so every module reads from a single source.
const required = ['OPENAI_API_KEY'] as const;
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key}. Set it in .env or deployment secrets.`);
  }
});

export const env = {
  PORT: Number(process.env.BACKEND_PORT || process.env.PORT || 4000),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'replace-me',
};
