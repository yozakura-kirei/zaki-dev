export const SQL = {
  // カテゴリ一覧、件数を取得
  getCategories:
    'SELECT mc.id, mc.name, COUNT(mc.id) as count \
  FROM i_articles_categories iac\
  LEFT JOIN m_categories mc ON mc.id = iac.m_categories_id \
  WHERE mc.name IS NOT NULL AND mc.name != ? \
  GROUP BY iac.m_categories_id \
  ORDER BY MAX(iac.created_at) DESC LIMIT 50;',
  // お知らせを取得
  getNotices:
    'SELECT t_n.id, t_n.title, t_n.is_fixed, t_n.content, mcn.name, t_n.created_at, t_n.updated_at \
    FROM t_notices t_n \
    LEFT JOIN m_category_notices mcn on mcn.id = t_n.m_category_notices_id \
    ORDER BY t_n.created_at DESC \
    LIMIT ?;',
};
