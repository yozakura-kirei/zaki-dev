import { getCategoriesSQL } from '@/libs/mysql/category';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await getCategoriesSQL();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
