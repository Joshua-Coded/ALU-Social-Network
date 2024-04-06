import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('Announcements');

    const changeSection = (section) => {
        setActiveSection(section);
    };

    return (
        <DashboardContext.Provider value={{ activeSection, changeSection }}>
            {children}
        </DashboardContext.Provider>
    );
};
