ALTER TABLE t_p53324412_smart_student_portal.users 
ADD COLUMN IF NOT EXISTS vk_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_vk_id ON t_p53324412_smart_student_portal.users(vk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON t_p53324412_smart_student_portal.users(email);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p53324412_smart_student_portal.users(id),
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(token_hash)
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON t_p53324412_smart_student_portal.refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON t_p53324412_smart_student_portal.refresh_tokens(token_hash);
