import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './pages/Login/AuthContext';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import MaintenanceRequest from './pages/MaintenanceRequest/MaintenanceRequest';
import PartsManagement from './pages/PartsManagement/PartsManagement';
import Dashboard from './pages/home/Dashboard';
import Rightbar from './pages/right/Rightbar';
import RightbarTwo from './pages/right/RightbarTwo';
import RightbarThree from './pages/right/RightbarThree';
import Wallet from './pages/Wallet/Wallet';
import Help from './pages/HelpSupport/HelpSupport';
import Setting from './pages/Setting/Setting';
import FAQs from './pages/FAQs/FAQ';
import Loader from './components/Loader/Loader';
import LogIn from './pages/Login/LogIn';
import SignUp from './pages/signup/SignUp';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { AuthProvider } from './pages/Login/AuthContext';
import './app.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Public Route Component (prevents authenticated users from accessing auth pages)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Trigger loading animation on initial load and route changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timeout);
  }, [location]);

  // Define routes for authentication
  const authRoutes = ['/', '/SignUp', '/ResetPassword'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  // Define routes that should hide the right sidebar
  const noRightbarRoutes = [
    '/MaintenanceRequest',
    '/PartsManagement',
    '/wallet',
    '/help',
    '/settings',
    '/faqs',
  ];
  const showRightbars = !noRightbarRoutes.includes(location.pathname) && !isAuthRoute;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="appContainer">
      {isAuthenticated && !isAuthRoute && <Topbar />}
      <div className="container">
        {isAuthenticated && !isAuthRoute && <Sidebar />}
        <div className="contentWrapper">
          <div className="mainContent1">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <LogIn />
                  </PublicRoute>
                }
              />
              <Route
                path="/SignUp"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="/ResetPassword"
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/MaintenanceRequest"
                element={
                  <ProtectedRoute>
                    <MaintenanceRequest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/PartsManagement"
                element={
                  <ProtectedRoute>
                    <PartsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/help"
                element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faqs"
                element={
                  <ProtectedRoute>
                    <FAQs />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route - redirect to dashboard if authenticated, login if not */}
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </div>

          {/* Conditional rendering of Rightbars */}
          {showRightbars && isAuthenticated && (
            <div className="Rightbars">
              <Rightbar percentage={90} />
              <RightbarTwo />
              <RightbarThree />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;




