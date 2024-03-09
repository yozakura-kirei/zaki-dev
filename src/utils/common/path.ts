/**
 * APIエンドポイント
 */
export const API = {
  CATEGORY_ALL: `${process.env.APP_ENDPONT}/api/category/all`,
  NOTICES: `${process.env.APP_ENDPONT}/api/notices/limit?limit`,
  ARTICLES: `${process.env.APP_ENDPONT}/api/articles/limit?limit`,
};

/**
 * 内部パス
 */
export const PATH = {
  ROOT: '/',
  CONTACTS: '/contacts',
  NOTICES: '/notices',
  ARTICLES: '/articles',
};
