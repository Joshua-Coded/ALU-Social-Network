import React, { useState, useEffect } from 'react';
import { useAnnouncements } from '../components/context/AnnouncementContext';
import "./editModalAnnouncement.css";

const EditAnnouncementModal = ({ isOpen, onClose, announcementId }) => {
    const { announcements, updateAnnouncement } = useAnnouncements();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsDataLoaded(false); // Reset data loaded flag when modal closes
            return;
        }

        if (!isDataLoaded) {
            // Only run this code once per modal open or when the announcementId changes
            const announcementDetails = announcements.find(a => a._id === announcementId);
            if (announcementDetails) {
                setTitle(announcementDetails.title);
                setContent(announcementDetails.content);
                setIsDataLoaded(true); // Set flag to prevent re-loading during the same modal session
            }
        }
    }, [isOpen, announcementId, announcements, isDataLoaded]);

    const handleSaveChanges = () => {
        updateAnnouncement(announcementId, { title, content });
        onClose(); // Close the modal after saving changes
        setTitle(''); // Reset title
        setContent(''); // Reset content
        setIsDataLoaded(false); // Reset the data loaded flag for next use
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Edit Announcement</h2>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </label>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={() => { onClose(); setIsDataLoaded(false); }}>Cancel</button>
            </div>
        </div>
    );
};

export default EditAnnouncementModal;