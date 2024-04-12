import React, { useState } from 'react';
import "./RegistrationModal.css";

const RegistrationModal = ({ isOpen, onClose, event }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        comment: ''
    });
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        img: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEventChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/events/${event.id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Thank you for registering. Check email for event details for check-in.');
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    phoneNumber: '',
                    comment: ''
                }); // Clear form data
                setTimeout(() => {
                    onClose(); // Close modal after a delay
                }, 3000);
            } else {
                throw new Error(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handlePostEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Event created successfully!');
                setEventData({
                    name: '',
                    description: '',
                    img: ''
                }); // Clear event data
            } else {
                throw new Error(data.message || "An error occurred during event creation.");
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>

                <h3>Create Event</h3>
                <form onSubmit={handlePostEvent}>
                    <input name="name" value={eventData.name} placeholder="Event Name" onChange={handleEventChange} required />
                    <input name="description" value={eventData.description} placeholder="Description" onChange={handleEventChange} required />
                    <input name="img" value={eventData.img} placeholder="Image URL" onChange={handleEventChange} />
                    <button type="submit">Post Event</button>
                </form>
                {/* <h2>Register for Event</h2> */}
                {message && <p>{message}</p>}
                <h2>Register for {event.name}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="firstname" value={formData.firstname} placeholder="First Name" onChange={handleChange} required />
                    <input name="lastname" value={formData.lastname} placeholder="Last Name" onChange={handleChange} required />
                    <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
                    <input name="phoneNumber" value={formData.phoneNumber} placeholder="Phone Number" onChange={handleChange} />
                    <textarea name="comment" value={formData.comment} placeholder="Comment (Optional)" onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
