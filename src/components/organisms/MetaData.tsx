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
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicons/favicon-16x16.png'
      />
      <link rel='manifest' href='/favicons/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/favicons/safari-pinned-tab.svg'
        color='#000000'
      />
      <link rel='shortcut icon' href='/favicon.ico' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-config'
        content='/favicons/browserconfig.xml'
      />{' '}
      <meta name='theme-color' content='#ffffff' />
      {/* <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicon.png' /> */}
    </Head>
  );
}
