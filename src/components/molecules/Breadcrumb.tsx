import { generateBreadCrumbList } from '@/libs/BreadCrumbList';
import { isUUID } from '@/utils/createValue';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Fragment } from 'react';
import { GoChevronRight } from 'react-icons/go';

/**
 * パンくずリストを作成
 * @param title UUIDで使用するタイトル
 * @param type  1が記事
 * @returns
 */
export default function BreadCrumb({ title }: { title: string }) {
  const router = useRouter();

  // ページのパスからパンクズリスト作成
  const pathItems = router.asPath.split('/').filter(Boolean);

  let jpTitle = '';
  const breadCrumbItems = pathItems.map((pathName, index) => {
    // 一覧系
    if (pathName === 'articles') {
      jpTitle = '記事一覧';
    } else if (pathName === 'notices') {
      jpTitle = 'お知らせ一覧';
    }

    // UUIDをタイトルデータに変換
    if (isUUID(pathName)) {
      jpTitle = title;
    }

    const pathList = {
      title: pathName,
      jpTitle,
      path: `${process.env.APP_ENDPONT}/${pathItems.slice(0, index + 1).join('/')}`,
    };

    return pathList;
  });

  // ホームのパンくずを最初に追加する
  const home = {
    title: '/',
    jpTitle: 'ホーム',
    path: '/',
  };

  breadCrumbItems.unshift(home);

  // json-ld形式のパンくずリスト作成
  const jsonLdData = generateBreadCrumbList(breadCrumbItems);

  console.log(jsonLdData);

  return (
    <div>
      <nav className=''>
        <ol className='bg-neutral-200 py-2 px-4 rounded-lg shadow-sm'>
          {breadCrumbItems.map((item, index) => (
            <li key={index} className='inline'>
              {index < breadCrumbItems.length - 1 ? (
                <Fragment>
                  <Link
                    href={item.path}
                    className='text-linkText font-semibold border-b-2 border-linkText'
                  >
                    {item.jpTitle}
                  </Link>
                  <span className='inline-block align-[-2px] px-1'>
                    <GoChevronRight />
                  </span>
                </Fragment>
              ) : (
                <span>{item.jpTitle}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <Script
        id='breadcrumb-jsonld'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: jsonLdData }}
      />
    </div>
  );
}
