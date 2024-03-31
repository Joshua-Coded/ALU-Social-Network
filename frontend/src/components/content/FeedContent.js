import React, { useState } from 'react';

const FeedContent = () => {
    const [posts, setPosts] = useState([
        // Adding more real-life post examples with real links
        {
            _id: 'post1',
            title: 'The Future of Web Development',
            description: 'Exploring the upcoming trends in web development, including new frameworks and languages.',
            dateCreated: new Date(2024, 3, 15),
            likes: 120,
            comments: 30,
            dislikes: 5,
            readMoreLink: 'https://medium.com/future-of-web-development'
        },
        {
            _id: 'post2',
            title: 'AI and Machine Learning Demystified',
            description: 'A beginner\'s guide to understanding AI and machine learning, and their impact on industries.',
            dateCreated: new Date(2024, 5, 20),
            likes: 250,
            comments: 45,
            dislikes: 2,
            readMoreLink: 'https://towardsdatascience.com/ai-ml-demystified'
        },
        // Adding more dummy posts to make it 10
        ...Array.from({ length: 8 }).map((_, index) => ({
            _id: `post${index + 3}`,
            title: `Interesting Tech Trend #${index + 1}`,
            description: `An in-depth look at a fascinating technology trend that's shaping our future #${index + 1}.`,
            dateCreated: new Date(2024, index % 12, (index + 1) * 2),
            likes: 50 + index * 10,
            comments: 10 + index * 5,
            dislikes: 1 + index,
            readMoreLink: `https://tech-trends.com/posts/trend-${index + 1}`
        }))
    ]);

    const postStyle = {
        padding: '20px',
        margin: '15px 0',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Feed</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {posts.map(post => (
                    <li key={post._id} style={postStyle}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <span>Date: {post.dateCreated.toLocaleDateString()}</span>
                            <span>Likes: {post.likes}</span>
                            <span>Comments: {post.comments}</span>
                            <span>Dislikes: {post.dislikes}</span>
                        </div>
                        <a href={post.readMoreLink} target="_blank" rel="noopener noreferrer">Read More</a>
                    </li>
                ))}
            </ul>
            {posts.length === 0 && <p>No posts to display.</p>}
        </div>
    );
};

export default FeedContent;
