import PageWrapper from '@/components/templates/PageWrapper';

interface CategoryProps {
  count: number;
  results: { id: number; name: string; count: number }[];
}

export default function Page({ count, results }: CategoryProps) {
  return (
    <PageWrapper>
      <div className='grid grid-cols-1 gap-8'>
        <div className=''>
          <h2 className='font-bold text-[1.4rem]'>お知らせ</h2>
          <div>
            <ul>
              <li>2024/3/8 技術情報のブログを公開しました。</li>
            </ul>
          </div>
        </div>
        {/* カテゴリエリア */}
        <div className=''>
          <h2 className='font-bold text-[1.4rem]'>カテゴリー</h2>
          <div className='flex flex-wrap gap-4 my-4'>
            {count > 0 &&
              results.map((category) => (
                <div
                  key={category.id}
                  className='bg-neutral-100 text-sm py-2 px-4 rounded-xl shadow-md cursor-pointer'
                >
                  <span>{category.name}</span>
                  <span>({category.count})</span>
                </div>
              ))}
          </div>
        </div>
        {/* 記事エリア */}
        <div className=''>
          <h2 className='font-bold text-[1.4rem]'>新着記事</h2>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function getServerSideProps() {
  let response;
  try {
    const res = await fetch(`${process.env.APP_ENDPONT}/api/category/all`);
    if (res.ok) {
      response = await res.json();
      console.log('レスポンスOK', response);
    }
  } catch (err) {
    console.error('why error...', err);
    response = { name: 'Api call Error...' };
  }

  return { props: response };
}
