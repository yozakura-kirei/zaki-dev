import MiniCard from '@/components/atoms/MiniCard';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { selectQuery } from '@/utils/sql/pg';
import { API_RES_TYPE } from '@/types/api';
import { Description } from '@/utils/common/site';
import { SQL } from '@/utils/sql/queries';
import { GetStaticPaths, GetStaticProps } from 'next';
import { changeHtml } from '@/utils/md/changeHtml';

interface NoticeIdPageProps {
  status: number;
  notice: API_RES_TYPE['notices'];
}

export default function Page({ status = 200, notice }: NoticeIdPageProps) {
  return (
    <>
      <MetaData
        isTitle={false}
        title={`${notice.title}`}
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <div>
          {/* <h1>{notice.title}</h1> */}
          <div className='bg-neutral-200 flex justify-center items-center px-4 py-10 rounded-xl mt-6 mb-8 shadow-sm h-[11rem]'>
            <h1 className='font-bold text-[1.3rem] md:text-[1.5rem] my-4'>
              {notice && notice.title}
            </h1>
          </div>
          {/* カテゴリボタン */}
          <div className='flex flex-wrap gap-4 my-4'>
            <MiniCard categoryName={notice.name} />
          </div>
          {/* 内容 */}
          <div
            className='md-container'
            dangerouslySetInnerHTML={{ __html: changeHtml(notice.content) }}
          />
        </div>
      </PageWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // お知らせの全てのパスを取得
  const { rows } = await selectQuery(SQL.onlyNoticeId, []);
  const paths = rows.map((notice) => ({
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
      const { count, rows } = await selectQuery(SQL.selectNoticeId, [
        params.id,
      ]);
      if (count > 0) {
        response.notice = rows[0];
      } else {
        // お知らせが見つからない場合は404ページにリダイレクト
        return {
          notFound: true,
        };
      }
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
