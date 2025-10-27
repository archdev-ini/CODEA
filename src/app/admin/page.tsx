
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AddJurisdictionForm from '@/components/sections/admin/add-jurisdiction-form';
import AddCodeArticleForm from '@/components/sections/admin/add-code-article-form';
import { Separator } from '@/components/ui/separator';
import UploadDocumentForm from '@/components/sections/admin/upload-document-form';
import InsightsReviewPanel from '@/components/sections/admin/insights-review-panel';
import RequestsReviewPanel from '@/components/sections/admin/requests-review-panel';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-20 md:py-28">
        <div className="container mx-auto px-4 space-y-16">
          <InsightsReviewPanel />
          <Separator />
          <RequestsReviewPanel />
          <Separator />
          <UploadDocumentForm />
          <Separator />
          <AddJurisdictionForm />
          <Separator />
          <AddCodeArticleForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
