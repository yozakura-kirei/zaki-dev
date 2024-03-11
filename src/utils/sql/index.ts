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
    'SELECT t_n.id, t_n.notice_id, t_n.title, t_n.is_fixed, t_n.content, mcn.name, t_n.created_at, t_n.updated_at \
    FROM t_notices t_n \
    LEFT JOIN m_category_notices mcn on mcn.id = t_n.m_category_notices_id \
    ORDER BY t_n.created_at DESC \
    LIMIT ?;',
  // 記事を取得
  getArticles: `SELECT \
    ta.id, \
    ta.article_id, \
    ta.title, \
    ta.content, \
    ta.is_fixed, \
    GROUP_CONCAT(mc.name) AS category_name, \
    ta.created_at, \
    ta.updated_at  \
    FROM i_articles_categories iac \
    LEFT JOIN t_articles ta on ta.id = iac.t_articles_id \
    LEFT JOIN m_categories mc on mc.id = iac.m_categories_id \
    WHERE ta.deleted_at IS NULL \
    GROUP BY iac.t_articles_id \
    ORDER BY MAX(ta.created_at) DESC LIMIT ?;`,
  // 記事の詳細を取得
  getArticleId: `SELECT \
    ta.id, ta.article_id, ta.title, ta.content, ta.is_fixed, GROUP_CONCAT(mc.name) as category_name, ta.created_at, ta.updated_at \
    FROM i_articles_categories iac \
    LEFT JOIN t_articles ta ON ta.id = iac.t_articles_id \
    LEFT JOIN m_categories mc ON mc.id = iac.m_categories_id \
    WHERE ta.article_id = ? \
    GROUP BY ta.article_id LIMIT 1;`,
  // articleIdのみを取得
  getOnlyArticleId: `SELECT ta.article_id  FROM t_articles ta LIMIT ?;`,
  getOnlyNoticeId: `SELECT tn.notice_id FROM t_notices tn LIMIT ?;`,
};
