import { Library } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Library className="h-6 w-6 text-muted-foreground" />
            <span className="font-semibold text-foreground">CODEA</span>
          </div>
          <nav className="flex gap-4 sm:gap-6 text-sm">
            <Link
              href="#vision"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Vision
            </Link>
            <Link
              href="#library"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Library
            </Link>
            <Link
              href="#hub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Hub
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CODEA. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
