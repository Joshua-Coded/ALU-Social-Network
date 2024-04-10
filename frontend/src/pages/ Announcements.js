import React, { useEffect, useState } from 'react';
import CreateAnnouncementForm from '../components/CreateAnnouncementForm';
import { useAnnouncements } from '../components/context/AnnouncementContext'; // Adjust the path as necessary
import AnnouncementList from '../components/AnnouncementList';

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
            <AnnouncementList />
        </div>
    );
};

export default AnnouncementsPage;
