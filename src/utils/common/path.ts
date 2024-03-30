/**
 * APIエンドポイント
 */
export const API = {
  SEARCH_MULT: `${process.env.APP_ENDPONT}/api/common/search?limit`,
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
