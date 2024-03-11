import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { Description } from '@/utils/common/site';
import { GetStaticPaths } from 'next';

export default function Page() {
  return (
    <>
      <MetaData isTitle={false} title='' description={Description.basic} />
      <PageWrapper isGrid={false}>
        <div>
          <h1>お知らせ</h1>
        </div>
      </PageWrapper>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {

// }
