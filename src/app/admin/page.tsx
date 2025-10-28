
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AddJurisdictionForm from '@/components/sections/admin/add-jurisdiction-form';
import AddCodeArticleForm from '@/components/sections/admin/add-code-article-form';
import { Separator } from '@/components/ui/separator';
import UploadDocumentForm from '@/components/sections/admin/upload-document-form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If auth state is not loading and there is no user (or user is anonymous), redirect to login.
    if (!isUserLoading && (!user || user.isAnonymous)) {
      router.push('/login?redirect=/admin');
    }
  }, [user, isUserLoading, router]);

  // If user is loading or is not authenticated (and redirecting), show a loading state.
  if (isUserLoading || !user || user.isAnonymous) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-1/2 mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render the admin portal if the user is authenticated.
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-muted-foreground mt-2">
              Manage platform data.
            </p>
          </div>
          <Tabs defaultValue="uploads" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="uploads">Document Uploads</TabsTrigger>
              <TabsTrigger value="data">Data Management</TabsTrigger>
            </TabsList>

            <TabsContent value="uploads" className="mt-8">
              <UploadDocumentForm />
            </TabsContent>

            <TabsContent value="data" className="mt-8">
              <div className="space-y-12">
                <AddJurisdictionForm />
                <Separator />
                <AddCodeArticleForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
