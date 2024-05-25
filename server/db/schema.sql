-- Drop tables if they exist
DROP TABLE IF EXISTS comment_likes;
DROP TABLE IF EXISTS post_likes;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    title VARCHAR(100),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    postId INT REFERENCES posts(id),
    parentCommentId INT REFERENCES comments(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_tags (
    postId INT REFERENCES posts(id),
    tag VARCHAR(50),
    PRIMARY KEY (postId, tag)
);

CREATE TABLE post_likes (
    postId INT REFERENCES posts(id),
    userId INT REFERENCES users(id),
    PRIMARY KEY (postId, userId)
);

CREATE TABLE comment_likes (
    commentId INT REFERENCES comments(id),
    userId INT REFERENCES users(id),
    PRIMARY KEY (commentId, userId)
);
