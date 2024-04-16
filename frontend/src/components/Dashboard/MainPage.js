import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import Announcements from '../../pages/ Announcements';
import Vibe from '../../pages/Vibe';
import Events from '../../pages/Events';
import Thread from '../../pages/Thread';
import './MainPage.css';


const MainPage = () => {
    const { activeSection } = useDashboard();

    const renderSection = () => {
        switch (activeSection) {
            case 'Event':
                return <Events />;
            case 'Announcements':
                return <Announcements />;
            case 'Vibe':
                return <Vibe />;
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
