import React, { useState } from 'react';

export const PostForm = ({ onPostCreated }) => {
    const [post, setPost] = useState({ title: '', body: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.title.trim() || !post.body.trim()) {
            alert('Please enter a title and body for your post.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const newPost = await response.json();
            alert('Post created successfully');
            setPost({ title: '', body: '' }); // Clear the form

            if (onPostCreated) {
                onPostCreated(newPost); // Update the list of posts in the parent component
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Post title"
                required
            />
            <textarea
                name="body"
                value={post.body}
                onChange={handleChange}
                placeholder="Post content"
                required
            />
            <button type="submit">Create Post</button>
        </form>
    );
};
