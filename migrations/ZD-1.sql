-- supabase移行時
CREATE TABLE t_articles (
  id SERIAL PRIMARY KEY,
  article_id VARCHAR(36) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  status SMALLINT NOT NULL DEFAULT 0 CHECK (status IN (0, 1)), -- 0が非公開、1が公開
  display_order INT NOT NULL DEFAULT 0, -- 記事の表示順
  is_fixed BOOLEAN NOT NULL DEFAULT FALSE, -- 記事を固定するか？
  created_at BIGINT DEFAULT 0,
  updated_at BIGINT DEFAULT NULL,
  deleted_at BIGINT DEFAULT NULL,
  created_by VARCHAR(10) NOT NULL,
  updated_by VARCHAR(10),
  deleted_by VARCHAR(10),
  CONSTRAINT uq_article_id UNIQUE (article_id)
);

CREATE TABLE i_articles_categories (
  id SERIAL PRIMARY KEY,
  t_articles_id INT,
  m_categories_id INT NOT NULL,
  created_at BIGINT DEFAULT 0,
  updated_at BIGINT,
  deleted_at BIGINT,
  created_by VARCHAR(10) NOT NULL,
  updated_by VARCHAR(10),
  deleted_by VARCHAR(10),
  FOREIGN KEY (t_articles_id) REFERENCES t_articles(id) ON UPDATE CASCADE,
  FOREIGN KEY (m_categories_id) REFERENCES m_categories(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_t_articles_id ON i_articles_categories (t_articles_id);
CREATE INDEX idx_m_categories_id ON i_articles_categories (m_categories_id);

CREATE TABLE m_category_notices (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  created_at bigint DEFAULT '0',
  updated_at bigint DEFAULT NULL,
  deleted_at bigint DEFAULT NULL,
  created_by varchar(10) NOT NULL,
  updated_by varchar(10) DEFAULT NULL,
  deleted_by varchar(10) DEFAULT NULL,
  UNIQUE (name)
);

CREATE TABLE t_notices (
  id SERIAL PRIMARY KEY,
  notice_id varchar(36) NOT NULL,
  m_category_notices_id int NOT NULL,
  title varchar(100) NOT NULL,
  is_fixed boolean DEFAULT false,
  content text NOT NULL,
  created_at bigint DEFAULT 0,
  updated_at bigint DEFAULT NULL,
  deleted_at bigint DEFAULT NULL,
  created_by varchar(10) NOT NULL,
  updated_by varchar(10) DEFAULT NULL,
  deleted_by varchar(10) DEFAULT NULL,
  FOREIGN KEY (m_category_notices_id) REFERENCES m_category_notices(id)
);

-- pgroonga
create index ix_m_articles_title ON t_articles USING pgroonga(title);
create index ix_m_articles_content ON t_articles USING pgroonga(content);
create index ix_t_notices_title ON t_notices USING pgroonga(title);
create index ix_t_notices_content ON t_notices USING pgroonga(content);
