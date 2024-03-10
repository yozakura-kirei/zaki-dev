import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ja'>
      <Head />
      <body className='font-Basic text-Basic'>
        <Header />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
