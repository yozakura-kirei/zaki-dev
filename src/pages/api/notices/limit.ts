import { getNoticeSQL } from '@/libs/mysql/notice';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * お知らせ一覧を取得する
 * @param req TOPはlimit5件
 * @param res
 */
export default async function getNoticesLimit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { limit } = req.query;
    const notices = await getNoticeSQL(parseInt(limit as string));
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json(err);
  }
}
