import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AddJurisdictionForm from '@/components/sections/admin/add-jurisdiction-form';
import AddCodeArticleForm from '@/components/sections/admin/add-code-article-form';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-20 md:py-28">
        <div className="container mx-auto px-4 space-y-16">
          <AddJurisdictionForm />
          <Separator />
          <AddCodeArticleForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
