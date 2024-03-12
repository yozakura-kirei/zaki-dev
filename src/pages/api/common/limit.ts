import { selectQuery } from '@/libs/mysql';
import { SQL } from '@/utils/sql';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * データ一覧を取得する(共通)
 * @param req limit TOPは最大10件のlimit
 * @param req type 1...article, 2...notice
 * @param res
 */
export default async function selectSQL(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { limit, type } = req.query;
    let response;

    if (parseInt(type as string) === 1) {
      response = await selectQuery(SQL.getArticles, parseInt(limit as string));
    } else if (parseInt(type as string) === 2) {
      response = await selectQuery(SQL.getNotices, parseInt(limit as string));
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
