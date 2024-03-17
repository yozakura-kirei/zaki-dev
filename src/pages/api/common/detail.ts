import { selectQuery, selectQueryId } from '@/libs/mysql';
import { API_RES_TYPE } from '@/types/api';
import { SQL } from '@/utils/sql';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * [共通] idを指定するセレクト実行API
 * @param req id 取得したいID
 * @param req type 1...article, 2...notice, 3...category
 * @param res
 */
export default async function selectId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let response;
    const { id, type, limit } = req.query;

    if (parseInt(type as string) === 1) {
      // article詳細
      response = await selectQueryId(SQL.getArticleId, id as string);
    } else if (parseInt(type as string) === 2) {
      // notice詳細
      response = await selectQueryId(SQL.getNoticeId, id as string);
    } else if (parseInt(type as string) === 3) {
      // カテゴリに紐づく記事
      const selectResult: API_RES_TYPE['categorySearch'] = await selectQuery(
        SQL.categoryArticles,
        parseInt(limit as string),
        `%${id}%`,
      );

      if (selectResult) {
        // 検索したカテゴリ名を含めて返却
        const categoryName: API_RES_TYPE['categorySearch'] = await selectQuery(
          SQL.getOnlyCategoryName,
          1,
          `%${id}%`,
        );
        selectResult.categoryName = categoryName.data[0].name;
      }
      response = selectResult;
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
