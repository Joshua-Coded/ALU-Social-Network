import React from 'react';

const YouTubeCard = ({ title, videoId }) => {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div style={{
            width: '100%', // Responsive width
            maxWidth: '980px', // Smaller maximum width
            margin: '20px auto', // Center the card
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
        }}>
            <h2 style={{ padding: '15px 20px', margin: '0', backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
                {title}
            </h2>
            <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%', // Maintains a 16:9 aspect ratio
            }}>
                <iframe
                    src={youtubeEmbedUrl}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default YouTubeCard;
