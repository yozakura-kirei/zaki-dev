import { mysqlClient } from '@/libs/client';
import { SQL } from '@/utils/sql';

/**
 * カテゴリ一覧と件数を取得する
 */
export async function getCategoriesSQL() {
  const connection = await mysqlClient();

  const response = {
    categoriesCount: 0,
    categories: [],
  };

  try {
    const [results] = await connection.execute<[]>(SQL.getCategories, [
      'カテゴリなし',
    ]);
    console.log(connection.format(SQL.getCategories), 'params', 'カテゴリなし');
    response.categoriesCount = results.length;
    response.categories = results;
  } catch (err) {
    console.error('getCategories error...', err);
  } finally {
    await connection.end();
  }

  return response;
}
