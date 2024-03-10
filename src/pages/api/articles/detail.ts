import { getArticleIdSQL } from '@/libs/mysql/articles';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 記事の詳細を取得する
 * @param req
 * @param res
 */
export default async function getArticleDetail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const articleId = await getArticleIdSQL(id as string);
    if (articleId) {
      res.status(200).json(articleId);
    } else {
      res.status(404).json(`Not Found ${id}`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
