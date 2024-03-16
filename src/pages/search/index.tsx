import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { API_RES_TYPE } from '@/types/api';
import { API } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import { convertFullWidth } from '@/utils/createValue';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

/**
 * 検索画面
 */
export default function Page() {
  const [selectedValue, setSelectedValue] = useState<string>('1');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [isSearchArea, setSearchArea] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    API_RES_TYPE['searchResults'][]
  >([]);

  function selectedChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(event.target.value);
  }

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  // 検索文字がない時は検索ボタンを押せないように
  function isInputValue() {
    return inputValue.trim() === '';
  }

  async function siteSearch(event: FormEvent) {
    event.preventDefault();
    // スペースは全て半角にする
    const convertInputValue = convertFullWidth(inputValue);
    console.log(typeof selectedValue, convertInputValue);
    const response = await fetch(
      `${API.SEARCH_MULT}=10&type=${selectedValue}&searchText=${inputValue}`,
    );

    if (response.ok) {
      const searchResult = await response.json();
      console.log('検索結果', searchResult);
      setSearchResults(searchResult.data);
    }
    // }
    setSearchTitle(inputValue);
    setSearchArea(true);
    setInputValue('');
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
          <form className='bg-White border-2 rounded-xl' onSubmit={siteSearch}>
            {/* 選択 */}
            <div className='flex items-center'>
              <select
                id='selectedDrop'
                value={selectedValue}
                onChange={selectedChange}
                className='w-[100px] md:w-[145px] text-[0.8rem] md:text-[1rem] py-4 px-2 md:px-4 appearance-none c_searchBox'
              >
                <option value={1}>記事</option>
                {/* <option value={2}>カテゴリ</option> */}
                <option value={3}>お知らせ</option>
              </select>

              {/* インプット */}
              <div className='flex items-center justify-between gap-2 md:gap-4 flex-1 border-l-2'>
                <input
                  type='text'
                  className='py-4 px-2 md:px-4 flex-1'
                  placeholder='サイト内検索'
                  value={inputValue}
                  onChange={inputChange}
                />
                <button
                  type='submit'
                  className='flex justify-center mr-2'
                  disabled={isInputValue()} // trueのとき押せない
                >
                  <CiSearch className='text-[1rem] md:text-[1.4rem]' />
                </button>
              </div>
            </div>
          </form>
        </section>
        {/* 検索結果 */}
        {isSearchArea && (
          <section>
            <div>
              <h2 className='text-[1.4rem] font-bold'>
                {searchTitle} の検索結果
              </h2>
            </div>
            {searchResults.length > 0 ? (
              searchResults.map((data) => (
                <div key={data.path_id} className='my-4'>
                  <h3 className='text-[1.1rem] text-blue-900  font-bold my-4'>
                    <Link
                      href={`/${selectedValue === '1' ? 'articles/' : selectedValue === '3' && 'notices/'}${data.path_id}`}
                      className='border-blue-900 border-b-2'
                    >
                      {data.title}
                    </Link>
                  </h3>
                  <p>{data.content}</p>
                </div>
              ))
            ) : (
              <>{searchTitle}は見つかりませんでした</>
            )}
            <div></div>
          </section>
        )}
      </PageWrapper>
    </>
  );
}
