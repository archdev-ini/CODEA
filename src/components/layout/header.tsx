import { Library } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
          <Library className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-primary tracking-tight">
            CODEA
          </h1>
        </div>
      </div>
    </header>
  );
}
