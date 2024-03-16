/**
 * 内部APIへのリクエスト、レスポンスの型情報
 */
export interface API_RES_TYPE {
  notices: {
    id: number;
    notice_id: string;
    title: string;
    is_fixed: boolean;
    content: string;
    name: string;
    created_at: number;
    updated_at: number | null;
  };
  categories: {
    id: number;
    name: string;
    count: number;
  };
  articles: {
    id: number;
    article_id: string;
    title: string;
    content: string;
    is_fixed: boolean;
    category_name: string;
    created_at: number;
    updated_at: number;
  };
  onlyArticleId: {
    count: number;
    data: {
      article_id: string;
    }[];
  };
  onlyNoticeId: {
    count: number;
    data: {
      notice_id: string;
    }[];
  };
  searchResults: {
    // data: {
    path_id: string;
    title: string;
    content: string;
  };
  // };
}
