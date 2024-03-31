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
    search_name: string;
    count: number;
  };
  articles: {
    id: number;
    article_id: string;
    title: string;
    content: string;
    is_fixed: boolean;
    categories: string;
    search_name: string;
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
  onlyCategoryName: {
    count: number;
    data: {
      name: string;
      search_name: string;
    }[];
  };
  searchResults: {
    path_id: string;
    title: string;
    content: string;
  };
  categorySearch: {
    count: number;
    categoryName?: string;
    data: {
      name: string;
    }[];
  };
  articleCategoryType: {
    count: number;
    categoryName?: string;
    rows: {
      name: string;
    }[];
  };

  categorySearchRes: {
    id: number;
    article_id: string;
    title: string;
    content: string;
    categories: string;
    search_name: string;
    is_fixed: boolean;
    created_at: number;
    updated_at?: number;
  };
  categoriesSearchResult: {
    count: number;
    data: API_RES_TYPE['categorySearchRes'][];
    categoryName: string;
  };
}
