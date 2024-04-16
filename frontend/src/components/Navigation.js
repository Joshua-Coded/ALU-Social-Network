import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiMessageSquare, FiBell, FiSearch, FiMoreHorizontal } from 'react-icons/fi';
// import "./Navigation.css";
import "../components/navbar/navbar.scss";
import { useAuth } from '../components/context/AuthContext';
import LoginForm from './LoginForm';
import appLogo from '../images/background.jpeg';

const Navigation = () => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleProfileDropdown = (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        setShowProfileDropdown(!showProfileDropdown);
    };

    // event listener to close the dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.profile-dropdown') && !event.target.closest('.account-area')) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <nav className="navigation-container navbar">
            <div className="logo-and-search left">
                <Link to="/" className="logo-link">
                    <img src={appLogo} alt="ALU SN" className="app-logo" />
                    <h1>ALU SN</h1>
                </Link>
                <div className="search-area">
                    <FiSearch className="search-icon" />
                    <input type="text" className="search-input" placeholder="Search here..." />
                </div>
            </div>
            <div className="nav-links right">
                <Link to="/home" className="nav-icon-link"><FiHome /><span>Home</span></Link>
                <Link to="/communities" className="nav-icon-link"><FiUsers /><span>Communities</span></Link>
                <Link to="/messages" className="nav-icon-link"><FiMessageSquare /><span>Messages</span></Link>
                {/* <div className="nav-icon-link bell-icon"><FiBell /></div> */}
                <div className="account-area">

                    <div className="notification" onClick={toggleProfileDropdown} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <FiBell />
                        <img src={appLogo} alt="Profile" className="profile-picture" />
                        <FiMoreHorizontal className="profile-dropdown-icon" />
                    </div>
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" onClick={() => setShowProfileDropdown(false)}>My Profile</Link>
                                    <Link to="/settings" onClick={() => setShowProfileDropdown(false)}>Settings</Link>
                                    <button className='logout-button' onClick={() => { handleLogout(); setShowProfileDropdown(false); }}>Logout</button>
                                </>
                            ) : (
                                <LoginForm onLoginSuccess={() => {
                                    setShowProfileDropdown(false);
                                    navigate('/dashboard');
                                }} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
