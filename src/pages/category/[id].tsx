import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { selectQuery } from '@/libs/mysql';
import { API_RES_TYPE } from '@/types/api';
import { API } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { SQL } from '@/utils/sql';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

interface PageProps {
  status: number;
  categoryArticle: API_RES_TYPE['categoriesSearchResult'];
}

export default function Page({ status, categoryArticle }: PageProps) {
  return (
    <>
      <MetaData
        isTitle={false}
        title={`${categoryArticle.categoryName}の記事一覧`}
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <H2Tag
          headingText={`${categoryArticle.categoryName}の記事`}
          isMore={false}
        />
        <div>
          {categoryArticle.count > 0 ? (
            categoryArticle.data.map((article) => (
              <Link key={article.id} href={`/articles/${article.article_id}`}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
              </Link>
            ))
          ) : (
            <>お探しのカテゴリー記事は見つかりませんでした</>
          )}
        </div>
      </PageWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: API_RES_TYPE['onlyCategoryName'] = await selectQuery(
    SQL.getOnlyCategorySearchName,
  );
  const paths = data.map((category) => ({
    params: { id: category.search_name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = {
    status: 200,
    categoryArticle: {},
    searchName: '',
  };

  try {
    if (params) {
      const categoryArticleRes = await fetch(
        `${API.DETAIL_ID}id=${params.id}&type=3&limit=10`,
      );

      if (categoryArticleRes.ok) {
        const resJson = await categoryArticleRes.json();
        response.categoryArticle = resJson;

        // 検索したカテゴリ名を取得
      } else {
        // 記事が見つからない場合は404ページにリダイレクト
        return {
          notFound: true,
        };
      }
    }
  } catch (err) {
    console.error('getCategoryName error...', err);
    // 500エラーに飛ばす
    throw new Error('getCategoryName error...');
  }

  return {
    props: response,
  };
};
