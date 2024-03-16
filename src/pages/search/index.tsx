import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { Description } from '@/utils/common/site';
import { CiSearch } from 'react-icons/ci';

/**
 * 検索画面
 */
export default function Page() {
  function siteSearch(event: any) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <>
      <MetaData
        isTitle={false}
        title='サイト内検索'
        description={Description.basic}
      />
      <PageWrapper isGrid={false}>
        <h1>サイト内検索</h1>
        <p>
          検索したいキーワードを入力してください(複数の場合はスペース区切り)
        </p>
        {/* 検索ボックス */}
        <section className='my-6'>
          <form>
            {/* 選択 */}
            <div className='border-2 flex items-center rounded-xl'>
              <select
                id='selectedDrop'
                className='w-[100px] md:w-[145px] text-[0.8rem] md:text-[1rem] py-4 px-2 md:px-4 appearance-none c_searchBox'
              >
                <option value='article' selected>
                  記事
                </option>
                <option value='category'>カテゴリ</option>
                <option value='notice'>お知らせ</option>
              </select>

              {/* インプット */}
              <div className='flex items-center justify-between gap-2 md:gap-4 flex-1 border-l-2 bg-White'>
                <input type='text' className='py-4 px-2 md:px-4 flex-1' />
                <button
                  className='flex justify-center mr-2'
                  onClick={siteSearch}
                >
                  <CiSearch className='text-[1rem] md:text-[1.4rem]' />
                </button>
              </div>
            </div>
          </form>
        </section>
      </PageWrapper>
    </>
  );
}
