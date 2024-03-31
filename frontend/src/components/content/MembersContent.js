import React, { useState } from 'react';

const MembersContent = () => {
    const [members, setMembers] = useState([
        {
            _id: 'member1',
            name: 'John Doe',
            role: 'Alumni',
            bio: 'John is a software engineer at Google, focusing on AI and machine learning.',
            socials: {
                linkedin: 'https://www.linkedin.com/in/johndoe/',
                instagram: 'https://www.instagram.com/johndoe/',
                twitter: 'https://twitter.com/johndoe'
            }
        },
        {
            _id: 'member2',
            name: 'Jane Smith',
            role: 'Student',
            bio: 'Jane is a computer science major with a passion for open-source projects.',
            socials: {
                linkedin: 'https://www.linkedin.com/in/janesmith/',
                instagram: 'https://www.instagram.com/janesmith/',
                twitter: 'https://twitter.com/janesmith'
            }
        },
        {
            _id: 'member3',
            name: 'Emma Wilson',
            role: 'Staff',
            bio: 'Emma is part of the university\'s IT department, helping to innovate educational technology.',
            socials: {
                linkedin: 'https://www.linkedin.com/in/emmawilson/',
                instagram: 'https://www.instagram.com/emmawilson/',
                twitter: 'https://twitter.com/emmawilson'
            }
        },
    ]);

    const memberStyle = {
        padding: '20px',
        margin: '15px 0',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Members</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {members.map(member => (
                    <li key={member._id} style={memberStyle}>
                        <h3>{member.name}</h3>
                        <p>{member.bio}</p>
                        <small>Role: {member.role}</small>
                        <div>
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> |
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"> Instagram</a> |
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"> Twitter</a>
                        </div>
                    </li>
                ))}
            </ul>
            {members.length === 0 && <p>No members to display.</p>}
        </div>
    );
};

export default MembersContent;
