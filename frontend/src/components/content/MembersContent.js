import React, { useState } from 'react';

const MembersContent = () => {
    // Enhanced member data with categories and bios
    const [members, setMembers] = useState([
        { _id: 'member1', name: 'Alice Johnson', role: 'Data Scientist', category: 'Staff', bio: 'Alice has over 10 years of experience in data science and loves to share her knowledge.', color: '#007bff' },
        { _id: 'member2', name: 'Mohamed Al Fayed', role: 'Product Manager', category: 'Alumni', bio: 'Mohamed is a successful product manager with a passion for user-centered design and innovation.', color: '#28a745' },
        { _id: 'member3', name: 'Liu Wei', role: 'Software Engineer', category: 'Student', bio: 'Liu is currently pursuing her degree in computer science and excels in full-stack development.', color: '#dc3545' },
        { _id: 'member4', name: 'Patricia Santos', role: 'UX Designer', category: 'Staff', bio: 'Patricia is an experienced UX designer who believes in creating intuitive and accessible designs.', color: '#ffc107' }
    ]);

    const memberStyle = (backgroundColor) => ({
        padding: '15px',
        margin: '10px 0',
        borderRadius: '8px',
        backgroundColor,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    });

    const bioStyle = {
        fontSize: '0.8rem',
        marginTop: '10px',
        opacity: 0.9,
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Members</h2>
            {members.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {members.map(member => (
                        <li key={member._id} style={memberStyle(member.color)}>
                            <strong>{member.name}</strong> - <em>{member.role}</em>
                            <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>{member.category}</div>
                            <div style={bioStyle}>{member.bio}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No members to display.</p>
            )}
        </div>
    );
};

export default MembersContent;
