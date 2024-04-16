import React, { useState, useEffect } from 'react';
import RegistrationModal from './RegistrationModal';
import "./events.scss";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                if (response.ok) {
                    const data = await response.json();
                    const formattedData = data.map(event => ({
                        ...event,
                        id: event._id  // Ensure the id field is correctly set
                    }));
                    setEvents(formattedData);
                } else {
                    throw new Error('Failed to fetch events: ' + response.status);
                }
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    const handleRegisterClick = (event) => {
        console.log("Selected event for registration:", event);
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-container">
                {events.length > 0 ? events.map(event => (
                    <div key={event.id} className="event-card">
                        <img src={event.img} alt={event.name} className="event-image" />
                        <div className="event-info">
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <button className='register-button' onClick={() => handleRegisterClick(event)}>Register for Event</button>
                        </div>
                    </div>
                )) : <p>Loading events...</p>}
            </div>
            {selectedEvent && modalOpen && (
                <RegistrationModal
                    isOpen={modalOpen}
                    onClose={handleModalClose}
                    event={selectedEvent}
                />
            )}
        </>
    );
};

export default Events;
