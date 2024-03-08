export interface COLUMNS {
  t_articles: {
    id?: number;
    article_id?: string;
    title: string;
    content: string;
    status?: number;
    display_order?: number;
    is_fixed?: boolean;
    created_at?: number;
    updated_at?: null;
    deleted_at?: null;
    created_by?: string;
    updated_by?: null;
    deleted_by?: null;
  };
  i_articles_categories: {
    id?: number;
    t_articles_id: number;
    m_categories_id: number;
    created_at?: number;
    updated_at?: number;
    deleted_at?: number;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
  };
}
