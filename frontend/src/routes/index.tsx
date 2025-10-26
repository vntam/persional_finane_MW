import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthFeature from '../features/auth';
import DashboardFeature from '../features/dashboard';
import TransactionsFeature from '../features/transactions';
import AiFeature from '../features/ai';
import SettingsFeature from '../features/settings';

// Central place to register feature routes so navigation stays obvious.
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardFeature />} />
        <Route path="/auth/*" element={<AuthFeature />} />
        <Route path="/transactions/*" element={<TransactionsFeature />} />
        <Route path="/ai" element={<AiFeature />} />
        <Route path="/settings" element={<SettingsFeature />} />
      </Routes>
    </BrowserRouter>
  );
}
