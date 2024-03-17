import Link from 'next/link';
import { FaAnglesRight } from 'react-icons/fa6';

interface H2TagProps {
  headingText: string;
  isMore: boolean;
  path?: string;
}

/**
 * H2見出し
 * @param headingText 見出し
 * @param isMore もっと見るを入れるか
 * @param path リンク
 * @returns
 */
export default function H2Tag({ headingText, isMore, path }: H2TagProps) {
  return (
    <div className='flex justify-between items-center my-4'>
      <h2 className='font-bold text-[1.4rem]'>{headingText}</h2>
      {isMore && path && (
        <Link
          href={path}
          className='flex items-center gap-1 text-[0.9rem] hover:text-HoverBlue'
        >
          <FaAnglesRight />
          <p>もっと見る</p>
        </Link>
      )}
    </div>
  );
}
