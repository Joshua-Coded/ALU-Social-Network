import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiMessageSquare, FiBell, FiUser } from 'react-icons/fi';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';
import LoginForm from './LoginForm';
import "./Navigation.css";
import { useAuth } from '../components/context/AuthContext';

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isNavVisible, setIsNavVisible] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    // const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleNav = () => setIsNavVisible(!isNavVisible);


    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleModal = (event) => {
        // Prevents the event from bubbling up to the document body
        event.stopPropagation();
        setIsModalOpen(!isModalOpen);
    };



    const getModalStyles = () => {
        if (['login', 'register'].includes(modalContent)) {
            return {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '400px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                zIndex: 1050,
            };
        } else { // 'accountDetails' or any other content
            return {
                position: 'absolute',
                top: '100%',
                left: '0',
                transform: 'translateY(10px)',
                width: '200px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                zIndex: 1050,
            };
        }
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isModalOpen && !event.target.closest('.account-modal') && !event.target.closest('.account-area')) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isModalOpen]);



    return (
        <nav className="navigation-container">
            <div className="logo-and-search">
                <Link to="/" className="logo-link"><img src="/path-to-your-logo.png" alt="Logo" className="app-logo" /></Link>
                <div className="search-area">
                    <FiSearch className="search-icon" />
                    <input type="text" className="search-input" placeholder="Search..." />
                </div>
            </div>
            <div className="nav-links">
                <Link to="/home" className="nav-icon-link"><FiHome /><span>Home</span></Link>
                <Link to="/communities" className="nav-icon-link"><FiUsers /><span>Communities</span></Link>
                <Link to="/messages" className="nav-icon-link"><FiMessageSquare /><span>Messages</span></Link>
                <Link to="/notifications" className="nav-icon-link"><FiBell /><span>Notifications</span></Link>
            </div>
            <div className="account-area-container">
                <div className="profile-picture-area" onClick={toggleModal}>
                    {/* Placeholder for user's profile picture; replace with actual dynamic source */}
                    <img src="/path-to-users-profile-picture.png" alt="Profile" className="profile-picture" />
                    <FiMoreHorizontal className="profile-dropdown-icon" />
                </div>
            </div>
            {isModalOpen && (
                <div className="account-modal" style={getModalStyles()}>
                    {isAuthenticated ? (
                        <ul>
                            <li><Link to="/profile" onClick={() => setIsModalOpen(false)}>My Profile</Link></li>
                            <li><Link to="/settings" onClick={() => setIsModalOpen(false)}>Settings</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    ) : (
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
