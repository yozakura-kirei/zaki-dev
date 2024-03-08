export const SQL = {
  // カテゴリ一覧、件数を取得
  getCategories:
    'SELECT mc.id, mc.name, COUNT(mc.id) as count \
  FROM i_articles_categories iac\
  LEFT JOIN m_categories mc ON mc.id = iac.m_categories_id \
  WHERE mc.name IS NOT NULL AND mc.name != ? \
  GROUP BY iac.m_categories_id \
  ORDER BY MAX(iac.created_at) DESC LIMIT 50;',
};
