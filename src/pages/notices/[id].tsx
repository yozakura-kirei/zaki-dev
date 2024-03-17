import MiniCard from '@/components/atoms/MiniCard';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { selectQuery } from '@/libs/mysql';
import { API_RES_TYPE } from '@/types/api';
import { API } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { SQL } from '@/utils/sql';
import { GetStaticPaths, GetStaticProps } from 'next';

interface NoticeIdPageProps {
  status: number;
  notice: API_RES_TYPE['notices'];
}

export default function Page({ status, notice }: NoticeIdPageProps) {
  return (
    <>
      <MetaData
        isTitle={false}
        title={`${notice.title}`}
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <div>
          <h1>{notice.title}</h1>
          {/* カテゴリボタン */}
          <div className='flex flex-wrap gap-4 my-4'>
            <MiniCard categoryName={notice.name} />
          </div>
          {/* 内容 */}
          <div>{notice.content}</div>
        </div>
      </PageWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // お知らせの全てのパスを取得
  const { data }: API_RES_TYPE['onlyNoticeId'] = await selectQuery(
    SQL.getOnlyNoticeId,
  );
  const paths = data.map((notice) => ({
    params: { id: notice.notice_id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = {
    status: 200,
    notice: {},
  };

  try {
    if (params) {
      const detailRes = await fetch(`${API.DETAIL_ID}id=${params.id}&type=2`);
      if (detailRes.ok) {
        const notice: API_RES_TYPE['notices'] = await detailRes.json();
        response.notice = notice;
      }
    } else {
      // お知らせが見つからない場合は404ページへリダイレクト
      return {
        notFound: true,
      };
    }
  } catch (err) {
    console.error('getNoticeId error...', err);
    // 500エラーに飛ばす
    throw new Error('getArticleId error...');
  }

  return {
    props: response,
  };
};
