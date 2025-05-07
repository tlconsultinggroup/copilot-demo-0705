CREATE TABLE social_media_feed (
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT,
    media_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
