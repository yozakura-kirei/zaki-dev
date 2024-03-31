import { PATH } from '@/utils/common/path';
import { SiteName } from '@/utils/common/site';
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { PiContactlessPaymentLight } from 'react-icons/pi';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 z-[100] h-[4rem]  p-4 w-full shadow-sm bg-White'>
      <div className='max-w-[1024px] m-auto grid grid-cols-2 gap-4'>
        <div className='font-bold text-[1.5rem] flex items-center'>
          <Image
            src={'/icons/site-logo.webp'}
            alt='サイトロゴ'
            width={30}
            height={30}
            className='mr-3'
          />
          <h1>
            <Link href={PATH.ROOT}>{SiteName}</Link>
          </h1>
        </div>
        <ul className='flex items-center justify-end text-[0.8rem] md:text-[1rem]'>
          <Link href={'/search'}>
            <li className='flex items-center mr-4 md:mr-6 cursor-pointer'>
              <span className='mr-2'>
                <CiSearch />
              </span>
              検索
            </li>
          </Link>
          <li className=''>
            <Link
              href={PATH.CONTACTS}
              className='flex items-center justify-end'
            >
              <span className='mr-2'>
                <PiContactlessPaymentLight />
              </span>
              お問い合わせ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
