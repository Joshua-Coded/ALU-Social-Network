import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import LoginForm from '../src/components/LoginForm';
import RegisterForm from '../src/components/RegisterForm';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Messages from './pages/Messages';
import Event from './pages/Event';
import Thread from './pages/Thread';
import Announcements from './pages/ Announcements';
import { AuthProvider } from '../src/components/context/AuthContext';
import { AnnouncementProvider } from '../src/components/context/AnnouncementContext'; // Adjust path as necessary
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Vibe from './pages/Vibe';

function App() {
  return (
    <AuthProvider>
      <AnnouncementProvider> {/* Wrap with AnnouncementProvider */}
        <Router>
          {/* <Navigation /> Optionally include if you have a navigation component */}
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/vibes" element={<Vibe />} />
            <Route path="/event" element={<Event />} />
            <Route path="/thread" element={<Thread />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          </Routes>
        </Router>
      </AnnouncementProvider>
    </AuthProvider>
  );
}

export default App;
