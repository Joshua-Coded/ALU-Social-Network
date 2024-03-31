import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import LeftSidebar from './LeftSidebar';
import MainPage from './MainPage';
import RightSidebar from './RightSidebar';
import './Dashboard.css';
import Navigation from '../Navigation';
import { AuthProvider } from '../context/AuthContext';

const Dashboard = () => {
    return (
        <DashboardProvider>
            <AuthProvider><Navigation /></AuthProvider>

            <div className="dashboard-container">
                <LeftSidebar />
                <MainPage />
                <RightSidebar />
            </div>
        </DashboardProvider>
    );
};

export default Dashboard;
