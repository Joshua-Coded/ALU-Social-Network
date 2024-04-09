import React from 'react';
import './AnnouncementModal.css';

const AnnouncementModal = ({ children, onClose }) => {
    return (
        <>
            {/* Modal Backdrop */}
            <div className="modal-backdrop" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </>
    );
};

export default AnnouncementModal;
