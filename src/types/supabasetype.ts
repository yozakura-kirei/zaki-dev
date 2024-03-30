export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      i_articles_categories: {
        Row: {
          created_at: number | null;
          created_by: string;
          deleted_at: number | null;
          deleted_by: string | null;
          id: number;
          m_categories_id: number;
          t_articles_id: number | null;
          updated_at: number | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: number | null;
          created_by: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          m_categories_id: number;
          t_articles_id?: number | null;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: number | null;
          created_by?: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          m_categories_id?: number;
          t_articles_id?: number | null;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'i_articles_categories_m_categories_id_fkey';
            columns: ['m_categories_id'];
            isOneToOne: false;
            referencedRelation: 'm_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'i_articles_categories_t_articles_id_fkey';
            columns: ['t_articles_id'];
            isOneToOne: false;
            referencedRelation: 't_articles';
            referencedColumns: ['id'];
          },
        ];
      };
      m_categories: {
        Row: {
          created_at: number | null;
          created_by: string;
          deleted_at: number | null;
          deleted_by: string | null;
          id: number;
          name: string;
          search_name: string;
          updated_at: number | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: number | null;
          created_by: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          name: string;
          search_name: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: number | null;
          created_by?: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          name?: string;
          search_name?: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      m_category_notices: {
        Row: {
          created_at: number | null;
          created_by: string;
          deleted_at: number | null;
          deleted_by: string | null;
          id: number;
          name: string;
          updated_at: number | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: number | null;
          created_by: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          name: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: number | null;
          created_by?: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          name?: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      t_articles: {
        Row: {
          article_id: string;
          content: string;
          created_at: number | null;
          created_by: string;
          deleted_at: number | null;
          deleted_by: string | null;
          display_order: number;
          id: number;
          is_fixed: boolean;
          status: number;
          title: string;
          updated_at: number | null;
          updated_by: string | null;
        };
        Insert: {
          article_id: string;
          content: string;
          created_at?: number | null;
          created_by: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          display_order?: number;
          id?: number;
          is_fixed?: boolean;
          status?: number;
          title: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Update: {
          article_id?: string;
          content?: string;
          created_at?: number | null;
          created_by?: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          display_order?: number;
          id?: number;
          is_fixed?: boolean;
          status?: number;
          title?: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      t_contacts: {
        Row: {
          contact_detail: string;
          created_at: number;
          email: string;
          id: number;
          is_personal_info: boolean;
          name: string;
        };
        Insert: {
          contact_detail: string;
          created_at: number;
          email: string;
          id?: number;
          is_personal_info: boolean;
          name: string;
        };
        Update: {
          contact_detail?: string;
          created_at?: number;
          email?: string;
          id?: number;
          is_personal_info?: boolean;
          name?: string;
        };
        Relationships: [];
      };
      t_notices: {
        Row: {
          content: string;
          created_at: number | null;
          created_by: string;
          deleted_at: number | null;
          deleted_by: string | null;
          id: number;
          is_fixed: boolean | null;
          m_category_notices_id: number;
          notice_id: string;
          title: string;
          updated_at: number | null;
          updated_by: string | null;
        };
        Insert: {
          content: string;
          created_at?: number | null;
          created_by: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          is_fixed?: boolean | null;
          m_category_notices_id: number;
          notice_id: string;
          title: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Update: {
          content?: string;
          created_at?: number | null;
          created_by?: string;
          deleted_at?: number | null;
          deleted_by?: string | null;
          id?: number;
          is_fixed?: boolean | null;
          m_category_notices_id?: number;
          notice_id?: string;
          title?: string;
          updated_at?: number | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 't_notices_m_category_notices_id_fkey';
            columns: ['m_category_notices_id'];
            isOneToOne: false;
            referencedRelation: 'm_category_notices';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
