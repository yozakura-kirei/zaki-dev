import { selectQueryId } from '@/libs/mysql';
import { SQL } from '@/utils/sql';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * お知らせの詳細を取得する
 * @param req id 取得したいID
 * @param req type 1...article, 2...notice
 * @param res
 */
export default async function selectId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let response;
    const { id, type } = req.query;

    if (parseInt(type as string) === 1) {
      response = await selectQueryId(SQL.getArticleId, id as string);
    } else if (parseInt(type as string) === 2) {
      response = await selectQueryId(SQL.getNoticeId, id as string);
    }

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json(`Not Found ${id}`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
