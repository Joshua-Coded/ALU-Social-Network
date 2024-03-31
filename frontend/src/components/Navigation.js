import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMoreHorizontal, FiMenu } from 'react-icons/fi';
import LoginForm from './LoginForm';
import "./Navigation.css";
import { useAuth } from '../components/context/AuthContext';

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleNav = () => setIsNavVisible(!isNavVisible);


    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
                    {isAuthenticated ? (
                        // Show logout button if authenticated
                        <button onClick={() => { logout(); navigate('/'); setIsModalOpen(false); }}>Logout</button>
                    ) : (
                        // Show LoginForm if not authenticated
                        <LoginForm onLoginSuccess={() => {
                            setIsModalOpen(false);
                            navigate('/dashboard');
                        }} />
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
