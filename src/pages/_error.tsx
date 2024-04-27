import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';
import * as Sentry from '@sentry/nextjs';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  return statusCode ? (
    <Error statusCode={statusCode}></Error>
  ) : (
    <p>An error occurred on client</p>
  );
};

ErrorPage.getInitialProps = async (context: NextPageContext) => {
  const { res, err } = context;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (err) {
    // このページに来た例外をキャプチャ
    await Sentry.captureUnderscoreErrorException(context);
  }

  return { statusCode };
};

export default ErrorPage;
