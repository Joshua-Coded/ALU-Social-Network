import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Adjusted import
import { useNavigate } from 'react-router-dom'; // Corrected import
import { FiSearch, FiMoreHorizontal, FiMenu } from 'react-icons/fi';
import LoginForm from './LoginForm';
import "./Navigation.css";

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const navigate = useNavigate(); // Corrected to use useNavigate

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleNav = () => setIsNavVisible(!isNavVisible);
    return (
        <nav className="navigation-container">
            <button className="hamburger-icon" onClick={toggleNav} aria-label="Toggle navigation">
                <FiMenu />
            </button>
            <div className={isNavVisible ? "links-container active" : "links-container"}>
                <Link to="/" onClick={() => setIsNavVisible(false)}>Home</Link>
                <Link to="/about" onClick={() => setIsNavVisible(false)}>About</Link>
                <Link to="/networks" onClick={() => setIsNavVisible(false)}>Networks</Link>
                <Link to="/careers" onClick={() => setIsNavVisible(false)}>Careers Portal</Link>
                <Link to="/resources" onClick={() => setIsNavVisible(false)}>Resources</Link>
                <Link to="/events" onClick={() => setIsNavVisible(false)}>Events</Link>
                <Link to="/stories" onClick={() => setIsNavVisible(false)}>Stories</Link>
            </div>
            <div className="search-account-area">
                <div className="search-area">
                    <FiSearch className="search-icon" />
                    <input type="text" className="search-input" placeholder="Search..." />
                </div>
                <button className="account-area" onClick={toggleModal}>
                    <FiMoreHorizontal /><span>My Account</span>
                </button>
            </div>
            {isModalOpen && (
                <div className="account-modal">
                    <LoginForm onLoginSuccess={() => {
                        setIsModalOpen(false); // Close the modal upon successful login
                        navigate('/dashboard'); // Navigate to the dashboard
                    }} />
                </div>
            )}
        </nav>
    );
};

export default Navigation;
