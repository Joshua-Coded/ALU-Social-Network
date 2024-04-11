import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { FiHome, FiBookOpen, FiLifeBuoy, FiAlertOctagon } from 'react-icons/fi';
import './LeftSidebar.css';

const LeftSidebar = ({ className }) => {
    const { activeSection, changeSection } = useDashboard();

    return (
        <div className={`left-sidebar ${className}`}>
            <ul className="sidebar-links">
                <li className={activeSection === 'Announcements' ? 'active' : ''} onClick={() => changeSection('Announcements')}>
                    <FiHome /> Announcements
                </li>
                <li className={activeSection === 'Vibe' ? 'active' : ''} onClick={() => changeSection('Vibe')}>
                    <FiLifeBuoy /> Vibes
                </li>
                <li className={activeSection === 'Event' ? 'active' : ''} onClick={() => changeSection('Event')}>
                    <FiBookOpen />Events
                </li>
                <li className={activeSection === 'Thread' ? 'active' : ''} onClick={() => changeSection('Thread')}>
                    <FiAlertOctagon />Thread
                </li>
                <hr />
                <div className="separator"></div> {/* This div acts as a separator */}

                <li className="faded" onClick={() => changeSection('Communities')}>
                    Communities

                </li>
                <li className="faded" onClick={() => changeSection('DirectMessages')}>
                    Direct Messages
                </li>



            </ul>
        </div>
    );
};

export default LeftSidebar;
