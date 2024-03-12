import { mysqlClient } from '@/libs/client';
import { SQL } from '@/utils/sql';
import { RowDataPacket } from 'mysql2';

/**
 * セレクト文を実行する(共通)
 * @param sql   実行するSQL文
 * @param limit リミット
 * @returns
 */
export async function selectQuery(sql: string, limit?: number) {
  const connection = await mysqlClient();

  const limitSize = limit ? limit : 1000;

  const response = {
    count: 0,
    data: [],
  };

  try {
    const [results] = await connection.execute<[]>(sql, [limitSize]);
    console.log(connection.format(SQL.getArticles), 'params: ', limitSize);
    response.count = results.length;
    response.data = results;
  } catch (err) {
    console.error('selectQuery error...', err);
  } finally {
    await connection.end();
  }

  return response;
}

/**
 * idをもとにデータを取得する(共通)
 */
export async function selectQueryId(sql: string, id: string) {
  const connection = await mysqlClient();

  let response: RowDataPacket | boolean;

  try {
    const [results] = await connection.execute<RowDataPacket[]>(sql, [id]);
    console.log(connection.format(sql), 'params: ', id);
    if (results && results.length > 0) {
      response = results[0];
    } else {
      response = false;
      // throw new Error(`Not Found article ${id}`);
    }
  } catch (err) {
    console.error(`SQL ID Error... ${sql}`, err);
    response = false;
  } finally {
    await connection.end();
  }

  return response;
}
