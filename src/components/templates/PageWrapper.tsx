import { ReactNode, Suspense } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
// import Gtag from '../atoms/Gtag';
import { GoogleAnalytics } from '@next/third-parties/google';

interface PageWrapperProps {
  children: ReactNode;
  isGrid?: boolean;
}

export default function PageWrapper({ children, isGrid }: PageWrapperProps) {
  console.log(process.env.NEXT_PUBLIC_GA_ID);
  return (
    <>
      <Header />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <main className='mt-[4rem] max-w-[1024px] min-h-screen m-auto px-6 py-6 bg-BackGround text-neutral-800'>
        {children}
      </main>
      <Footer />
    </>
  );
}
