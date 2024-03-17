import MiniCard from '@/components/atoms/MiniCard';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { selectQuery } from '@/libs/mysql';
import { API_RES_TYPE } from '@/types/api';
import { INIT } from '@/types/init';
import { API } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { createCategoryObj, unixYMD } from '@/utils/createValue';
import { SQL } from '@/utils/sql';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ArticleIdPageProps {
  status: number;
  article: API_RES_TYPE['articles'];
}

// export const dynamic = 'force-dynamic';

/**
 * [SSG] 記事の詳細画面
 * @param param0
 * @returns
 */
export default function Page({
  status,
  article = INIT['articles'],
}: ArticleIdPageProps) {
  // カテゴリ名とサーチネームをオブジェクトに変換
  let categoryObj = null;

  if (article?.categories && article.search_name) {
    const result = createCategoryObj(article.categories, article.search_name);
    categoryObj = result;
  }

  return (
    <>
      <MetaData
        isTitle={false}
        title={`${article && article.title}の記事`}
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <div>
          <h1 className='font-bold text-[1.2rem] my-4'>
            {article && article.title}
          </h1>
          {/* カテゴリボタン */}
          <div className='flex flex-wrap gap-4 my-4'>
            {article &&
              categoryObj &&
              categoryObj.map((category) => (
                <MiniCard
                  key={category.name}
                  categoryName={category.name}
                  path={category.path}
                />
              ))}
          </div>
          <p className='my-4'>
            {article && article.updated_at
              ? `${unixYMD(article.updated_at)}に更新`
              : `${unixYMD(article.created_at)}に公開`}
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = {
    status: 200,
    article: {},
  };

  try {
    if (params) {
      const detailRes = await fetch(`${API.DETAIL_ID}id=${params.id}&type=1`);

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
