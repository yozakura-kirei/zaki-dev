import { getCategoriesSQL } from '@/libs/mysql/category';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const categories = await getCategoriesSQL();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
}
