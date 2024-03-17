/**
 * APIエンドポイント
 */
export const API = {
  CATEGORY_ALL: `${process.env.APP_ENDPONT}/api/category/all`,
  // NOTICES: `${process.env.APP_ENDPONT}/api/notices/limit?limit`,
  ARTICLES: `${process.env.APP_ENDPONT}/api/articles/limit?limit`,
  SELECT_MULT: `${process.env.APP_ENDPONT}/api/common/limit?limit`,
  SEARCH_MULT: `${process.env.APP_ENDPONT}/api/common/search?limit`,
  DETAIL_ID: `${process.env.APP_ENDPONT}/api/common/detail?`,
  INSERT: `${process.env.APP_ENDPONT}/api/common/insert`,
};

/**
 * 内部パス
 */
export const PATH = {
  ROOT: '/',
  CONTACTS: '/contacts',
  NOTICES: '/notices',
  ARTICLES: '/articles',
  CATEGORY: '/category',
};
