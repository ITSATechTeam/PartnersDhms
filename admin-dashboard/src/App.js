import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import './app.css';

function App() {
  return (
    <Router>
      <div>
        <RoutesWithLayout />
      </div>
    </Router>
  );
}

function RoutesWithLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Trigger loading animation on initial load and route changes
  useEffect(() => {
    setLoading(true);
    // Wait until next render cycle to remove loading state
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

  return (
    <div className="appContainer">
      {/* Show loader on loading state */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isAuthRoute && <Topbar />}
          <div className="container">
            {!isAuthRoute && <Sidebar />}
            <div className="contentWrapper">
              <div className="mainContent1">
                <Routes>
                  {/* Authentication routes */}
                  <Route path="/" element={<LogIn />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/ResetPassword" element={<ResetPassword />} />

                  {/* Main app routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/MaintenanceRequest" element={<MaintenanceRequest />} />
                  <Route path="/PartsManagement" element={<PartsManagement />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/settings" element={<Setting />} />
                  <Route path="/faqs" element={<FAQs />} />
                  {/* Add additional routes as needed */}
                </Routes>
              </div>

              {/* Conditional rendering of Rightbars */}
              {showRightbars && (
                <div className="Rightbars">
                  <Rightbar percentage={90} />
                  <RightbarTwo />
                  <RightbarThree />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;





