import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RightSidebar.css';
import "./rightbar.scss";

const RightSidebar = () => {
    const newsTrends = [
        { title: 'Easter Egg Hunt 2024 Announced!', link: 'https://example.com/easter-egg-hunt' },
        { title: 'Top 5 Easter Recipes for a Family Dinner', link: 'https://example.com/easter-recipes' },
        { title: 'The Meaning Behind Easter Traditions', link: 'https://example.com/easter-traditions' },
        { title: 'Easter Decorating Ideas for Your Home', link: 'https://example.com/easter-decorating' },
        { title: 'How to Plan the Perfect Easter Picnic', link: 'https://example.com/easter-picnic' },
        // Add more entries as needed
    ];

    const upcomingEvents = [
        { name: 'Community Easter Parade', date: '2024-04-09', link: 'https://example.com/easter-parade' },
        { name: 'Easter Sunday Service Online', date: '2024-04-10', link: 'https://example.com/easter-service' },
        { name: 'Virtual Easter Egg Decorating Workshop', date: '2024-04-08', link: 'https://example.com/easter-egg-decorating' },
        { name: 'Easter Bonnet Making Session', date: '2024-04-07', link: 'https://example.com/easter-bonnet-session' },
        { name: 'The Great Easter Bake Off', date: '2024-04-11', link: 'https://example.com/easter-bake-off' },
        // Add more entries as needed
    ];

    return (
        <div className="right-sidebar">
            <div className='container'>
                <div className='item'>
                    <span>Events</span>
                    <Link className='event-link' to={"/"}>View All</Link>

                </div>

            </div>
            <h2>News Trends</h2>
            <ul>
                {newsTrends.map((news, index) => (
                    <li key={index}>
                        <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                    </li>
                ))}
            </ul>

            <h2>Upcoming Events</h2>
            <ul>
                {upcomingEvents.map((event, index) => (
                    <li key={index}>
                        <a href={event.link} target="_blank" rel="noopener noreferrer">{event.name}</a> - {event.date}
                    </li>
                ))}
            </ul>

            <div className="animation-wrapper">
                <div className="animated-element">🎉 Celebrate Easter! 🎉</div>
            </div>
        </div>
    );
};

export default RightSidebar;
