import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { localMdChangeHtml } from '@/utils/md/changeLocalMd';

/**
 * 個人情報取扱のページ
 */
export default function Page({ html }: { html: any }) {
  return (
    <>
      <MetaData
        isTitle={false}
        title='個人情報の取り扱いについて'
        description='zaki-dev.comの個人情報の取り扱いについてのページです'
      />
      <PageWrapper isGrid={true}>
        <div
          className='md-container'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  const mdFile = localMdChangeHtml('privacy.md');
  return {
    props: {
      html: mdFile,
    },
  };
}
