import React, { createContext, useContext, useState } from 'react';

const AnnouncementContext = createContext();

export const useAnnouncements = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }) => {
    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/announcements', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                // Map through announcements and populate createdBy field with required user fields
                const populatedAnnouncements = await Promise.all(data.map(async (announcement) => {
                    const { createdBy } = announcement;
                    if (createdBy) {
                        const userResponse = await fetch(`http://localhost:5000/api/users/${createdBy}`);
                        const userData = await userResponse.json();
                        announcement.createdBy = userData;
                    }
                    return announcement;
                }));
                setAnnouncements(populatedAnnouncements);
            } else {
                throw new Error('Failed to fetch announcements');
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const updateAnnouncement = async (announcementId, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (response.ok) {
                setAnnouncements(prevAnnouncements =>
                    prevAnnouncements.map(announcement =>
                        announcement._id === announcementId ? { ...announcement, ...updatedData } : announcement
                    )
                );
            } else {
                throw new Error(data.message || 'Failed to update the announcement');
            }
        } catch (error) {
            console.error("Error updating announcement:", error);
        }
    };


    const createAnnouncement = async (announcementData) => {
        try {
            const response = await fetch('http://localhost:5000/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(announcementData),
            });
            const data = await response.json();
            if (response.ok) {
                setAnnouncements(prevAnnouncements => [...prevAnnouncements, data]);
            } else {
                throw new Error('Failed to post the announcement');
            }
        } catch (error) {
            console.error("Error posting announcement:", error);
        }
    };

    const deleteAnnouncement = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/announcements/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement._id !== id));
            } else {
                throw new Error('Failed to delete the announcement');
            }
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
    };

    return (
        <AnnouncementContext.Provider value={{ announcements, fetchAnnouncements, createAnnouncement, deleteAnnouncement, updateAnnouncement }}>
            {children}
        </AnnouncementContext.Provider>
    );
};
