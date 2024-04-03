import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  isGrid: boolean;
}

export default function PageWrapper({ children, isGrid }: PageWrapperProps) {
  return (
    <>
      {isGrid ? (
        <main className='mt-[4rem] max-w-[1024px] m-auto px-6 pt-6 pb-[5rem] bg-BackGround text-neutral-800'>
          {children}
        </main>
      ) : (
        <main className='mt-[4rem] max-w-[1024px] m-auto p-6 h-screen bg-BackGround text-neutral-800'>
          {children}
        </main>
      )}
    </>
  );
}
