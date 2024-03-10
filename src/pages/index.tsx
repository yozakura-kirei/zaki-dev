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
  articlesCount: number;
  articles: API_RES_TYPE['articles'][];
}

/**
 * トップページ
 * @param param0
 * @returns
 */
export default function Page({
  noticesCount,
  notices,
  categoriesCount,
  categories,
  articlesCount,
  articles,
}: TopPageProps) {
  return (
    <PageWrapper isGrid={true}>
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
                  {notice.updated_at
                    ? unixYMD(notice.updated_at as number)
                    : unixYMD(notice.created_at)}
                </p>
                <p className='font-medium'>・{notice.title}</p>
              </div>
            ))
          ) : (
            <p>お知らせはありません。</p>
          )}
        </div>
        {/* カテゴリエリア */}
        <div className='my-4'>
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
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-bold text-[1.4rem] mb-4'>新着記事</h2>
            <Link
              href={PATH.ARTICLES}
              className='flex items-center gap-1 text-[0.9rem] hover:text-HoverBlue'
            >
              <FaAnglesRight />
              <p>もっと見る</p>
            </Link>
          </div>
          {articlesCount > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8'>
              <>
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.article_id}`}
                  >
                    <section className='cursor-pointer hover:opacity-80 hover:transition-all text-[1.1rem] hover:text-[1.2rem]'>
                      <div className='bg-BgNeutral p-4 rounded-2xl hover:shadow-md h-[10rem] flex justify-center items-center font-bold'>
                        <h3 className='text-CardText'>{article.title}</h3>
                      </div>
                      <p className='text-neutral-500 text-[0.9rem] text-right mt-2'>
                        {article.updated_at
                          ? unixYMD(article.updated_at)
                          : unixYMD(article.created_at)}
                      </p>
                    </section>
                  </Link>
                ))}
              </>
            </div>
          ) : (
            <p>記事を取得できませんでした</p>
          )}
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
    articlesCount: 0,
    articles: [],
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

    // 記事を取得
    const articlesRes = await fetch(`${API.ARTICLES}=10`);
    if (articlesRes.ok) {
      const { articlesCount, articles } = await articlesRes.json();
      response.articlesCount = articlesCount;
      response.articles = articles;
    }
  } catch (err) {
    console.error('Top Page server error...', err);
  }

  return { props: response };
}
