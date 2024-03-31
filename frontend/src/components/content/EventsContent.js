import React, { useState } from 'react';

const EventsContent = () => {
    const [events, setEvents] = useState([
        {
            _id: 'event1',
            title: 'Global Hackathon 2024',
            description: 'Join the annual global hackathon focusing on innovative solutions in AI and ML.',
            date: new Date(2024, 3, 15),
            color: '#007bff',
            url: 'https://devpost.com/'
        },
        {
            _id: 'event2',
            title: 'Alumni Meetup 2024',
            description: 'Reconnect, network, and share your journey since graduation at our annual alumni meetup.',
            date: new Date(2024, 5, 20),
            color: '#28a745',
            url: 'https://www.eventbrite.com/'
        },
        {
            _id: 'event3',
            title: 'Virtual Career Fair 2024',
            description: 'Explore job opportunities and meet with top employers in our virtual career fair.',
            date: new Date(2024, 7, 5),
            color: '#dc3545',
            url: 'https://www.vfairs.com/'
        },
    ]);

    const eventStyle = (backgroundColor) => ({
        padding: '20px',
        margin: '15px 0',
        borderRadius: '10px',
        backgroundColor,
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textDecoration: 'none', // Removes underline from links
    });

    const dateStyle = {
        fontSize: '0.9rem',
        opacity: 0.8,
        alignSelf: 'flex-end',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Events</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {events.map(event => (
                    <a
                        key={event._id}
                        href={event.url}
                        style={eventStyle(event.color)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <li>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div style={dateStyle}>Date: {event.date.toLocaleDateString()}</div>
                        </li>
                    </a>
                ))}
            </ul>
            {events.length === 0 && <p>No events to display.</p>}
        </div>
    );
};

export default EventsContent;
