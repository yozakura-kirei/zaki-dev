import { mysqlClient } from '@/libs/client';
import { SQL } from '@/utils/sql';

/**
 * カテゴリ一覧と件数を取得する
 */
export async function getCategoriesSQL() {
  const connection = await mysqlClient();

  const response = {
    count: 0,
    results: [],
  };

  try {
    const [results] = await connection.execute<[]>(SQL.getCategories, [
      'カテゴリなし',
    ]);
    console.log(connection.format(SQL.getCategories), 'params', 'カテゴリなし');
    response.count = results.length;
    response.results = results;
  } catch (err) {
    console.error('getCategories error...', err);
  } finally {
    await connection.end();
  }

  return response;
}
