import React, { useState, useEffect } from 'react';

const FeedContent = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [editingPostId, setEditingPostId] = useState(null);
    const [editPostData, setEditPostData] = useState({ title: '', body: '' });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [error, setError] = useState('');


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

    const handleNewPostChange = (event) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    };


    // Handle the click to edit a post
    const handleEditClick = (post) => {
        setEditingPostId(post._id);
        setEditPostData({ title: post.title, body: post.body });
    };

    // Handle changes in the edit form
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPostData(prev => ({ ...prev, [name]: value }));
    };

    // Submit the edit
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // Assuming your API expects an object with the title and body for the post update,
        // and returns the updated post in the response
        try {
            const response = await fetch(`http://localhost:5000/api/feed/${editingPostId}`, {
                method: 'PUT', // or 'PATCH' depending on how your API is set up
                headers: {
                    'Content-Type': 'application/json',
                    // Include authentication token if your API requires it
                },
                body: JSON.stringify({
                    title: editPostData.title,
                    body: editPostData.body,
                    // Include other post fields if necessary
                }),
            });

            const updatedPost = await response.json();

            if (!response.ok) {
                throw new Error(updatedPost.message || 'Failed to update the post.');
            }

            console.log('Edit submitted successfully:', updatedPost);

            // Update the post in the local state without mutating the original state
            setPosts(prevPosts => prevPosts.map(post => post._id === editingPostId ? { ...post, ...updatedPost } : post));

            // Clear edit state and hide the form
            setEditingPostId(null);
            setEditPostData({ title: '', body: '' }); // Reset edit form data
        } catch (error) {
            console.error('Error updating post:', error);
            // Optionally set an error message state here to display the error to the user
        }
    };


    // Handle the cancellation of the edit
    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditPostData({ title: '', body: '' }); // Reset edit form data
    };



    const submitNewPost = async (event) => {
        event.preventDefault();
        try {
            // Your existing POST request logic
            const response = await fetch('http://localhost:5000/api/feed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create post');
            }
            // Reset form and error state upon successful post creation
            setNewPost({ title: '', body: '' });
            setError('');
        } catch (error) {
            console.error("Error creating post:", error);
            setError(error.message || 'Failed to create post');
        }
    };



    const deletePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/feed/${postId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ text: 'Post deleted successfully!', type: 'success' });
                setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
                // Optionally, clear the message after a few seconds
                setTimeout(() => setMessage({ text: '', type: '' }), 5000);
            } else {
                throw new Error(data.message || 'Failed to delete the post.');
            }
        } catch (error) {
            setMessage({ text: error.message, type: 'danger' });
            setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
    };

    const updatePost = async (e, postId) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/feed/${postId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editPostData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setMessage({ text: 'Post updated successfully!', type: 'success' });
            const updatedPosts = posts.map(post => post._id === postId ? { ...post, ...editPostData } : post);
            setPosts(updatedPosts);
            setEditingPostId(null); // Reset editing state
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        }
    };



    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <h2>Post Feed</h2>
            <button onClick={() => setShowPostForm(!showPostForm)}>Create Post</button>
            {showPostForm && (
                <form onSubmit={submitNewPost}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newPost.title}
                            onChange={handleNewPostChange}
                            placeholder="Post Title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            name="body"
                            value={newPost.body}
                            onChange={handleNewPostChange}
                            placeholder="Post Body"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Submit Post</button>
                </form>
            )}

            {/* Posts list */}
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id}>
                        {editingPostId === post._id ? (
                            // Edit form for the currently editing post
                            <form onSubmit={(e) => handleEditSubmit(e, post._id)}>
                                <div>
                                    <label htmlFor="editTitle">Title:</label>
                                    <input
                                        type="text"
                                        id="editTitle"
                                        name="title"
                                        value={editPostData.title}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="editBody">Body:</label>
                                    <textarea
                                        id="editBody"
                                        name="body"
                                        value={editPostData.body}
                                        onChange={handleEditChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={handleCancelEdit}>Cancel</button>
                            </form>
                        ) : (
                            // Display mode for each post
                            <>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                                <button onClick={() => handleEditClick(post)}>Edit</button>
                                <button onClick={() => deletePost(post._id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>No posts to display</p>
            )}
        </div>
    );

};

export default FeedContent;
