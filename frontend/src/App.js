import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from '../src/components/Navigation';
import HomePage from '../src/pages/HomePage';
import LoginForm from '../src/components/LoginForm';
import RegisterForm from '../src/components/RegisterForm';
// import Dashboard from '../src/pages/Dashboard';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Messages from './pages/Messages';
import Event from './pages/Event';
import Thread from './pages/Thread';
import Announcements from './pages/ Announcements';
import { AuthProvider } from '../src/components/context/AuthContext';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Vibe from './pages/Vibe';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Navigation /> */}
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
    </AuthProvider>
  );
}

export default App;
