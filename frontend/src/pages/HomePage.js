// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import SearchAccount from '../components/SearchAccount';
import MainContent from '../components/MainContent';

const HomePage = () => (
    <>
        <Header />
        <Navigation />
        <SearchAccount />
        <MainContent />
        {/* Footer component goes here */}
    </>
);

export default HomePage;
