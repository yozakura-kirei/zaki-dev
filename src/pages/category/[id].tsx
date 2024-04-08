import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { Description } from '@/utils/common/site';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { selectArticleCategories, selectQuery } from '@/utils/sql/pg';
import { SQL } from '@/utils/sql/queries';
import { simpleChangeHtml } from '@/utils/md/changeHtml';
import React from 'react';

interface PageProps {
  status: number;
  categoryArticle: API_RES_TYPE['categoriesSearchResult'];
}

export default function Page({ categoryArticle }: PageProps) {
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
              <React.Fragment key={article.id}>
                <h3 className='text-[1.1rem] text-blue-900  font-bold my-4'>
                  <Link
                    href={`/articles/${article.article_id}`}
                    className='border-blue-900 border-b-2'
                  >
                    {article.title}
                  </Link>
                </h3>
                {/* <p>{article.content}</p> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: simpleChangeHtml(article.content),
                  }}
                />
              </React.Fragment>
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
  const { rows } = await selectQuery(SQL.onlyCategorySearchName, []);
  const paths = rows.map((category) => ({
    params: { id: category.search_name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = {
    categoryArticle: {
      count: 0,
      data: [] as any[],
      categoryName: '',
    },
    searchName: '',
  };

  try {
    if (params) {
      const { rows, count, categoryName } = await selectArticleCategories(
        SQL.categoryArticles,
        [`%${params.id}%`],
        params.id as string,
      );

      // 記事が見つからない場合は404ページにリダイレクト
      if (!count) {
        return {
          notFound: true,
        };
      }

      response.categoryArticle.count = count;
      response.categoryArticle.data = rows;
      response.categoryArticle.categoryName = categoryName as string;
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
