import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import LoginForm from '../src/components/LoginForm';
import RegisterForm from '../src/components/RegisterForm';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Messages from './pages/Messages';
import Events from './pages/Events';
import Thread from './pages/Thread';
import Announcements from './pages/ Announcements';
import { AuthProvider } from '../src/components/context/AuthContext';
import { AnnouncementProvider } from '../src/components/context/AnnouncementContext';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Vibe from './pages/Vibe';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <AuthProvider>
      <AnnouncementProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/vibes" element={<Vibe />} />
            <Route path="/event" element={<Events />} />
            <Route path="/thread" element={<Thread />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/profile" element={<UserProfile />} />  // Add this line
          </Routes>
        </Router>
      </AnnouncementProvider>
    </AuthProvider>
  );
}

export default App;
