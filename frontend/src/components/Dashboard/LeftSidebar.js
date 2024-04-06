import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import './LeftSidebar.css';
import { FiBell, FiZap, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const LeftSidebar = () => {
    const { currentView, setCurrentView } = useDashboard();

    return (
        <div className="left-sidebar">
            <ul className="sidebar-links">
                <li
                    className={currentView === 'Announcements' ? 'active' : ''}
                    onClick={() => setCurrentView('Announcements')}
                >
                    <FiBell /> Announcements
                </li>
                <li
                    className={currentView === 'Vibe' ? 'active' : ''}
                    onClick={() => setCurrentView('Vibe')}
                >
                    <FiZap /> Vibe
                </li>
                <li
                    className={currentView === 'Event' ? 'active' : ''}
                    onClick={() => setCurrentView('Event')}
                >
                    <FiCalendar /> Event
                </li>
                <li
                    className={currentView === 'Thread' ? 'active' : ''}
                    onClick={() => setCurrentView('Thread')}
                >
                    <FiMessageSquare /> Thread
                </li>
                <li>
                    <span className="faded"> Communities</span>
                </li>
                <li>
                    <span className="faded"> Direct Messages</span>
                </li>
            </ul>
        </div>
    );
};

export default LeftSidebar;
