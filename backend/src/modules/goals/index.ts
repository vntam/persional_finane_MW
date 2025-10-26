import { Router } from 'express';

// Goals module tracks saving targets and milestone progress.
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Goals module placeholder' });
});

export default { router };
