import { Library } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Library className="h-6 w-6 text-muted-foreground" />
              <span className="font-semibold text-foreground text-lg">
                CODEA
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              © {currentYear} CODEA — Pan-African Architectural Intelligence.
              <br />
              Lagos • Nairobi • Accra • Cape Town • Kigali
            </p>
          </div>
          <nav className="flex flex-col gap-3 text-sm">
            <h3 className="font-semibold text-foreground mb-2">Sections</h3>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About CODEA
            </Link>
            <Link
              href="/codes"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Code Library
            </Link>
            <Link
              href="/community"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Community
            </Link>
          </nav>
          <nav className="flex flex-col gap-3 text-sm">
            <h3 className="font-semibold text-foreground mb-2">Support</h3>
            <Link
              href="/community"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
