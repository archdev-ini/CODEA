
'use client';

import { Library, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const isMobile = useIsMobile();

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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
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
                <SheetClose asChild>
                  <Link href="/community" className="text-lg">
                    Community
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-4">
            <Button variant="link" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/codes">Codes</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/community">Community</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
