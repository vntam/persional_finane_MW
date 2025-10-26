import { Router } from 'express';

// Transactions module ingests raw entries, runs categorization, and exposes CRUD APIs.
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Transactions module placeholder' });
});

export default { router };
