import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-muted flex flex-col justify-center px-4">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold')}>
          PFM
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Personal Finance Manager</h1>
          <p className="text-sm text-muted-foreground">
            Manage your finances effortlessly.
          </p>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
