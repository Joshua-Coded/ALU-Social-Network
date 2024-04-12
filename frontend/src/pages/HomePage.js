// src/pages/HomePage.js
import React from 'react';
import { DashboardProvider } from '../components/context/DashboardContext';
import Navigation from '../components/Navigation';
import LeftSidebar from '../components/Dashboard/LeftSidebar';
import MainPage from '../components/Dashboard/MainPage';
import RightSidebar from '../components/Dashboard/RightSidebar';
import './HomePage.css';


const HomePage = () => (
    <DashboardProvider>
        <>
            <Navigation />
            <div className="dashboard-layout">
                <LeftSidebar />
                <MainPage />
                <RightSidebar />
            </div>
        </>
    </DashboardProvider>
);

export default HomePage;
