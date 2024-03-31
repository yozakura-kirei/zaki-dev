-- 検索インデックス名の変更
ALTER INDEX public.ix_m_articles_content RENAME TO ix_t_articles_content;
ALTER INDEX public.ix_m_articles_title RENAME TO ix_t_articles_title;