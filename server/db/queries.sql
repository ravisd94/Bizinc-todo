
-- Sample data
-- Sample users
INSERT INTO users (firstName, lastName, email, password, role, created_at, last_login)
VALUES
    ('John', 'Doe', 'john@example.com', 'password123', 'admin', '2024-05-23 10:00:00', '2024-05-23 10:00:00'),
    ('Jane', 'Smith', 'jane@example.com', 'password456', 'user', '2024-05-23 10:00:00', '2024-05-23 10:00:00'),
    ('Alice', 'Wonderland', 'alice@example.com', 'password789', 'user', '2024-05-23 10:00:00', '2024-05-23 10:00:00'),
    ('Bob', 'Smith', 'bob@example.com', 'passwordabc', 'user', '2024-05-23 10:00:00', '2024-05-23 10:00:00');

-- Sample posts
INSERT INTO posts (userId, title, content, created_at, updated_at, is_published, published_at)
VALUES
    (1, 'First Post', 'This is the content of the first post.', '2024-05-23 10:00:00', '2024-05-23 10:00:00', TRUE, '2024-05-23 10:00:00'),
    (2, 'Second Post', 'This is the content of the second post.', '2024-05-23 10:00:00', '2024-05-23 10:00:00', TRUE, '2024-05-23 10:00:00'),
    (1, 'Third Post', 'This is the content of the third post.', '2024-05-24 10:00:00', '2024-05-24 10:00:00', TRUE, '2024-05-24 10:00:00'),
    (2, 'Fourth Post', 'This is the content of the fourth post.', '2024-05-25 10:00:00', '2024-05-25 10:00:00', FALSE, NULL),
    (1, 'Fifth Post', 'This is the content of the fifth post.', '2024-05-26 10:00:00', '2024-05-26 10:00:00', TRUE, '2024-05-26 10:00:00');

-- Sample comments
INSERT INTO comments (userId, postId, parentCommentId, content, created_at, updated_at)
VALUES
    (3, 1, NULL, 'This is a top-level comment on the first post.', '2024-05-24 11:00:00', '2024-05-24 11:00:00'),
    (1, 1, NULL, 'Another top-level comment on the first post.', '2024-05-24 12:00:00', '2024-05-24 12:00:00'),
    (3, 2, NULL, 'This is a top-level comment on the second post.', '2024-05-25 11:00:00', '2024-05-25 11:00:00'),
    (2, 2, NULL, 'Another top-level comment on the second post.', '2024-05-25 12:00:00', '2024-05-25 12:00:00');

-- Sample post tags
INSERT INTO post_tags (postId, tag)
VALUES
    (1, 'technology'),
    (1, 'programming'),
    (2, 'travel'),
    (3, 'food');

-- Sample post likes
INSERT INTO post_likes (postId, userId)
VALUES
    (1, 2),
    (2, 1),
    (3, 2),
    (4, 1),
    (5, 2);

-- Sample comment likes
INSERT INTO comment_likes (commentId, userId)
VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (4, 2);



--Queries for different operations

--Retrieve posts by a user 1
SELECT p.id, p.title, p.content
FROM posts p
WHERE p.userId = 1;

--Count comments on each post:
SELECT p.id, p.title, COUNT(c.id) AS comment_count
FROM posts p
LEFT JOIN comments c ON p.id = c.postId
GROUP BY p.id, p.title;

--Retrieve all posts along with the usernames of their authors:
SELECT p.id, p.title, p.content, u.firstName || ' ' || u.lastName AS full_name
FROM posts p
JOIN users u ON p.userId = u.id;

--Retrieve all comments along with the usernames of their authors and the titles of the posts they belong to:
SELECT c.id, c.content, u.firstName || ' ' || u.lastName AS full_name, p.title AS post_title
FROM comments c
JOIN users u ON c.userId = u.id
JOIN posts p ON c.postId = p.id;

--Retrieve all posts that have been published
SELECT *
FROM posts
WHERE is_published = TRUE;

Retrieve all posts liked by a specific user(e.g. 1)
SELECT p.id, p.title, p.content
FROM posts p
JOIN post_likes pl ON p.id = pl.postId
WHERE pl.userId = 1;

--Retrieve all comments liked by a specific user(e.g. 1)
SELECT c.id, c.content
FROM comments c
JOIN comment_likes cl ON c.id = cl.commentId
WHERE cl.userId = 1;

--Retrieve all posts with a specific tag
SELECT p.id, p.title, p.content
FROM posts p
JOIN post_tags pt ON p.id = pt.postId
WHERE pt.tag = 'programming';

--Retrieve all comments on a specific post, including nested comments (e.g. 1)
WITH RECURSIVE NestedComments AS (
    SELECT id, userId, postId, parentCommentId, content
    FROM comments
    WHERE postId = 1--replace post id as per requirment 
	AND parentCommentId IS NULL
    UNION ALL
    SELECT c.id, c.userId, c.postId, c.parentCommentId, c.content
    FROM comments c
    JOIN NestedComments nc ON c.parentCommentId = nc.id
)
SELECT *
FROM NestedComments;
