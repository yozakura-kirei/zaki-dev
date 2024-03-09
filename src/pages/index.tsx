import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { API, PATH } from '@/utils/common/path';
import { unixYMD } from '@/utils/createValue';
import Link from 'next/link';
import { FaAnglesRight } from 'react-icons/fa6';

interface TopPageProps {
  noticesCount: number;
  notices: API_RES_TYPE['notices'][];
  categoriesCount: number;
  categories: API_RES_TYPE['categories'][];
}

export default function Page({
  noticesCount,
  notices,
  categoriesCount,
  categories,
}: TopPageProps) {
  return (
    <PageWrapper>
      <div className='grid grid-cols-1 gap-8 mt-4'>
        <div className=''>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-bold text-[1.4rem]'>お知らせ</h2>
            <Link
              href={PATH.NOTICES}
              className='flex items-center gap-1 text-[0.9rem] hover:text-HoverBlue'
            >
              <FaAnglesRight />
              <p>もっと見る</p>
            </Link>
          </div>
          {noticesCount > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className='border-b-[0.8px] border-BorderGray mb-4 cursor-pointer hover:text-HoverGray'
              >
                <p className='text-neutral-500 text-[0.7rem]'>
                  {unixYMD(notice.updated_at as number) ??
                    unixYMD(notice.created_at)}
                </p>
                <p className='font-medium'>・{notice.title}</p>
              </div>
            ))
          ) : (
            <p>お知らせはありません。</p>
          )}
        </div>
        {/* カテゴリエリア */}
        <div className=''>
          <h2 className='font-bold text-[1.4rem]'>カテゴリー</h2>
          <div className='flex flex-wrap gap-4 my-4'>
            {categoriesCount > 0 &&
              categories.map((category) => (
                <div
                  key={category.id}
                  className='bg-ThinGray text-sm py-2 px-4 rounded-xl shadow-md cursor-pointer hover:text-HoverGray'
                >
                  <span className='mr-1'>{category.name}</span>
                  <span>({category.count})</span>
                </div>
              ))}
          </div>
        </div>
        {/* 記事エリア */}
        <div className=''>
          <h2 className='font-bold text-[1.4rem]'>新着記事</h2>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function getServerSideProps() {
  const response = {
    noticesCount: 0,
    notices: [],
    categoriesCount: 0,
    categories: [],
  };

  try {
    // お知らせを取得
    const noticeRes = await fetch(`${API.NOTICES}=5`);
    if (noticeRes.ok) {
      const { noticesCount, notices } = await noticeRes.json();
      response.noticesCount = noticesCount;
      response.notices = notices;
    }

    // カテゴリを取得
    const categoriesRes = await fetch(API.CATEGORY_ALL);
    if (categoriesRes.ok) {
      const { categoriesCount, categories } = await categoriesRes.json();
      response.categoriesCount = categoriesCount;
      response.categories = categories;
    }
  } catch (err) {
    console.error('Top Page server error...', err);
  }

  return { props: response };
}
