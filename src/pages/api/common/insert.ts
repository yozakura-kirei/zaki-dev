import { createUnix } from '@/utils/createValue';
import { saveQuery } from '@/utils/sql/pg';
import { NextApiRequest, NextApiResponse } from 'next';
import { SQL } from '@/utils/sql/queries';

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
      const { isError, isSave, rowCount } = await saveQuery(
        SQL.insertContact,
        req.body,
      );
      if (!isError) {
        res.status(201).json({ rowCount, isError, isSave });
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
