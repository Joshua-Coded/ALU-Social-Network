import React, { useEffect, useState } from 'react';
import CreateAnnouncementForm from '../components/CreateAnnouncementForm';
import { useAnnouncements } from '../components/context/AnnouncementContext'; // Adjust the path as necessary

const AnnouncementsPage = () => {
    // Use the custom hook to access context values
    const { announcements, fetchAnnouncements } = useAnnouncements();

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    return (
        <div>
            <h1>Announcements</h1>
            <CreateAnnouncementForm />
            <div>
                {announcements.map((announcement) => (
                    <div key={announcement._id}>
                        <h2>{announcement.title}</h2>
                        <p>{announcement.content}</p>
                        {/* Display the image if it exists */}
                        {announcement.announcementImage && (
                            <img src={`http://localhost:5000/${announcement.announcementImage}`} alt="Announcement" />
                        )}
                        {/* Further implementation details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementsPage;
