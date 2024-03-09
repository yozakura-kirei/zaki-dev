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
}
