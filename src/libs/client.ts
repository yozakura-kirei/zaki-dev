import mysql from 'mysql2/promise';
/**
 * PlanetScale
 */
export async function mysqlClient() {
  return await mysql.createConnection(process.env.DATABASE_URL ?? '');
}
