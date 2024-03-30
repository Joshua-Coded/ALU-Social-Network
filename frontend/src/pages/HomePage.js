// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import MainContent from '../components/MainContent';

const HomePage = () => (
    <>
        <Header />
        <Navigation />
        <MainContent />
        {/* Footer component goes here */}
    </>
);

export default HomePage;
