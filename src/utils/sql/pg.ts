import { Client, Pool } from 'pg';
import { SQL } from './queries';
import { COLUMNS } from '@/types/columns';
import { API_RES_TYPE } from '@/types/api';

const pgData = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT as string) ?? 5432,
};

/** select */
export async function selectQuery(sql: string, option: any[]) {
  const client = new Client(pgData);
  const response = {
    count: 0,
    rows: [] as any[],
  };

  await client.connect();

  try {
    const { rowCount, rows } = await client.query(sql, option);
    console.log('select query success', sql, 'params: ', option);
    response.count = rowCount as number;
    response.rows = rows;
  } catch (err) {
    console.error('select query error...', err);
  } finally {
    await client.end();
  }

  return response;
}

/** カテゴリに紐づく記事 検索したカテゴリ名を含めるため別関数 */
export async function selectArticleCategories(
  sql: string,
  option: any[],
  categoryName: string,
) {
  // カテゴリに紐づく記事一覧
  const articles: API_RES_TYPE['articleCategoryType'] = await selectQuery(
    sql,
    option,
  );
  if (articles.count > 0) {
    // 検索したカテゴリ名を含めてレスポンスにつける
    const { rows, count }: API_RES_TYPE['articleCategoryType'] =
      await selectQuery(SQL.onlyCategoryName, [`%${categoryName}%`, 1]);
    if (count > 0) {
      articles.categoryName = rows[0].name;
    }
  }

  return articles;
}

/** transaction付きinsert */
export async function saveQuery(sql: string, params: COLUMNS['t_contacts'][]) {
  const pool = new Pool(pgData);
  const client = await pool.connect();

  const response = {
    isError: false,
    isSave: false,
    rowCount: 0,
  };

  try {
    await client.query('BEGIN');
    const { rowCount } = await client.query(sql, Object.values(params));

    response.isSave = true;
    response.rowCount = rowCount as number;

    await client.query('COMMIT');
  } catch (err) {
    console.error('insert error...', err);
    console.error(sql, 'params: ', params);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }

  return response;
}
