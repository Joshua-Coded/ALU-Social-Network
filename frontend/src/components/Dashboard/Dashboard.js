import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import LeftSidebar from './LeftSidebar';
import MainPage from './MainPage';
import RightSidebar from './RightSidebar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <DashboardProvider>
            <div className="dashboard-container">
                <LeftSidebar />
                <MainPage />
                <RightSidebar />
            </div>
        </DashboardProvider>
    );
};

export default Dashboard;
