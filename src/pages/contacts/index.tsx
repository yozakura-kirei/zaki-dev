import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { Description } from '@/utils/common/site';

export default function Page() {
  return (
    <>
      <MetaData
        isTitle={false}
        title='お問い合わせ'
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <h1>コンタクトページ</h1>
      </PageWrapper>
    </>
  );
}
