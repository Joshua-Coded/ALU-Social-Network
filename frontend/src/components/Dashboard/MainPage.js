import React from 'react';
import { useDashboard } from '../context/DashboardContext';

const MainPage = () => {
    const { currentView } = useDashboard();


    return (
        <div className="main-page">
            <h2>{currentView}</h2>
            <p>This is the {currentView} page. Content here can be dynamically changed based on sidebar navigation.</p>
        </div>
    );
};

export default MainPage;
