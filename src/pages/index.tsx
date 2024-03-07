import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page({ name }: { name: string }) {
  return (
    <main>
      <p>新しいアプリ {name}</p>
      <p>{process.env.APP_ENDPONT}</p>
      <p>https://github.com/vercel/next.js/discussions/59731</p>
      <p>👆これ読んでみて</p>
    </main>
  );
}

export async function getServerSideProps() {
  console.log(process.env.APP_ENDPONT);
  const res = await fetch(`${process.env.APP_ENDPONT}/api/hello`);
  console.log(res);
  let response;
  try {
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
