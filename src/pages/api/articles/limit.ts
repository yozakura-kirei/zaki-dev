import { getArticlesSQL } from '@/libs/mysql/articles';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 記事の一覧を取得する
 * @param req TOPは最大10件のlimit
 * @param res
 */
export default async function getArticles(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { limit } = req.query;
    const articles = await getArticlesSQL(parseInt(limit as string));
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
}
