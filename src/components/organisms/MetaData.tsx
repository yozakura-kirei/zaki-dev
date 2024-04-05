import { SiteName } from '@/utils/common/site';
import Head from 'next/head';

interface MetaDataProps {
  isTitle: boolean; // trueならサイト名のみ falseはタイトル | サイト名になる
  title?: string;
  description?: string;
}

/**
 * サイトのメタ情報を管理するコンポーネント
 * @param param0
 * @returns
 */
export default function MetaData({
  isTitle,
  title,
  description,
}: MetaDataProps) {
  return (
    <Head>
      <title>{isTitle ? `${SiteName}` : `${title + ' | ' + SiteName}`}</title>
      {description && (
        <meta name='description' content={description} key='desc' />
      )}
      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicon.png' />
      <link rel='stylesheet' href='' />
    </Head>
  );
}
