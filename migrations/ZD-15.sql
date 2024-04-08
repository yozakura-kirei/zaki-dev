INSERT INTO public.m_category_notices
(id, "name", created_at, updated_at, deleted_at, created_by, updated_by, deleted_by)
values
(1, 'お知らせ', (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000), NULL, NULL, 'zaki-dev', NULL, NULL),
(2, '不具合対応', (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000), NULL, NULL, 'zaki-dev', NULL, NULL);