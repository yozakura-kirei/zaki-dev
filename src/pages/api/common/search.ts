import { searchQuery, selectQuery } from '@/libs/mysql';
import { SQL } from '@/utils/sql';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * FULLTEXTからキーワード検索を取得する
 * @param req limit TOPは最大10件のlimit
 * @param req type 1...article検索、2...category検索、3...notice検索
 * @param res
 */
export default async function searchSQL(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { limit, searchText, type } = req.query;
    let sql = '';

    if (type === '1') {
      sql = SQL.searchArticle;
    } else if (type === '2') {
      sql = '';
    } else if (type === '3') {
      sql = SQL.searchNotice;
    }

    const response = await searchQuery(
      sql,
      searchText as string,
      parseInt(limit as string),
    );

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
