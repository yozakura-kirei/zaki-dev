import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { unixYMD } from '@/utils/createValue';
import { GetServerSideProps } from 'next';

interface ArticleIdPageProps {
  status: number;
  article: API_RES_TYPE['articles'];
}

export default function Page({ status, article }: ArticleIdPageProps) {
  // カテゴリを分割
  const categories = article.category_name.split(',');

  return (
    <PageWrapper isGrid={false}>
      <div>
        <h1 className='font-bold text-[1.2rem] my-4'>{article.title}</h1>
        {/* カテゴリボタン */}
        {article.category_name &&
          categories.map((category) => (
            <button
              key={category}
              className='bg-ThinGray text-sm py-2 px-4 mr-4 rounded-xl shadow-md cursor-pointer hover:text-HoverGray'
            >
              {category}
            </button>
          ))}
        <p className='my-4'>
          {article.updated_at
            ? `${unixYMD(article.updated_at)}に更新`
            : `${article.created_at}に公開`}
        </p>
        <p>{article.content}</p>
      </div>
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const response = {
    status: 200,
    article: {},
  };

  const detailRes = await fetch(
    `${process.env.APP_ENDPONT}/api/articles/detail?id=${id}`,
  );
  if (detailRes.ok) {
    const article: API_RES_TYPE['articles'] = await detailRes.json();
    response.article = article;
  } else {
    // 記事が見つからない場合は404ページにリダイレクト
    return {
      notFound: true,
    };
  }

  console.log('レスポンス', response);
  return {
    props: response,
  };
};
