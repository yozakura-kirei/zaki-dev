import MiniCard from '@/components/atoms/MiniCard';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { PATH } from '@/utils/common/path';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <MetaData
        isTitle={false}
        title='404 お探しのページは見つかりませんでした'
        description='お探しのページまたはファイルが見つかりませんでした'
      />
      <PageWrapper isGrid={false}>
        <section className='flex flex-col gap-4'>
          <h1 className='text-[1.5rem] font-bold'>404</h1>
          <h2 className='text-[1.2rem] font-bold'>
            お探しのページは見つかりませんでした
          </h2>
          <p>
            アクセスしていただいたページは、削除されたか移動している可能性があります。
          </p>
          <p>
            URLをご確認いただくか{' '}
            <Link href={PATH.ROOT} className='text-blue-700 underline'>
              トップページ
            </Link>
            からご利用ください
          </p>
          <Link href={PATH.ROOT} className='w-[12rem] text-center my-4'>
            <MiniCard>トップページへ戻る</MiniCard>
          </Link>
        </section>
      </PageWrapper>
    </>
  );
}
