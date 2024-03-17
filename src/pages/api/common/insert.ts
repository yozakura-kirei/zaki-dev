import { insertQuery } from '@/libs/mysql/transaction';
import { createUnix } from '@/utils/createValue';
import { SQL } from '@/utils/sql';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * [共通] transactionでinsert処理を実行するAPI
 * @param req
 * @param res
 */
export default async function insertHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      req.body.created_at = createUnix();
      const { isError, isSave, insertData } = await insertQuery(
        SQL.contactInsert,
        req.body,
      );
      if (!isError) {
        res.status(201).json({ insertData, isError, isSave });
      } else {
        res.status(500).json(false);
      }
    } else {
      // POST以外
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowd` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
