import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useAnnouncements } from './context/AnnouncementContext';
import AnnouncementModal from '../modals/AnnouncementModal';
import "./ann.scss";


const CreateAnnouncementForm = () => {
    const { user } = useAuth();
    const { announcements, fetchAnnouncements, createAnnouncement } = useAnnouncements();

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [announcementImage, setAnnouncementImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnnouncements(); // Fetch announcements when the component mounts
    }, [fetchAnnouncements]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') setTitle(value);
        else if (name === 'content') setContent(value);
    };

    const handleImageChange = (event) => {
        setAnnouncementImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (user?.id) {
            formData.append('createdBy', user.id);
        }
        if (announcementImage) {
            formData.append('announcementImage', announcementImage);
        }

        try {
            const response = await createAnnouncement(formData);
            if (response?.id) {
                setMessage('Announcement created successfully!');
                setModalVisible(false);
                setTitle('');
                setContent('');
                setAnnouncementImage(null);
            } else {
                throw new Error('Failed to create announcement. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setModalVisible(true)}>Post Announcement</button>
            {modalVisible && (
                <AnnouncementModal onClose={() => setModalVisible(false)}>
                    <div>
                        {message && <p>{message}</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input id="title" type="text" name="title" value={title} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="content">Content:</label>
                                <textarea id="content" name="content" value={content} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="announcementImage">Image (optional):</label>
                                <input id="announcementImage" type="file" name="announcementImage" onChange={handleImageChange} accept="image/*" />
                            </div>
                            <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Announcement'}</button>
                        </form>
                    </div>
                </AnnouncementModal>
            )}

        </>
    );
};

export default CreateAnnouncementForm;
