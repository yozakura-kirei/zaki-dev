import { mysqlClient } from '@/libs/client';
import { SQL } from '@/utils/sql';
import { RowDataPacket } from 'mysql2';

/**
 * 記事関係のSQLを実行する
 * @param sql   実行するSQL文
 * @param limit 記事取得件数
 * @returns
 */
export async function getArticlesSQL(sql: string, limit?: number) {
  const connection = await mysqlClient();

  console.log(sql, limit);

  const limitSize = limit ? limit : 1000;

  const response = {
    articlesCount: 0,
    articles: [],
  };

  try {
    const [results] = await connection.execute<[]>(sql, [limitSize]);
    console.log(connection.format(SQL.getArticles), 'params: ', limitSize);
    response.articlesCount = results.length;
    response.articles = results;
  } catch (err) {
    console.error('getArticlesSQL error...', err);
  } finally {
    await connection.end();
  }

  return response;
}

/**
 * article_idをもとに記事の詳細を取得する
 */
export async function getArticleIdSQL(id: string) {
  const connection = await mysqlClient();

  let response: RowDataPacket | boolean;

  try {
    const [results] = await connection.execute<RowDataPacket[]>(
      SQL.getArticleId,
      [id],
    );
    console.log(connection.format(SQL.getArticleId), 'params: ', id);
    if (results && results.length > 0) {
      response = results[0];
    } else {
      response = false;
      // throw new Error(`Not Found article ${id}`);
    }
  } catch (err) {
    console.error('getArticleIdSQL error...', err);
    response = false;
  } finally {
    await connection.end();
  }

  return response;
}
