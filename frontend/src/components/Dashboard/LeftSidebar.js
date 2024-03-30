import React from 'react';
import { useDashboard } from '../context/DashboardContext';

const LeftSidebar = () => {
    const { setCurrentView } = useDashboard();

    return (
        <div className="left-sidebar">
            <ul className="sidebar-links">

                <li onClick={() => setCurrentView('Feed')}>Feed</li>
                <li onClick={() => setCurrentView('Discovery')}>Discovery</li>
                <li onClick={() => setCurrentView('Events')}>Events</li>
                <li onClick={() => setCurrentView('Members')}>Members</li>
                <li onClick={() => setCurrentView('Channels')}>Channels</li>
            </ul>
        </div>
    );
};

export default LeftSidebar;
