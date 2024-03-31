import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from '../src/components/Navigation';
import HomePage from '../src/pages/HomePage';
import LoginForm from '../src/components/LoginForm';
import RegisterForm from '../src/components/RegisterForm';
// import Dashboard from '../src/pages/Dashboard';
import Dashboard from '../src/components/Dashboard/Dashboard';
import FeedPage from '../src/pages/FeedPage';
import DiscoveryPage from '../src/pages/DiscoveryPage';
import EventsPage from '../src/pages/EventsPage';
import MembersPage from '../src/pages/MembersPage';
import ChannelsPage from '../src/pages/ChannelsPage';
import { AuthProvider } from '../src/components/context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/discovery" element={<DiscoveryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/channels" element={<ChannelsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
