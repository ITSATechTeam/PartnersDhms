import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider } from './components/sidebar/SidebarContext';
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
import Security from '../src/pages/Setting/Security';


import './app.css';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Simple loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location]);

  // Routes configuration
  const noRightbarRoutes = [
    '/MaintenanceRequest',
    '/PartsManagement',
    '/wallet',
    '/help',
    '/settings',
    '/faqs',
    '/security'
  ];
  const authRoutes = ['/', '/SignUp', '/ResetPassword'];
  
  const isAuthRoute = authRoutes.includes(location.pathname);
  const showRightbars = !noRightbarRoutes.includes(location.pathname) && !isAuthRoute;

  if (loading) return <Loader />;

  return (
    <div className="appContainer">
      {!isAuthRoute && <Topbar />}
      <div className="container">
        {!isAuthRoute && <Sidebar />}
        <div className="contentWrapper">
          <div className="mainContent1">
            <Routes>
              {/* Auth Routes */}
              <Route path="/" element={<LogIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />

              {/* Main Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/MaintenanceRequest" element={<MaintenanceRequest />} />
              <Route path="/PartsManagement" element={<PartsManagement />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/security" element={<Security />} />

              {/* Default Route */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>

          {showRightbars && (
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

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </Router>
  );
}

export default App;