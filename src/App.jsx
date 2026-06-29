import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Applicants from './pages/Applicants';
import Hosting from './pages/Hosting';

import './assets/global.css';

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('light', !dark);
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <>
      <Routes>
        {/* Auth route — no navbar overlay needed (AuthPage renders its own) */}
        <Route path="/login" element={<AuthPage dark={dark} onToggleDark={toggle} />} />

        {/* Protected routes — shared navbar */}
        <Route path="/*" element={
          <ProtectedRoute>
            <>
              <Navbar dark={dark} onToggleDark={toggle} />
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="applicants" element={<Applicants />} />
                <Route path="hosting" element={<Hosting />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </>
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        theme="dark"
      />
    </>
  );
}