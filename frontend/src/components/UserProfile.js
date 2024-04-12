import React, { useState, useEffect } from 'react';
import { Route, Routes, NavLink, Navigate, Link } from 'react-router-dom';

import './user-profile.scss';
import Navigation from './Navigation';
import { FaUser, FaGraduationCap, FaBriefcase, FaCog, FaEnvelope, FaLanguage, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
// import OtherInfo from './OtherInfo';
import GeneralInformation from './GeneralInformation';
import Academic from './Academic';
import Professional from './Professional';


function UserProfile({ userId }) {
    const [formData, setFormData] = useState(null);
    const [currentTab, setCurrentTab] = useState('general');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        bio: 'Click here to add a bio...', // Default bio placeholder
        skills: [],
        socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
        academicDetails: [],
        professionalExperience: [],
        generalInfo: { email: '', languages: [], location: '' },
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRurSsC10za5rsjIqDxJM59wX-kgbiSHjy4lKQnyQH0tTK3z1szioNnmU7FnTDlZgyZC4E&s',
        banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpbmtlZGluJTIwYmFubmVyfGVufDB8fDB8fHww'
    });
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
            try {
                // Perform fetch or other async operations here
                const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData  // Ensure formData is defined and prepared before useEffect is called or define it inside here
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const result = await response.json();
                console.log('Profile updated successfully', result);
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };

        // Check if userId is valid then call fetchData
        if (userId) {
            fetchData();
        } else {
            console.error('User ID is undefined');
        }
    }, [userId]);  // useEffect depends on userId



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setUserData(prev => ({
                ...prev,
                [e.target.name]: URL.createObjectURL(e.target.files[0])
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append files and user data as needed
        formData.append('userData', JSON.stringify(userData));
        // Assuming there's a file input for profileImage in your form
        const profileImageInput = document.querySelector('input[type="file"][name="profileImage"]');
        if (profileImageInput && profileImageInput.files[0]) {
            formData.append('profileImage', profileImageInput.files[0]);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const result = await response.json();
            console.log('Profile updated successfully', result);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <>
            <Navigation />
            <div className="user-profile">
                <div className="profile-banner" style={{ backgroundImage: `url(${userData.banner})` }}>
                    <div className="profile-info">
                        <div className="profile-image">
                            <img src={userData.profileImage || '/default-profile.jpg'} alt={userData.name} />
                            <input type="file" name="profileImage" onChange={handleFileChange} />
                        </div>
                        <div className="user-details">
                            <h2>{userData.name}</h2>
                            <textarea name="bio" value={userData.bio} onChange={handleChange}
                                onFocus={(e) => e.target.value === 'Click here to add a bio...' ? e.target.value = '' : null}
                                onBlur={(e) => e.target.value === '' ? e.target.value = 'Click here to add a bio...' : null} />
                        </div>
                        <div className="action-buttons">
                            <button>Message</button>
                            <button>Search</button>
                        </div>
                    </div>
                </div>
                <div className="profile-details">
                    <button className={currentTab === 'general' ? 'active-link' : 'link'} onClick={() => setCurrentTab('general')}>
                        <FaUser size={24} /><h3>General</h3>
                    </button>
                    <button className={currentTab === 'academic' ? 'active-link' : 'link'} onClick={() => setCurrentTab('academic')}>
                        <FaGraduationCap size={24} /><h3>Academic</h3>
                    </button>
                    <button className={currentTab === 'professional' ? 'active-link' : 'link'} onClick={() => setCurrentTab('professional')}>
                        <FaBriefcase size={24} /><h3>Professional</h3>
                    </button>
                </div>
                <div className="profile-content">
                    {currentTab === 'general' && <GeneralInformation userData={userData} />}
                    {currentTab === 'academic' && <Academic academicData={userData.academicDetails} />}
                    {currentTab === 'professional' && <Professional professionalData={userData.professionalExperience} />}
                </div>

            </div>
        </>
    );
}

export default UserProfile;
