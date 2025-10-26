import { Router } from 'express';

// Auth module handles registration, login, password reset, token refresh flows.
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Auth module placeholder' });
});

export default { router };
