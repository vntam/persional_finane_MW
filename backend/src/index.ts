import { createServer } from './server';
import { env } from './config/env';

const app = createServer();
const port = env.PORT;

// Keep bootstrap minimal to make deploying/testing easier.
app.listen(port, () => {
  console.log(`[backend] Listening on port ${port}`);
});
