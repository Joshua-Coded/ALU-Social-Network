import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import Announcements from '../../pages/ Announcements';
import Vibe from '../../pages/Vibe';
import Event from '../../pages/Event';
import Thread from '../../pages/Thread';
import './MainPage.css';

const MainPage = () => {
    const { activeSection } = useDashboard();

    const renderSection = () => {
        switch (activeSection) {
            case 'Announcements':
                return <Announcements />;
            case 'Vibe':
                return <Vibe />;
            case 'Event':
                return <Event />;
            case 'Thread':
                return <Thread />;
            default:
                return <div>Select a section from the sidebar</div>;
        }
    };

    return (
        <div className="main-page">
            {renderSection()}
        </div>
    );
};

export default MainPage;
