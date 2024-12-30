import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './components/auth/LoginPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TutorDashboard from './components/dashboard/TutorDashboard';
import ParentDashboard from './components/dashboard/ParentDashboard';
import Hero from './components/Hero';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <AuthGuard allowedRoles={['admin']}>
                <DashboardLayout userRole="admin">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                  </Routes>
                </DashboardLayout>
              </AuthGuard>
            }
          />

          {/* Tutor routes */}
          <Route
            path="/tutor/*"
            element={
              <AuthGuard allowedRoles={['tutor']}>
                <DashboardLayout userRole="tutor">
                  <Routes>
                    <Route path="/" element={<TutorDashboard />} />
                  </Routes>
                </DashboardLayout>
              </AuthGuard>
            }
          />

          {/* Parent routes */}
          <Route
            path="/parent/*"
            element={
              <AuthGuard allowedRoles={['parent']}>
                <DashboardLayout userRole="parent">
                  <Routes>
                    <Route path="/" element={<ParentDashboard />} />
                  </Routes>
                </DashboardLayout>
              </AuthGuard>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;