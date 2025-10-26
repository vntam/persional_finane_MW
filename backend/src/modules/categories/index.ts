import { Router } from 'express';

// Categories module maintains rule sets for grouping transactions + custom tags.
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Categories module placeholder' });
});

export default { router };
