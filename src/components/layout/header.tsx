
'use client';

import { Library, LogOut, Menu, User, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const isMobile = useIsMobile();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith('/admin') || pathname.startsWith('/login');

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };
  
  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const renderUserMenu = () => {
    if (isUserLoading) {
      return null;
    }

    if (user && !user.isAnonymous) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || 'Admin User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return null;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Library className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-primary tracking-tight">
              CODEA
            </h1>
          </Link>
        </div>
        {isMobile ? (
          <div className="flex items-center gap-2">
            {isAdminPage && renderUserMenu()}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 p-4">
                  <SheetClose asChild>
                    <Link href="/about" className="text-lg">
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/codes" className="text-lg">
                      Codes
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <nav className="flex items-center gap-4">
            <Button variant="link" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/codes">Codes</Link>
            </Button>
            {isAdminPage && renderUserMenu()}
          </nav>
        )}
      </div>
    </header>
  );
}
