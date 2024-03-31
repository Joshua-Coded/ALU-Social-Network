import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import './LeftSidebar.css'; // Import the CSS file here

const LeftSidebar = () => {
    const { currentView, setCurrentView } = useDashboard(); // Assuming you have a way to get the current view as well

    return (
        <div className="left-sidebar">
            <ul className="sidebar-links">
                <li
                    className={currentView === 'Feed' ? 'active' : ''}
                    onClick={() => setCurrentView('Feed')}
                >
                    Feed
                </li>
                <li
                    className={currentView === 'Discovery' ? 'active' : ''}
                    onClick={() => setCurrentView('Discovery')}
                >
                    Discovery
                </li>
                <li
                    className={currentView === 'Events' ? 'active' : ''}
                    onClick={() => setCurrentView('Events')}
                >
                    Events
                </li>
                <li
                    className={currentView === 'Members' ? 'active' : ''}
                    onClick={() => setCurrentView('Members')}
                >
                    Members
                </li>
                <li
                    className={currentView === 'Channels' ? 'active' : ''}
                    onClick={() => setCurrentView('Channels')}
                >
                    Channels
                </li>
            </ul>
        </div>
    );
};

export default LeftSidebar;
