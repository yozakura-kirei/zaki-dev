import { selectQuery } from '@/libs/mysql';
import { SQL } from '@/utils/sql';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * データ一覧を取得する(共通)
 * @param req limit TOPは最大10件のlimit
 * @param req type 1...article, 2...notice、3...article検索、4...category検索、5...notice検索
 * @param res
 */
export default async function selectSQL(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { limit, type } = req.query;
    let sql = '';

    if (type === '1') {
      sql = SQL.getArticles;
    } else if (type === '2') {
      sql = SQL.getNotices;
    }

    const response = await selectQuery(sql, parseInt(limit as string));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
