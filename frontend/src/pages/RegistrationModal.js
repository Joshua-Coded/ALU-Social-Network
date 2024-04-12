import React, { useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose, onRegister, event }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        comment: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
        onClose(); // Close modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Register for {event.name}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="firstname" placeholder="First Name" onChange={handleChange} required />
                    <input name="lastname" placeholder="Last Name" onChange={handleChange} required />
                    <input name="email" placeholder="Email" onChange={handleChange} required />
                    <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                    <textarea name="comment" placeholder="Comment (Optional)" onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
