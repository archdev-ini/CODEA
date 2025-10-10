import { Library } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
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
      </div>
    </header>
  );
}
