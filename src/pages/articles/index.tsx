import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { API } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { unixYMD } from '@/utils/createValue';
import { GetStaticProps } from 'next';
import Link from 'next/link';

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
        <div>
          <h2 className='font-bold text-[1.4rem] mb-8'>記事一覧</h2>
        </div>
        {articlesCount > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 gap-8'>
            <>
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.article_id}`}>
                  <section className='cursor-pointer hover:opacity-80 hover:transition-all text-[1.1rem] hover:text-[1.2rem]'>
                    <div className='bg-BgNeutral p-4 rounded-2xl hover:shadow-md h-[10rem] flex justify-center items-center font-bold'>
                      <h3 className='text-CardText'>{article.title}</h3>
                    </div>
                    <p className='text-neutral-500 text-[0.9rem] text-right'>
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
      </PageWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = {
    articlesCount: 0,
    articles: [],
  };

  try {
    // 記事一覧を最大50件取得
    const articlesRes = await fetch(`${API.SELECT_ALL}=50&type=1`);
    if (articlesRes.ok) {
      const { count, data } = await articlesRes.json();
      response.articlesCount = count;
      response.articles = data;
    }
  } catch (err) {
    console.error('Articles Page server error...', err);
  }

  return { props: response };
};
