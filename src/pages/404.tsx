import PageWrapper from '@/components/templates/PageWrapper';
import { PATH } from '@/utils/common/path';
import Link from 'next/link';

export default function Custom404() {
  return (
    <PageWrapper isGrid={false}>
      <h1>お探しのページは見つかりませんでした</h1>
      <Link href={PATH.ROOT}>トップへ戻る</Link>
    </PageWrapper>
  );
}
