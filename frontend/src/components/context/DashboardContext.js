import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState('Feed');

    return (
        <DashboardContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </DashboardContext.Provider>
    );
};
