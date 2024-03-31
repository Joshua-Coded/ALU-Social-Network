import React from 'react';

const DiscoveryContent = () => {
    const discoveries = [
        {
            _id: 'discovery1',
            title: 'Machine Learning Hub',
            description: 'A space for ML enthusiasts to share projects and ideas.',
            type: 'Space',
            color: '#17a2b8',
            url: 'https://www.kaggle.com/',
        },
        {
            _id: 'discovery2',
            title: 'Jane Doe',
            description: 'A leading AI researcher known for groundbreaking work.',
            type: 'Member',
            color: '#ffc107',
            url: 'https://scholar.google.com/citations?user=NP4n9ewAAAAJ&hl=en',
        },
        {
            _id: 'discovery3',
            title: 'Emerging Tech Trends',
            description: 'An article on the latest trends in technology and innovation.',
            type: 'Post',
            color: '#6c757d',
            url: 'https://www.wired.com/category/tech/',
        },
        // Dynamically generate additional discovery items
        ...Array.from({ length: 7 }).map((_, index) => ({
            _id: `discovery${index + 4}`,
            title: `Innovative Discovery #${index + 4}`,
            description: `Insights into innovative tech trend #${index + 4}.`,
            type: 'Article',
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color
            url: `https://example.com/discovery${index + 4}`,
        }))
    ];

    const discoveryStyle = (backgroundColor) => ({
        padding: '20px',
        margin: '15px 0',
        borderRadius: '8px',
        backgroundColor,
        color: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textDecoration: 'none', // Ensure text within the link is not underlined
    });

    const typeStyle = {
        fontSize: '0.85rem',
        fontWeight: 'bold',
        opacity: 0.9,
        alignSelf: 'flex-start',
        borderRadius: '20px',
        padding: '5px 10px',
        backgroundColor: '#fff',
        color: 'black',
        margin: '0 0 10px 0',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Discovery</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {discoveries.map((discovery) => (
                    <li key={discovery._id}>
                        <a
                            href={discovery.url}
                            style={discoveryStyle(discovery.color)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span style={typeStyle}>{discovery.type}</span>
                            <h3>{discovery.title}</h3>
                            <p>{discovery.description}</p>
                        </a>
                    </li>
                ))}
            </ul>
            {discoveries.length === 0 && <p>No discoveries to display.</p>}
        </div>
    );
};

export default DiscoveryContent;
