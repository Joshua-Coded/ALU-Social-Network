import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {/* Add more details you'd like to display for each post */}
        </div>
    );
};

export default Post;
