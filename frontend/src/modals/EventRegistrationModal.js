// EventRegistrationModal.js (simplified example)
import React, { useState } from 'react';

const EventRegistrationModal = ({ eventId, onClose }) => {
    const [registration, setRegistration] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        comment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistration({ ...registration, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a POST request to register for the event
        const response = await fetch(`http://localhost:5000/api/events/${eventId}/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registration),
        });

        if (response.ok) {
            alert('Registration successful!');
            onClose(); // Close modal
        } else {
            alert('Failed to register for the event.');
        }
    };

    return (
        <div className="modal">
            {/* Modal content with form fields for registration */}
            <form onSubmit={handleSubmit}>
                {/* Form fields for firstname, lastname, etc. */}
                <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default EventRegistrationModal;
