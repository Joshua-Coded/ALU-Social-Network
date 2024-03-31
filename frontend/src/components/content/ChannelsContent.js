import React from 'react';

const ChannelsContent = () => {
    const channels = [
        {
            _id: 'channel1',
            name: 'Web Development',
            description: 'A channel dedicated to web development tips, resources, and discussions.',
            dateCreated: new Date(2022, 0, 15),
            members: 1500,
            realLink: 'https://stackoverflow.com/questions/tagged/web-development',
        },
        {
            _id: 'channel2',
            name: 'AI Innovators',
            description: 'Join the future creators. Share AI projects, ask questions, and explore AI trends.',
            dateCreated: new Date(2022, 5, 20),
            members: 980,
            realLink: 'https://www.reddit.com/r/artificial/',
        },
        {
            _id: 'channel3',
            name: 'Startup Founders',
            description: 'A community for startup founders to share experiences, challenges, and insights.',
            dateCreated: new Date(2021, 7, 5),
            members: 2300,
            realLink: 'https://news.ycombinator.com/',
        },
        // Dynamically generated channels for demonstration
        ...Array.from({ length: 7 }).map((_, index) => ({
            _id: `channel${index + 4}`,
            name: `Design Trends ${2023 + index}`,
            description: `Exploring cutting-edge design trends and discussions in ${2023 + index}.`,
            dateCreated: new Date(2023, index, (index + 1) * 3),
            members: 300 + (index * 100),
            realLink: `https://www.behance.net/gallery/${98543217 + index}/Design-Trends-${2023 + index}`,
        }))
    ];

    const channelStyle = {
        padding: '20px',
        margin: '15px 0',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    const handleJoinChannel = (channelId) => {
        console.log(`Joining channel with ID: ${channelId}`);
        // Implement joining channel functionality here
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Channels</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {channels.map(channel => (
                    <li key={channel._id} style={channelStyle}>
                        <h3>{channel.name}</h3>
                        <p>{channel.description}</p>
                        <p>Date Created: {channel.dateCreated.toLocaleDateString()}</p>
                        <p>Members: {channel.members.toLocaleString()}</p>
                        <button onClick={() => handleJoinChannel(channel._id)}>Join Channel</button>
                        <a href={channel.realLink} target="_blank" rel="noopener noreferrer">Visit Channel</a>
                    </li>
                ))}
            </ul>
            {channels.length === 0 && <p>No channels to display.</p>}
        </div>
    );
};

export default ChannelsContent;
