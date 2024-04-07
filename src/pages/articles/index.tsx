import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { selectQuery } from '@/utils/sql/pg';
import { API_RES_TYPE } from '@/types/api';
import { Description } from '@/utils/common/site';
import { unixYMD } from '@/utils/createValue';
import { SQL } from '@/utils/sql/queries';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { COLUMNS } from '@/types/columns';
import ArticleTitleCard from '@/components/atoms/ArticleTitleCard';
import { Fragment } from 'react';
import BreadCrumb from '@/components/molecules/Breadcrumb';

interface ArticlePageProps {
  articlesCount: number;
  articles: API_RES_TYPE['articles'][];
}

/**
 * [SSG] 記事の一覧
 * @param param0
 * @returns
 */
export default function Page({ articlesCount, articles }: ArticlePageProps) {
  return (
    <>
      <MetaData
        isTitle={false}
        title='記事一覧'
        description={Description.basic}
      />
      <PageWrapper isGrid={true}>
        <BreadCrumb title='' />
        <H2Tag headingText='記事一覧' isMore={false} />
        {articlesCount > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8'>
            {articles.map((article, index) => (
              <Link key={article.id} href={`/articles/${article.article_id}`}>
                <section className='cursor-pointer hover:opacity-80 hover:transition-all'>
                  <ArticleTitleCard data={article} type={2} />
                  <p className='text-neutral-500 text-[0.9rem] text-right mt-2'>
                    {article.updated_at
                      ? unixYMD(article.updated_at)
                      : unixYMD(article.created_at)}
                  </p>
                </section>
              </Link>
            ))}
          </div>
        ) : (
          <p>記事を取得できませんでした</p>
        )}
      </PageWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = {
    articlesCount: 0,
    articles: [] as COLUMNS['t_articles'][],
  };

  try {
    // 記事一覧を最大50件取得
    const { count, rows } = await selectQuery(SQL.selectArticles, [50]);
    if (count > 0) {
      response.articlesCount = count;
      response.articles = rows;
    }
  } catch (err) {
    console.error('Articles Page server error...', err);
  }

  return { props: response };
};
