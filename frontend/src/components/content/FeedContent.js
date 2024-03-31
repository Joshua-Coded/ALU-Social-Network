import React, { useState, useEffect } from 'react';

const FeedContent = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const isLoggedIn = () => !!localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feed');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handlePostChange = ({ target: { name, value } }) => {
        name === 'title' ? setTitle(value) : setBody(value);
    };
    // Example login response handling function
    function handleLoginSuccess(response) {
        const { token, user } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id); // Adjust according to your actual response structure

        // Redirect or update UI after successful login
        // navigate('/dashboard'); or similar based on your routing setup
    }


    const submitNewPost = async (event) => {
        event.preventDefault();

        // Retrieve the stored user ID and token
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (!token || !userId) {
            setMessage({ text: 'You must be logged in to create a post.', type: 'error' });
            return;
        }

        if (!title.trim() || !body.trim()) {
            setMessage({ text: 'Title and body are both required fields.', type: 'error' });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    body,
                    author: userId, // Use the userId here to associate the post with the user
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to create post');
            }

            const newPost = await response.json();
            // Update your state or UI as needed here
            setTitle('');
            setBody('');
            setMessage({ text: 'Post created successfully!', type: 'success' });
            // Optionally, refresh the list of posts here
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage({ text: error.message || 'Failed to create post', type: 'error' });
        }
    };

    return (
        <div>
            <h2>Post Feed</h2>
            {isLoggedIn() ? (
                <>
                    <button onClick={() => setShowPostForm(!showPostForm)}>
                        Create Post
                    </button>
                    {showPostForm && (
                        <form onSubmit={submitNewPost}>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handlePostChange}
                                    placeholder="Post Title"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="body">Body:</label>
                                <textarea
                                    id="body"
                                    name="body"
                                    value={body}
                                    onChange={handlePostChange}
                                    placeholder="Post Body"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit">Submit Post</button>
                            {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
                        </form>
                    )}
                </>
            ) : (
                <p>Please log in to create posts.</p>
            )}

            {/* Display each post */}
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {/*  Edit and Delete buttons for each post, depending on user authentication and post ownership */}
                </div>
            ))}
        </div>
    );
};
export default FeedContent;
