import H2Tag from '@/components/atoms/H2Tag';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { Description } from '@/utils/common/site';

export default function Page() {
  return (
    <>
      <MetaData
        isTitle={false}
        title='カテゴリー'
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <H2Tag headingText='カテゴリー' isMore={false} />
      </PageWrapper>
    </>
  );
}
