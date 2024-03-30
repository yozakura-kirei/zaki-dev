export const SQL = {
  // カテゴリ一覧、件数を取得
  selectCategories: `SELECT \
      mc.id, mc.name, mc.search_name, COUNT(mc.id) as count \
    FROM \
      i_articles_categories iac \
    LEFT JOIN \
      m_categories mc ON mc.id = iac.m_categories_id \
    WHERE \
      mc.name IS NOT NULL AND mc.name != $1 \
    GROUP BY \
      mc.id, mc.name, mc.search_name \
    ORDER BY \
      MAX(iac.created_at) DESC \
    LIMIT \
      50;`,
  // お知らせを取得
  selectNotices: `SELECT \
      t_n.id, t_n.notice_id, t_n.title, t_n.is_fixed, t_n.content, mcn.name, t_n.created_at, t_n.updated_at \
    FROM \
      t_notices t_n \
    LEFT JOIN \
      m_category_notices mcn on mcn.id = t_n.m_category_notices_id \
    ORDER BY \
      t_n.created_at DESC \
    LIMIT $1;`,
  // 記事を取得
  selectArticles: `SELECT \
      ta.id, \
      ta.article_id, \
      ta.title, \
      ta.content, \
      ta.is_fixed, \
      STRING_AGG(mc.name, ',') AS categories, \
      STRING_AGG(mc.search_name, ',') AS search_name, \
      ta.created_at, \
      ta.updated_at \
    FROM \
      i_articles_categories iac \
    LEFT JOIN \
      t_articles ta ON ta.id = iac.t_articles_id \
    LEFT JOIN \
      m_categories mc ON mc.id = iac.m_categories_id \
    WHERE \
      ta.deleted_at IS NULL \
    GROUP BY \
      iac.t_articles_id, \
      ta.id \
    ORDER BY \
      MAX(ta.created_at) DESC \
    LIMIT $1;`,
  // 記事の詳細を取得
  selectArticleId: `SELECT \
      ta.id, \
      ta.article_id, \
      ta.title, \
      ta.content, \
      ta.is_fixed, \
      STRING_AGG(mc.name, ',') AS categories, \
      STRING_AGG(mc.search_name, ',') AS search_name, \
      ta.created_at, \
      ta.updated_at \
    FROM \
      i_articles_categories iac \
    LEFT JOIN \
      t_articles ta ON ta.id = iac.t_articles_id \
    LEFT JOIN \
      m_categories mc ON mc.id = iac.m_categories_id \
    WHERE \
      ta.article_id = $1 \
    GROUP BY \
      ta.id, \
      ta.article_id, \
      ta.title, \
      ta.content, \
      ta.is_fixed, \
      ta.created_at, \
      ta.updated_at \
    LIMIT $2;`,
  // お知らせの詳細を取得
  selectNoticeId: `SELECT \ 
    ta.id, ta.notice_id, ta.title, ta.is_fixed, ta.content, mcn.name, ta.created_at, ta.updated_at \
    FROM t_notices ta \
    LEFT JOIN m_category_notices mcn ON mcn.id = ta.m_category_notices_id \
    WHERE notice_id = $1 \
    LIMIT 1;`,
  // articleIdのみを取得
  onlyArticleId: `SELECT ta.article_id FROM t_articles ta LIMIT 2000;`,
  // noticeIdのみを取得
  onlyNoticeId: `SELECT tn.notice_id FROM t_notices tn LIMIT 1000;`,
  // categoryのsearch_nameのみを取得(のちほど)
  onlyCategorySearchName: `SELECT mc.search_name FROM m_categories mc WHERE mc.name IS NOT NULL AND mc.name != 'カテゴリなし' LIMIT 1000;`,
  // categoryのcategory_nameのみを取得
  onlyCategoryName: `SELECT mc.name FROM m_categories mc WHERE mc.search_name LIKE $1 LIMIT $2;`,
  // カテゴリに紐づく記事を取得
  categoryArticles: `SELECT \
    ta.id, \
    ta.article_id, \
    ta.title, \
    ta.content, \
    STRING_AGG(mc.name, ',') AS categories, \
    STRING_AGG(mc.search_name, ',') AS search_name, \
    ta.is_fixed, \
    ta.created_at, \
    ta.updated_at \
    FROM \
      i_articles_categories iac \
    LEFT JOIN \
      t_articles ta ON ta.id = iac.t_articles_id \
    LEFT JOIN \
      m_categories mc ON mc.id = iac.m_categories_id \
    WHERE \
      ta.deleted_at IS NULL \
    GROUP BY \
      iac.t_articles_id, \
      ta.id \
    HAVING \
      STRING_AGG(mc.search_name, ',') LIKE $1  
    LIMIT 1000;`,
  // お問い合わせインサート
  insertContact: `INSERT INTO t_contacts \
  (name, email, contact_detail, is_personal_info, created_at) VALUES \
  ($1, $2, $3, $4, $5);`,
  /** 検索 */
  // 記事
  searchArticles: `SELECT \
    ta.article_id AS path_id, ta.title, ta.content \
    FROM \
      t_articles ta \
    WHERE \
      ta.title &@~ $1 \
    OR \
      ta.content &@~ $1 \
    LIMIT $2;`,
  // カテゴリ
  searchCategories: ``,
  // お知らせ
  searchNotices: `SELECT \
    tn.notice_id AS path_id, tn.title, tn.content \
    FROM \
      t_notices tn \
    WHERE \
      tn.title &@~ $1 \
    OR \
      tn.content &@~ $1 \
    LIMIT $2;`,
};
