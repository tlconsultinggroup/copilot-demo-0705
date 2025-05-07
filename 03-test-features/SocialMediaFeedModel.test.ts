import { Pool } from 'pg';
import { SocialMediaFeedModel, SocialMediaFeed } from './SocialMediaFeedModel';

jest.mock('pg', () => {
    const mClient = {
        query: jest.fn(),
        release: jest.fn(),
    };
    const mPool = {
        connect: jest.fn(() => mClient),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

describe('SocialMediaFeedModel', () => {
    const pool = new Pool();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new social media feed', async () => {
        const mockFeed: Omit<SocialMediaFeed, 'postId' | 'createdAt' | 'updatedAt'> = {
            userId: 1,
            content: 'Test content',
            mediaUrl: 'http://example.com/media.jpg',
            likesCount: 10,
            commentsCount: 5,
            isDeleted: false,
        };

        const mockResult = {
            rows: [{
                postId: 1,
                ...mockFeed,
                createdAt: new Date(),
                updatedAt: new Date(),
            }],
        };

        (pool.query as jest.Mock).mockResolvedValue(mockResult);

        const result = await SocialMediaFeedModel.create(mockFeed);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO social_media_feed'),
            expect.arrayContaining([mockFeed.userId, mockFeed.content, mockFeed.mediaUrl, mockFeed.likesCount, mockFeed.commentsCount, mockFeed.isDeleted])
        );
        expect(result).toEqual(mockResult.rows[0]);
    });

    it('should find a social media feed by ID', async () => {
        const mockFeed: SocialMediaFeed = {
            postId: 1,
            userId: 1,
            content: 'Test content',
            mediaUrl: 'http://example.com/media.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
            likesCount: 10,
            commentsCount: 5,
            isDeleted: false,
        };

        const mockResult = { rows: [mockFeed] };
        (pool.query as jest.Mock).mockResolvedValue(mockResult);

        const result = await SocialMediaFeedModel.findById(1);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('SELECT * FROM social_media_feed WHERE post_id = $1'),
            [1]
        );
        expect(result).toEqual(mockFeed);
    });

    it('should update a social media feed', async () => {
        const updates = { content: 'Updated content', likesCount: 20 };
        const mockFeed: SocialMediaFeed = {
            postId: 1,
            userId: 1,
            content: updates.content,
            mediaUrl: 'http://example.com/media.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
            likesCount: updates.likesCount,
            commentsCount: 5,
            isDeleted: false,
        };

        const mockResult = { rows: [mockFeed] };
        (pool.query as jest.Mock).mockResolvedValue(mockResult);

        const result = await SocialMediaFeedModel.update(1, updates);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE social_media_feed'),
            expect.arrayContaining([1, updates.content, updates.likesCount])
        );
        expect(result).toEqual(mockFeed);
    });

    it('should delete a social media feed', async () => {
        (pool.query as jest.Mock).mockResolvedValue({});

        await SocialMediaFeedModel.delete(1);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE social_media_feed SET is_deleted = TRUE WHERE post_id = $1'),
            [1]
        );
    });
});