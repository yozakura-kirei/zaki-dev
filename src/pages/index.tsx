import MiniCard from '@/components/atoms/MiniCard';
import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { API, PATH } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { unixYMD } from '@/utils/createValue';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface TopPageProps {
  noticesCount: number;
  notices: API_RES_TYPE['notices'][];
  categoriesCount: number;
  categories: API_RES_TYPE['categories'][];
  articlesCount: number;
  articles: API_RES_TYPE['articles'][];
}

/**
 * [SSG] トップページ
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
    <>
      <MetaData isTitle={true} description={Description.basic} />
      <PageWrapper isGrid={true}>
        <div className='grid grid-cols-1 gap-8'>
          <div className=''>
            <H2Tag headingText='お知らせ' isMore={true} path={PATH.NOTICES} />
            {noticesCount > 0 ? (
              notices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notices/${notice.notice_id}`}
                  className='border-b-[0.8px] border-BorderGray mb-4 cursor-pointer hover:text-HoverGray'
                >
                  <p className='text-neutral-500 text-[0.7rem]'>
                    {notice.updated_at
                      ? unixYMD(notice.updated_at as number)
                      : unixYMD(notice.created_at)}
                  </p>
                  <p className='font-medium'>・{notice.title}</p>
                </Link>
              ))
            ) : (
              <p>お知らせはありません。</p>
            )}
          </div>
          {/* カテゴリエリア */}
          <div className='my-4'>
            <H2Tag
              headingText='カテゴリー'
              isMore={true}
              path={PATH.CATEGORY}
            />
            <div className='flex flex-wrap gap-4 my-4'>
              {categoriesCount > 0 &&
                categories.map((category) => (
                  <MiniCard
                    key={category.id}
                    categoryName={category.name}
                    path={category.search_name}
                    subText={category.count}
                  />
                ))}
            </div>
          </div>
          {/* 記事エリア */}
          <div className=''>
            <H2Tag headingText='新着記事' isMore={true} path={PATH.ARTICLES} />
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
    const noticeRes = await fetch(`${API.SELECT_MULT}=5&type=2`);
    if (noticeRes.ok) {
      const { count, data } = await noticeRes.json();
      response.noticesCount = count;
      response.notices = data;
    }

    // カテゴリを取得
    const categoriesRes = await fetch(API.CATEGORY_ALL);
    if (categoriesRes.ok) {
      const { categoriesCount, categories } = await categoriesRes.json();
      response.categoriesCount = categoriesCount;
      response.categories = categories;
    }

    // 記事を取得
    const articlesRes = await fetch(`${API.SELECT_MULT}=10&type=1`);
    if (articlesRes.ok) {
      const { count, data } = await articlesRes.json();
      response.articlesCount = count;
      response.articles = data;
    }
  } catch (err) {
    console.error('Top Page server error...', err);
  }

  return { props: response };
};
