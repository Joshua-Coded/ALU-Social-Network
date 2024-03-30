import React from 'react';
import Card from './Card';
import Card2 from './Card2';
import YouTubeCard from './YouTubeCard';
import Footer from './Footer';

// Existing cardsData for the Card component
const cardsData = [
    {
        id: 1,
        isPrimary: true,
        background: 'url-to-your-primary-image.jpg',
        title: 'Primary Card Title',
        buttonLabel: 'Learn More',
    },
    {
        id: 2,
        background: 'url-to-your-image-2.jpg',
        title: 'Card 2 Title',
        buttonLabel: 'Learn More',
    },
    {
        id: 3,
        background: 'url-to-your-image-3.jpg',
        title: 'Card 3 Title',
        buttonLabel: 'Learn More',
    },
];

// Data for Card2
const boxes = [
    {
        title: "Our Mission",
        content: "Empowering African leaders through innovative education and networking.",
        buttonLabel: "Learn More",
    },
    {
        title: "Join Us",
        content: "Become a part of our growing community and make a difference.",
        buttonLabel: "Sign Up",
    },
    {
        title: "Stay Connected",
        content: "Follow us on social media to get the latest updates.",
        buttonLabel: "Get Involved",
        socialMedia: [
            { name: 'LinkedIn', url: 'https://www.linkedin.com' },
            { name: 'Instagram', url: 'https://www.instagram.com' },
            { name: 'Facebook', url: 'https://www.facebook.com' },
            { name: 'YouTube', url: 'https://www.youtube.com' },
        ],
    },
];

const MainContent = () => (
    <main style={{ textAlign: 'center' }}>
        <h1>Welcome to African Leadership Network</h1>
        <p>A decade of accelerating career pathways.</p>
        {/* Container to control layout */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Card cards={cardsData} />
            <Card2 boxes={boxes} />
            <YouTubeCard
                title="A Message from Our Founder"
                videoId="dQw4w9WgXcQ" // Replace with your video's ID
            />
        </div>
        <Footer />
    </main>

);

export default MainContent;
