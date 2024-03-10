import { Children, ReactNode } from 'react';

interface MiniCardProps {
  children: ReactNode;
}

export default function MiniCard({ children }: MiniCardProps) {
  return (
    <div className='bg-ThinGray text-sm py-2 px-4 rounded-xl shadow-md cursor-pointer hover:text-HoverGray'>
      {/* <span className='mr-1'>{category.name}</span>
      <span>({category.count})</span> */}
      {children}
    </div>
  );
}
