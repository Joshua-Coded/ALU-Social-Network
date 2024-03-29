import React from 'react';

const Box = ({ background, title, content }) => (
    <div style={{ backgroundImage: `url(${background})` }}>
        <h1>{title}</h1>
        <p>{content}</p>
    </div>
);

export default Box;
