import { mysqlClient } from '@/libs/client';
import { SQL } from '@/utils/sql';

/**
 * お知らせを取得する
 * @param limit お知らせ取得件数
 * @returns
 */
export async function getNoticeSQL(limit: number) {
  const connection = await mysqlClient();

  const response = {
    noticesCount: 0,
    notices: [],
  };

  try {
    const [results] = await connection.execute<[]>(SQL.getNotices, [limit]);
    console.log(connection.format(SQL.getNotices), 'params: ', limit);
    response.noticesCount = results.length;
    response.notices = results;
  } catch (err) {
    console.error('getNoticeSQL error...', err);
  } finally {
    await connection.end();
  }

  return response;
}
