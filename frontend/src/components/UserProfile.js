import React, { useState, useEffect } from 'react';
import "./user-profile.scss"
import Navigation from './Navigation';
import { FaUser, FaGraduationCap, FaBriefcase, FaCog, FaEnvelope, FaLanguage, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import GeneralInformation from './GeneralInformation';
import Academic from './Academic';
import Professional from './Professional';

function UserProfile({ userId }) {
    const [currentTab, setCurrentTab] = useState('general');
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('userProfileData')) || {
            profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRurSsC10za5rsjIqDxJM59wX-kgbiSHjy4lKQnyQH0tTK3z1szioNnmU7FnTDlZgyZC4E&s',
            banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpbmtlZGluJTIwYmFubmVyfGVufDB8fDB8fHww',
            // ... other user data
        }
    );

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Basic image validation
        if (!selectedFile || !selectedFile.type.startsWith('image/')) {
            console.error('Invalid file type. Please select an image.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const updatedUserData = { ...userData };
            if (event.target.name === 'profileImage') {
                updatedUserData.profileImage = e.target.result;
            } else if (event.target.name === 'banner') {
                updatedUserData.banner = e.target.result;
            }
            setUserData(updatedUserData);
            localStorage.setItem('userProfileData', JSON.stringify(updatedUserData));
        };
        reader.readAsDataURL(selectedFile);
    };

    useEffect(() => {
        // Persist user data to local storage on every change to userData
        localStorage.setItem('userProfileData', JSON.stringify(userData));
    }, [userData]);

    // ... rest of your UserProfile component code ...

    return (
        <>
            <Navigation />
            <div className="user-profile">
                <div className="profile-banner" style={{ backgroundImage: `url(${userData.banner})` }}>
                    <div className="profile-image">
                        <img src={userData.profileImage || '/default-profile.jpg'} alt={userData.name} />
                        <input type="file" name="profileImage" onChange={handleFileChange} />
                    </div>
                    <div className="action-buttons">
                        <button>Message</button>
                        <button>Search</button>
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
                <div className="profile-content">
                    {/* ... profile content sections ... */}
                </div>
            </div>
        </>
    );
}

export default UserProfile;
