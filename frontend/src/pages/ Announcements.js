import React from 'react';

const MainPage = () => {
    const announcements = [
        {
            id: 1,
            title: "Welcome to ALU SN!",
            content: "We're excited to have you on our social network. Stay tuned for more updates.",
            date: "2023-04-05",
        },
        {
            id: 2,
            title: "Upcoming Event: Tech Talk",
            content: "Join us for a tech talk on the latest trends in technology. Date: 2023-04-15.",
            date: "2023-04-06",
        },
    ];



    return (
        <div className="main-content">
            <h2>Announcements</h2>
            <ul>
                {announcements.map(announcement => (
                    <li key={announcement.id}>
                        <h3>{announcement.title}</h3>
                        <p>{announcement.content}</p>
                        <small>{announcement.date}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
