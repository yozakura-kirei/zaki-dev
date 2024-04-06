import { ReactNode } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

interface PageWrapperProps {
  children: ReactNode;
  isGrid?: boolean;
}

export default function PageWrapper({ children, isGrid }: PageWrapperProps) {
  return (
    <>
      <Header />
      <main className='mt-[4rem] max-w-[1024px] min-h-screen m-auto px-6 py-6 bg-BackGround text-neutral-800'>
        {children}
      </main>
      <Footer />
    </>
    // <>
    //   {isGrid ? (
    //     <main className='mt-[4rem] max-w-[1024px] h-screen m-auto px-6 pt-6 pb-[5rem] bg-BackGround text-neutral-800'>
    //       {children}
    //     </main>
    //   ) : (
    //     <main className='mt-[4rem] max-w-[1024px] m-auto p-6 h-screen bg-BackGround text-neutral-800'>
    //       {children}
    //     </main>
    //   )}
    // </>
  );
}
