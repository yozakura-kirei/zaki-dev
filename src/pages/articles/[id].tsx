import MiniCard from '@/components/atoms/MiniCard';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { selectQuery } from '@/libs/mysql';
import { API_RES_TYPE } from '@/types/api';
import { API, PATH } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { unixYMD } from '@/utils/createValue';
import { SQL } from '@/utils/sql';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ArticleIdPageProps {
  status: number;
  article: API_RES_TYPE['articles'];
}

export default function Page({ status, article }: ArticleIdPageProps) {
  // カテゴリを分割
  const categories = article && article.category_name.split(',');

  return (
    <>
      <MetaData
        isTitle={false}
        title={`${article.title}の記事`}
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <div>
          <h1 className='font-bold text-[1.2rem] my-4'>{article.title}</h1>
          {/* カテゴリボタン */}
          <div className='flex flex-wrap gap-4 my-4'>
            {article.category_name &&
              categories.map((category) => (
                <MiniCard key={category} categoryName={category} />
              ))}
          </div>
          <p className='my-4'>
            {article.updated_at
              ? `${unixYMD(article.updated_at)}に更新`
              : `${article.created_at}に公開`}
          </p>
          <p>{article.content}</p>
        </div>
      </PageWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのパスを取得
  const { data }: API_RES_TYPE['onlyArticleId'] = await selectQuery(
    SQL.getOnlyArticleId,
  );
  const paths = data.map((article) => ({
    params: { id: article.article_id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = {
    status: 200,
    article: {},
  };

  try {
    if (params) {
      const detailRes = await fetch(`${API.SELECT_ID}id=${params.id}&type=1`);
      if (detailRes.ok) {
        const article: API_RES_TYPE['articles'] = await detailRes.json();
        response.article = article;
      } else {
        // 記事が見つからない場合は404ページにリダイレクト
        return {
          notFound: true,
        };
      }
    }
  } catch (err) {
    console.error('getArticleId error...', err);
    // 500エラーに飛ばす
    throw new Error('getArticleId error...');
  }

  return {
    props: response,
  };
};
