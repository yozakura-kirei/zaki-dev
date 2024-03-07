import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { PiContactlessPaymentLight } from 'react-icons/pi';

export default function Header() {
  return (
    <header className='grid grid-cols-2 gap-4 p-4 max-w-[1024px] m-auto'>
      <div className='font-bold text-[1.5rem]'>
        <h1>
          <Link href='/'>Zaki-dev</Link>
        </h1>
      </div>
      <ul className='flex items-center justify-end'>
        <li className='flex items-center mr-6 cursor-pointer'>
          <span className='mr-2'>
            <CiSearch />
          </span>
          検索
        </li>
        <li className=''>
          <Link href='/contacts' className='flex items-center justify-end'>
            <span className='mr-2'>
              <PiContactlessPaymentLight />
            </span>
            お問い合わせ
          </Link>
        </li>
      </ul>
    </header>
  );
}
