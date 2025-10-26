import { AppRoutes } from './routes';
import AppLayout from './layouts/AppLayout';

// Root component wires layout + feature routes. Keep logic minimal here.
function App() {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
