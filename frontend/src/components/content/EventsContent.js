import React, { useState } from 'react';

const EventsContent = () => {
    const [events, setEvents] = useState([
        { _id: 'event1', title: 'Hackathon 2024', description: 'Annual hackathon with themes on AI and ML.', date: new Date(2024, 3, 15), color: '#007bff' },
        { _id: 'event2', title: 'Alumni Meetup 2024', description: 'A gathering for all alumni to network and share experiences.', date: new Date(2024, 5, 20), color: '#28a745' },
        { _id: 'event3', title: 'Career Fair 2024', description: 'Meet top employers and discover job opportunities.', date: new Date(2024, 7, 5), color: '#dc3545' },
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
                    <li key={event._id} style={eventStyle(event.color)}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div style={dateStyle}>Date: {event.date.toLocaleDateString()}</div>
                    </li>
                ))}
            </ul>
            {events.length === 0 && <p>No events to display.</p>}
        </div>
    );
};

export default EventsContent;
