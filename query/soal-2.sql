-- Indeks yang diperlukan: 
CREATE INDEX idx_users_user_id ON users(user_id);
CREATE INDEX idx_users_registration_date ON users(registration_date);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_user_id_posts ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_comments_post_id_created_at ON comments(post_id, created_at);