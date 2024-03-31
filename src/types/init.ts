import { API_RES_TYPE } from './api';

/**
 * 初期値を保持する
 */
export const INIT = {
  notices: {
    id: 0,
    notice_id: '',
    title: '',
    is_fixed: false,
    content: '',
    name: '',
    created_at: 0,
    updated_at: 0,
  } as API_RES_TYPE['notices'],
  articles: {
    id: 0,
    article_id: '',
    title: '',
    content: '',
    is_fixed: false,
    categories: '',
    search_name: '',
    created_at: 0,
    updated_at: 0,
  } as API_RES_TYPE['articles'],
};
