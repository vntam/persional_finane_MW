import { Router } from 'express';

// Budgets module exposes envelope/monthly budgets tracking endpoints.
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Budgets module placeholder' });
});

export default { router };
