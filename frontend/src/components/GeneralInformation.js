import React, { useState, useEffect } from 'react';
import Academic from './Academic';
import Professional from './Professional';
import "./general.scss";

function GeneralInformation() {
    const [bio, setBio] = useState("");

    const storeBioInLocalStorage = () => {
        localStorage.setItem('bio', bio);
    };

    useEffect(() => {
        // Retrieve bio from local storage on component mount
        const storedBio = localStorage.getItem('bio');
        if (storedBio) {
            setBio(storedBio);
        }
    }, []); // Empty dependency array: run only once on mount

    const handleUpdateBio = (event) => {
        setBio(event.target.value);
        storeBioInLocalStorage();  // Store updated bio in local storage
    };

    return (
        <div>
            <div className="about-me-card">
                <h2>About Me</h2>
                <textarea
                    value={bio}
                    onChange={handleUpdateBio}
                    placeholder="Enter your bio..."
                />
                {/* <button onClick={handleUpdateBio}>Update About Me</button> */}
                <p>Bio: {bio}</p>
            </div>
            <Academic />
            <Professional />
        </div>
    );
}

export default GeneralInformation;
