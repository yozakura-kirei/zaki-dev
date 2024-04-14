import MiniCard from '@/components/atoms/MiniCard';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { INIT } from '@/types/init';
import { Description } from '@/utils/common/site';
import { createCategoryObj, unixYMD } from '@/utils/createValue';
import { SQL } from '@/utils/sql/queries';
import { GetStaticPaths, GetStaticProps } from 'next';
import { selectQuery } from '@/utils/sql/pg';
import { changeHtml } from '@/utils/md/changeHtml';
import BreadCrumb from '@/components/molecules/Breadcrumb';
import { extractLinks, getOgpData } from '@/utils/md/getOgpData';

interface ArticleIdPageProps {
  status: number;
  article: API_RES_TYPE['articles'];
}

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
      <PageWrapper isGrid={true}>
        <section>
          <BreadCrumb title={article.title} />
          {/* タイトル */}
          <div className='bg-BgNeutral flex justify-center items-center px-4 py-10 rounded-xl mt-6 mb-8 shadow-sm h-[11rem]'>
            <h1 className='font-bold text-[1.3rem] md:text-[1.5rem] my-4'>
              {article && article.title}
            </h1>
          </div>

          {/* カテゴリボタン */}
          <div className='flex flex-wrap gap-4 my-6'>
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
          <p className='my-6 flex justify-end items-center text-neutral-600'>
            {article && article.updated_at
              ? `${unixYMD(article.updated_at)}に更新`
              : `${unixYMD(article.created_at)}に公開`}
          </p>
          <div
            className='md-container'
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>
      </PageWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 全てのパスを取得
  const { rows } = await selectQuery(SQL.onlyArticleId, []);
  const paths = rows.map((article) => ({
    params: { id: article.article_id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response: {
    status: number;
    article: API_RES_TYPE['articles'];
  } = {
    status: 200,
    article: INIT['articles'],
  };

  try {
    if (params) {
      const article = await selectQuery(SQL.selectArticleId, [params.id, 1]);
      if (article.count > 0) {
        response.article = article.rows[0];

        // リンクカード生成
        const floatLink = extractLinks(response.article.content ?? '');
        const ogpDatas = await getOgpData(floatLink);

        // マークダウンをhtmlに変換
        const htmlContent = changeHtml(
          response.article.content ?? '',
          ogpDatas,
        );
        response.article.content = htmlContent;
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
