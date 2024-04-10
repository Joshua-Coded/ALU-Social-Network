import React, { useEffect, useState } from 'react';
import { useAnnouncements } from './context/AnnouncementContext';
import "./AnnouncementList.css";
import ChatIcon from './Chat';
import LikeIcon from './LikeIcon';
import ShareIcon from './ShareIcon';
import WhatsAppIcon from './WhatsappIcon';
import FacebookIcon from './FacebookIcon';
import EditAnnouncementModal from '../modals/EditAnnouncementModal';

const AnnouncementList = () => {
    const { announcements, fetchAnnouncements } = useAnnouncements();
    const [loading, setLoading] = useState(true);
    const [commentInput, setCommentInput] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);


    const handleEditClick = (announcement) => {
        setSelectedAnnouncement(announcement); // Set the selected announcement
        setIsModalOpen(true); // Open the modal
    };


    const createWhatsAppShareLink = (announcementId) => {
        const announcementUrl = `http://localhost:5000/api/announcements/${announcementId}`;
        return `https://api.whatsapp.com/send?text=Check out this announcement! ${encodeURIComponent(announcementUrl)}`;
    };

    const createFacebookShareLink = (announcementId) => {
        const announcementUrl = `http://localhost:5000/api/announcements/${announcementId}`;
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(announcementUrl)}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            await fetchAnnouncements();
            setLoading(false);
        };

        fetchData();
    }, [fetchAnnouncements]);

    const handleLike = (announcementId) => {
        // Increment likes for the specific announcementId
        const newLikes = parseInt(localStorage.getItem(`likes-${announcementId}`) || '0', 10) + 1;
        localStorage.setItem(`likes-${announcementId}`, newLikes.toString());
        // Trigger re-render
        fetchAnnouncements(); // Assuming this would refresh the data; you might need a more targeted update method
    };


    const editPost = (announcementId) => {
        console.log(`Editing post ${announcementId}`);
        // Implementation for opening the edit modal or form goes here
    };

    // Define updateAnnouncement function here
    const updateAnnouncement = (announcementId, updatedData) => {
        console.log('Updating announcement', announcementId, updatedData);
        // Here, you would typically make an API call to update the announcement
        // For now, let's just log the updated data and close the modal
        setIsModalOpen(false);
        // Optionally, refresh your announcements list to reflect the update
        fetchAnnouncements();
    };
    // Function to handle comment submission
    const handleCommentSubmit = (announcementId) => {
        const comment = commentInput[announcementId] || '';
        if (!comment.trim()) return; // Avoid adding empty comments

        const commentsKey = `comments-${announcementId}`;
        const existingComments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
        const updatedComments = [...existingComments, comment];
        localStorage.setItem(commentsKey, JSON.stringify(updatedComments));

        // Clear input field after submission
        setCommentInput(prev => ({ ...prev, [announcementId]: '' }));
        // Optionally, refresh comments display if necessary
    };

    // Function to handle comment input change
    const handleCommentChange = (announcementId, value) => {
        setCommentInput(prev => ({ ...prev, [announcementId]: value }));
    };

    return (
        <div className="announcement-list">
            {loading ? (
                <p>Loading...</p>
            ) : (
                announcements.map((announcement) => (
                    <div key={announcement._id} className="announcement-card">
                        <h2 className="announcement-title">{announcement.title}</h2>
                        <button onClick={() => handleEditClick(announcement)} className="edit-button">Edit</button>


                        <p className="announcement-content">{announcement.content}</p>
                        <div className="announcement-actions">
                            <button
                                className="like-comment-share"
                                onClick={() => handleLike(announcement._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <LikeIcon />
                                <span>Like | {localStorage.getItem(`likes-${announcement._id}`) || 0}</span>
                            </button>
                            {/* Insert other buttons here */}
                        </div>
                        <div>
                            {/* Display comments for the announcement */}
                            {JSON.parse(localStorage.getItem(`comments-${announcement._id}`) || '[]').map((comment, index) => (
                                <div key={index}>{comment}</div>
                            ))}
                        </div>
                        <div className="comment-section">
                            <input
                                type="text"
                                value={commentInput[announcement._id] || ''}
                                onChange={(e) => handleCommentChange(announcement._id, e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <button onClick={() => handleCommentSubmit(announcement._id)}>Submit</button>
                        </div>

                        <a href={createWhatsAppShareLink(announcement._id)} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="social" />
                        </a>
                        <a href={createFacebookShareLink(announcement._id)} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </a>
                    </div>
                ))
            )}

            {isModalOpen && selectedAnnouncement && (
                <EditAnnouncementModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    announcementId={selectedAnnouncement._id}
                    // Assuming `updateAnnouncement` is a prop passed to `AnnouncementList` or defined within it
                    updateAnnouncement={updateAnnouncement}
                />
            )}
        </div>
    );
};

export default AnnouncementList;
