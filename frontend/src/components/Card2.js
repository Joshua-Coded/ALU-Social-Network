import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

// Define a mapping for social media icons
const icons = {
    LinkedIn: <FaLinkedin />,
    Instagram: <FaInstagram />,
    Facebook: <FaFacebook />,
    YouTube: <FaYoutube />,
};

const Card2 = ({ boxes }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        margin: '20px',
    }}>
        {boxes.map((box, index) => (
            <div key={index} style={{
                width: '300px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                background: '#fff',
                padding: '20px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <h2>{box.title}</h2>
                <p>{box.content}</p>
                {/* Adjust here for socialMedia rendering within the last box */}
                {box.socialMedia ? (
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                        {box.socialMedia.map(link => (
                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                                {icons[link.name]}
                            </a>
                        ))}
                    </div>
                ) : (
                    <button style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: 'pointer',
                        alignSelf: 'start',
                    }}>
                        {box.buttonLabel}
                    </button>
                )}
            </div>
        ))}
    </div>
);


export default Card2;
