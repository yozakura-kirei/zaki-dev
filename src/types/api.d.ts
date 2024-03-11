/**
 * 内部APIへのリクエスト、レスポンスの型情報
 */
export interface API_RES_TYPE {
  notices: {
    id: number;
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
    articlesCount: number;
    articles: {
      article_id: string;
    }[];
  };
}
