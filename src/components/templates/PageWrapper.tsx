import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className='mt-[4rem] max-w-[1024px] m-auto p-6'>{children}</main>
  );
}
