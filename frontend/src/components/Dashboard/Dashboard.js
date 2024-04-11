import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import LeftSidebar from './LeftSidebar';
import MainPage from './MainPage';
import RightSidebar from './RightSidebar';
import './Dashboard.css';
import Navigation from '../Navigation';

const Dashboard = () => {
    return (
        <DashboardProvider>
            <div className='layout'>
                <Navigation />
                <div className="dashboard-layout">
                    <LeftSidebar className="left-sidebar" />
                    <MainPage className="main-page" />
                    <RightSidebar className="right-sidebar" />
                </div>
            </div>
        </DashboardProvider>
    );
};

export default Dashboard;
