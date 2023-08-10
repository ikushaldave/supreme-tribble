import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Card } from '@/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/dropdown-menu';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

const AppLayout = () => {
  const { isLoggedIn, user, logout } = useAuth();

  if (!isLoggedIn) {
    logout();
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-full ">
      <Card className="rounded-none">
        <div className="flex justify-between items-center px-10 py-2">
          <div>
            <a href="https://www.sigmoid.com/" target="_blank">
              <img src="/logo.png" alt="sigmoid" className="h-10" />
            </a>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{user?.userOrg[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
