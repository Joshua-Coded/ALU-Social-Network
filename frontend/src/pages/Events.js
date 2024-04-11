import React from 'react';
import "./events.scss";

const Events = () => {
    const events = [
        {
            id: 1,
            name: "Tech Conference",
            description: "Join us for an exciting tech conference with leading industry experts.",
            img: "https://source.unsplash.com/1600x900/?technology,conference",
        },
        {
            id: 2,
            name: "Art Expo",
            description: "Explore the latest in contemporary art and design.",
            img: "https://source.unsplash.com/1600x900/?art,expo",
        },
        {
            id: 3,
            name: "Music Festival",
            description: "Experience the best of live music with artists from around the world.",
            img: "https://source.unsplash.com/1600x900/?music,festival",
        },
        {
            id: 4,
            name: "Film Screening",
            description: "Discover independent films from award-winning filmmakers.",
            img: "https://source.unsplash.com/1600x900/?film,screening",
        },
        {
            id: 5,
            name: "Business Networking Event",
            description: "Expand your network at our business networking event.",
            img: "https://source.unsplash.com/1600x900/?business,networking",
        },
        {
            id: 6,
            name: "Literary Workshop",
            description: "A deep dive into literary analysis and critique, led by renowned authors.",
            img: "https://source.unsplash.com/1600x900/?books,library",
        },
        {
            id: 7,
            name: "Marathon",
            description: "Join thousands of runners in the annual city marathon.",
            img: "https://source.unsplash.com/1600x900/?marathon,running",
        },
        {
            id: 8,
            name: "Tech Hackathon",
            description: "Hackathon event bringing together developers to solve tech challenges.",
            img: "https://source.unsplash.com/1600x900/?hackathon,developers",
        },
        {
            id: 9,
            name: "Health and Wellness Fair",
            description: "Explore health and wellness practices from experts.",
            img: "https://source.unsplash.com/1600x900/?health,wellness",
        },
        {
            id: 10,
            name: "Culinary Festival",
            description: "Taste dishes from world-renowned chefs and explore culinary delights.",
            img: "https://source.unsplash.com/1600x900/?food,festival",
        },
        {
            id: 1,
            name: "Tech Conference",
            description: "Join us for an exciting tech conference with leading industry experts.",
            img: "https://source.unsplash.com/1600x900/?technology,conference",
        },
        {
            id: 2,
            name: "Art Expo",
            description: "Explore the latest in contemporary art and design.",
            img: "https://source.unsplash.com/1600x900/?art,expo",
        },
        {
            id: 3,
            name: "Music Festival",
            description: "Experience the best of live music with artists from around the world.",
            img: "https://source.unsplash.com/1600x900/?music,festival",
        },
        {
            id: 4,
            name: "Film Screening",
            description: "Discover independent films from award-winning filmmakers.",
            img: "https://source.unsplash.com/1600x900/?film,screening",
        },
        {
            id: 5,
            name: "Business Networking Event",
            description: "Expand your network at our business networking event.",
            img: "https://source.unsplash.com/1600x900/?business,networking",
        },
        {
            id: 6,
            name: "Literary Workshop",
            description: "A deep dive into literary analysis and critique, led by renowned authors.",
            img: "https://source.unsplash.com/1600x900/?books,library",
        },
        {
            id: 7,
            name: "Marathon",
            description: "Join thousands of runners in the annual city marathon.",
            img: "https://source.unsplash.com/1600x900/?marathon,running",
        },
        {
            id: 8,
            name: "Tech Hackathon",
            description: "Hackathon event bringing together developers to solve tech challenges.",
            img: "https://source.unsplash.com/1600x900/?hackathon,developers",
        },
        {
            id: 9,
            name: "Health and Wellness Fair",
            description: "Explore health and wellness practices from experts.",
            img: "https://source.unsplash.com/1600x900/?health,wellness",
        },
        {
            id: 10,
            name: "Culinary Festival",
            description: "Taste dishes from world-renowned chefs and explore culinary delights.",
            img: "https://source.unsplash.com/1600x900/?food,festival",
        }

    ];

    return (
        <>
            <h2 className="events-header">Upcoming Events</h2>
            <div className="events-container">

                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <img src={event.img} alt={event.name} className="event-image" />
                        <div className="event-info">
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <button onClick={() => alert("Registering for: " + event.name)}>Register for Event</button>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
};

export default Events;
