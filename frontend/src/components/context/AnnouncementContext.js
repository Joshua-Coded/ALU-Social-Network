import React, { createContext, useContext, useState, useEffect } from 'react';

const AnnouncementContext = createContext();

export const useAnnouncements = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }) => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/announcements');
            if (!response.ok) throw new Error('Failed to fetch announcements');

            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const createAnnouncement = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/announcements', {
                method: 'POST',
                body: formData,
                // No need to explicitly set Content-Type to multipart/form-data,
                // fetch does that automatically with the correct boundary parameter
            });
            if (!response.ok) {
                // If response is not ok, throw error with response status
                throw new Error(`Failed to create announcement: ${response.status}`);
            }
            const data = await response.json();
            setAnnouncements(prev => [...prev, data]);
            return data;
        } catch (error) {
            console.error("Error creating announcement:", error);
            throw error;
        }
    };

    return (
        <AnnouncementContext.Provider value={{ announcements, fetchAnnouncements, createAnnouncement }}>
            {children}
        </AnnouncementContext.Provider>
    );
};
