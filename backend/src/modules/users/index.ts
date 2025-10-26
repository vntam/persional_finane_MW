import { Router } from 'express';

// Users module manages profiles, preferences, and linked financial accounts metadata.
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Users module placeholder' });
});

export default { router };
