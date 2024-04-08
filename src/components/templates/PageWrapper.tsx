import { ReactNode } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

interface PageWrapperProps {
  children: ReactNode;
  isGrid?: boolean;
}

export default function PageWrapper({ children, isGrid }: PageWrapperProps) {
  return (
    <>
      <Header />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTAG_ID ?? ''} />
      <main className='mt-[4rem] max-w-[1024px] min-h-screen m-auto px-6 py-6 bg-BackGround text-neutral-800'>
        {children}
      </main>
      <Footer />
    </>
  );
}
