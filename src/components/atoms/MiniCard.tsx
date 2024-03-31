import { PATH } from '@/utils/common/path';
import Link from 'next/link';

interface MiniCardProps {
  categoryName: string;
  path?: string;
  subText?: string | number;
}

/**
 * カテゴリのミニカード
 * @param param0
 * @returns
 */
export default function MiniCard({
  categoryName,
  subText,
  path,
}: MiniCardProps) {
  return (
    <div className='bg-ThinGray text-sm py-2 px-4 rounded-xl shadow-md cursor-pointer hover:text-HoverGray'>
      {path ? (
        <Link href={`${PATH.CATEGORY}/${path}`}>
          <span className={`${subText ? 'mr-1' : ''}`}>{categoryName}</span>
          {subText && <span>({subText})</span>}
        </Link>
      ) : (
        <>
          <span className={`${subText ? 'mr-1' : ''}`}>{categoryName}</span>
          {subText && <span>({subText})</span>}
        </>
      )}
    </div>
  );
}
