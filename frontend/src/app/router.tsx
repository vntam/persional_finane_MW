import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthLogin from '@/pages/AuthLogin';
import AuthRegister from '@/pages/AuthRegister';
import Dashboard from '@/pages/Dashboard';

const routes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <AuthLogin />,
          },
          {
            path: '/register',
            element: <AuthRegister />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export { router as appRouter };
