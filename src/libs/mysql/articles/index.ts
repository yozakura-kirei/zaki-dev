import { mysqlClient } from '@/libs/client';
import { SQL } from '@/utils/sql';

/**
 * 記事を取得する
 * @param limit 記事取得件数
 * @returns
 */
export async function getArticlesSQL(limit: number) {
  const connection = await mysqlClient();

  const response = {
    articlesCount: 0,
    articles: [],
  };

  try {
    const [results] = await connection.execute<[]>(SQL.getArticles, [limit]);
    console.log(connection.format(SQL.getArticles), 'params: ', limit);
    response.articlesCount = results.length;
    response.articles = results;
  } catch (err) {
    console.error('getArticlesSQL error...', err);
  } finally {
    await connection.end();
  }

  return response;
}
