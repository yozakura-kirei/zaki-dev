import { mysqlClient } from '@/libs/client';
import { ResultSetHeader } from 'mysql2';

// お問い合わせ
interface ContactProps {
  name: string;
  email: string;
  contact_detail: string;
  is_personal_info: boolean;
  created_at: number;
}

/**
 * transactionでインサートSQL実行する
 */
export async function insertQuery(sql: string, params: ContactProps) {
  const connection = await mysqlClient();

  const response = {
    isError: false,
    isSave: false,
    insertData: {},
  };

  try {
    await connection.beginTransaction();
    await connection.query<ResultSetHeader>(sql, params);
    console.log(connection.format(sql), 'params: ', params);
    response.isSave = true;
    response.insertData = params;
    await connection.commit();
  } catch (err) {
    console.error('insert error...', err);
    console.error(connection.format(sql), 'params: ', params);
    response.isError = true;
    await connection.rollback();
  } finally {
    connection.end();
  }

  return response;
}
