import { generateBreadCrumbList } from '@/libs/BreadCrumbList';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Fragment, ReactNode } from 'react';

export default function BreadCrumb() {
  const router = useRouter();

  // ページのパスからパンクズリスト作成
  const pathItems = router.asPath.split('/').filter(Boolean);
  console.log('パスアイテム', pathItems);
  const breadCrumbItems = pathItems.map((item, index) => ({
    title: item,
    path: `${process.env.APP_ENDPONT}/${pathItems.slice(0, index + 1).join('/')}`,
  }));

  // json-ld形式のパンくずリスト作成
  const jsonLdData = generateBreadCrumbList(breadCrumbItems);

  console.log(jsonLdData);

  return (
    <div>
      <nav>
        <ol className='flex items-center'>
          {breadCrumbItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path}> / {item.title}</Link>
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
