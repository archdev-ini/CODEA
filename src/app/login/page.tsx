
import { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 md:py-28">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
