import React, { useState } from 'react';

const ChannelsContent = () => {
    // Example dummy data for channels
    const [channels, setChannels] = useState([
        { _id: 'channel1', name: 'Tech Innovators', description: 'A channel dedicated to the latest in tech and innovation.', color: '#ff4757' },
        { _id: 'channel2', name: 'Health & Wellness', description: 'Sharing tips and advice on maintaining a healthy lifestyle.', color: '#2ed573' },
        { _id: 'channel3', name: 'Startup Life', description: 'Discussions around the challenges and victories in startup culture.', color: '#1e90ff' },
        { _id: 'channel4', name: 'Nature Enthusiasts', description: 'Exploring the beauty and importance of the natural world.', color: '#ff6348' }
    ]);

    const channelStyle = (backgroundColor) => ({
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        backgroundColor,
        color: 'white',
    });

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Channels</h2>
            {channels.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {channels.map(channel => (
                        <li key={channel._id} style={channelStyle(channel.color)}>
                            <h3>{channel.name}</h3>
                            <p>{channel.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No channels to display.</p>
            )}
        </div>
    );
};

export default ChannelsContent;
