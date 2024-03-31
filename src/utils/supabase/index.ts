import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabasetype';
import { gql } from '@apollo/client';

/**
 * supabaseのDBへアクセスする
 */
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
);

/** m_categories取得 */
export const selectData = async () => {
  const data = await supabase
    .from('i_articles_categories')
    .select(`, m_categories mc(id, name, search_name, count)`)
    .match({ 'mc.name': 'Typescript' })
    .limit(50);

  if (data.error) {
    console.error('supabase error...', data.error.message);
    return null;
  }

  return data.data;
};
