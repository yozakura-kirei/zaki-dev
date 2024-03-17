import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';

/**
 * 個人情報取扱のページ
 */
export default function Page() {
  return (
    <>
      <MetaData
        isTitle={false}
        title='個人情報の取り扱いについて'
        description='zaki-dev.comの個人情報の取り扱いについてのページです'
      />
      <PageWrapper isGrid={false}>
        <div>
          <h1>個人情報の取り扱いについて</h1>
        </div>
        <div>
          <H2Tag headingText='個人情報の利用目的' isMore={false} />
        </div>
      </PageWrapper>
    </>
  );
}
