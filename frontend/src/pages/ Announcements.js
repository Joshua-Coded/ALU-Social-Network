// components/CreateAnnouncementForm.js
import React, { useState } from 'react';

const CreateAnnouncementForm = () => {
    const [announcementData, setAnnouncementData] = useState({
        title: '',
        content: '',
        announcementImage: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'announcementImage') {
            setAnnouncementData({ ...announcementData, [name]: event.target.files[0] });
        } else {
            setAnnouncementData({ ...announcementData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', announcementData.title);
        formData.append('content', announcementData.content);
        formData.append('announcementImage', announcementData.announcementImage);
        // Assuming you're saving the userId somehow (e.g., in localStorage)
        formData.append('userId', localStorage.getItem('userId'));

        try {
            const response = await fetch('/api/announcements', {
                method: 'POST',
                body: formData, // FormData will set the `Content-Type` to `multipart/form-data`
            });
            const data = await response.json();
            console.log(data);
            // Handle success (e.g., redirecting to announcements page)
        } catch (error) {
            console.error('Error creating announcement:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title, content, and image inputs */}
            <button type="submit">Post Announcement</button>
        </form>
    );
};

export default CreateAnnouncementForm;
