import React from 'react';
import Academic from './Academic'; // Ensure this is the correct path
import Professional from './Professional'; // Ensure this is the correct path

function GeneralInformation({ userData }) {
    return (
        <div>
            <div className="about-me-card">
                <h2>About Me</h2>
                <p>{userData.bio || "No bio provided."}</p>
            </div>
            <Academic academicData={userData.academicDetails} />
            <Professional professionalData={userData.professionalExperience} />
        </div>
    );
}

export default GeneralInformation;
