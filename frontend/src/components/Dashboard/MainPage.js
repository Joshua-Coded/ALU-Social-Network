// src/components/Dashboard/MainPage.js
import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { FeedContent } from '../content/FeedContent';
import { DiscoveryContent } from '../content/DiscoveryContent';
import { EventsContent } from '../content/EventsContent';
import { MembersContent } from '../content/MembersContent';
import { ChannelsContent } from '../content/ChannelsContent';



const contentComponents = {
    Feed: FeedContent,
    Discovery: DiscoveryContent,
    Events: EventsContent,
    Members: MembersContent,
    Channels: ChannelsContent,
    // Map other views to their components
};

const MainPage = () => {
    const { currentView } = useDashboard();

    // Determine which component to render based on currentView
    const ContentComponent = contentComponents[currentView] || (() => <div>Select a view from the sidebar</div>);

    return (
        <div className="main-page">
            <ContentComponent />
        </div>
    );
};

export default MainPage;
