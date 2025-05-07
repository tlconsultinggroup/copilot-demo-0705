import { Pool } from 'pg';

interface SocialMediaFeed {
    postId: number;
    userId: number;
    content: string | null;
    mediaUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    likesCount: number;
    commentsCount: number;
    isDeleted: boolean;
}

const pool = new Pool();

class SocialMediaFeedModel {
    static async create(feed: Omit<SocialMediaFeed, 'postId' | 'createdAt' | 'updatedAt'>): Promise<SocialMediaFeed> {
        const query = `
            INSERT INTO social_media_feed (user_id, content, media_url, likes_count, comments_count, is_deleted)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [
            feed.userId,
            feed.content,
            feed.mediaUrl,
            feed.likesCount ?? 0,
            feed.commentsCount ?? 0,
            feed.isDeleted ?? false
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findById(postId: number): Promise<SocialMediaFeed | null> {
        const query = 'SELECT * FROM social_media_feed WHERE post_id = $1 AND is_deleted = FALSE';
        const result = await pool.query(query, [postId]);
        return result.rows[0] || null;
    }

    static async update(postId: number, updates: Partial<Omit<SocialMediaFeed, 'postId' | 'createdAt'>>): Promise<SocialMediaFeed | null> {
        const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = Object.values(updates);

        const query = `
            UPDATE social_media_feed
            SET ${fields}, updated_at = CURRENT_TIMESTAMP
            WHERE post_id = $1
            RETURNING *;
        `;

        const result = await pool.query(query, [postId, ...values]);
        return result.rows[0] || null;
    }

    static async delete(postId: number): Promise<void> {
        const query = 'UPDATE social_media_feed SET is_deleted = TRUE WHERE post_id = $1';
        await pool.query(query, [postId]);
    }
}

export { SocialMediaFeed, SocialMediaFeedModel };