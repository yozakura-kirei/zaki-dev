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
import { selectQuery } from '@/utils/sql/pg';
import { SQL } from '@/utils/sql/queries';
import { COLUMNS } from '@/types/columns';
import ArticleTitleCard from '@/components/atoms/ArticleTitleCard';

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
          <section className=''>
            <H2Tag headingText='お知らせ' isMore={true} path={PATH.NOTICES} />
            {noticesCount > 0 ? (
              notices.map((notice) => (
                <div key={notice.id} className='my-2'>
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.notice_id}`}
                    className='block border-b-[0.8px] border-BorderGray cursor-pointer hover:text-HoverGray'
                  >
                    <p className='text-neutral-500 text-[0.7rem]'>
                      {notice.updated_at
                        ? unixYMD(notice.updated_at as number)
                        : unixYMD(notice.created_at)}
                    </p>
                    <p className='font-medium'>・{notice.title}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>お知らせはありません。</p>
            )}
          </section>
          {/* カテゴリエリア */}
          <section className='my-4'>
            <H2Tag
              headingText='カテゴリー'
              isMore={false}
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
          </section>
          {/* 記事エリア */}
          <section className=''>
            <H2Tag headingText='新着記事' isMore={true} path={PATH.ARTICLES} />
            {articlesCount > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8'>
                <>
                  {articles.map((article, index) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.article_id}`}
                    >
                      <section className='cursor-pointer hover:opacity-80 hover:transition-all text-[1.1rem] hover:text-[1.2rem]'>
                        <ArticleTitleCard data={article} />
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
          </section>
        </div>
      </PageWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = {
    noticesCount: 0,
    notices: [] as COLUMNS['t_notices'][],
    categoriesCount: 0,
    categories: [] as COLUMNS['m_categories'][],
    articlesCount: 0,
    articles: [] as COLUMNS['t_articles'][],
  };

  try {
    // お知らせを取得
    const notices = await selectQuery(SQL.selectNotices, [5]);
    if (notices.count > 0) {
      response.noticesCount = notices.count;
      response.notices = notices.rows;
    }

    // カテゴリを取得
    const categories = await selectQuery(SQL.selectCategories, [
      'カテゴリなし',
    ]);
    if (categories.count > 0) {
      response.categoriesCount = categories.count;
      response.categories = categories.rows;
    }

    // 記事を取得
    const articles = await selectQuery(SQL.selectArticles, [10]);
    if (articles.count > 0) {
      response.articlesCount = articles.count;
      response.articles = articles.rows;
    }
  } catch (err) {
    console.error('Top Page server error...', err);
  }

  return { props: response };
};
