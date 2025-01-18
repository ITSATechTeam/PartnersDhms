import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/Loader/Loader'
import axios from "axios";
import apiClient from "../../utils/api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./styleguide.css";
import "./LogIn.css";
import image from "../../img/process-cuate.png";
import image1 from "../../img/google-png-0-1.png";
import { useAuth } from './AuthContext';



// Create axios instance with default config
const api = axios.create({
 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function Login() {
  const { api, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOff, setEyeOff] = useState(true);
  const [isLoader, setLoader] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });
  

  const togglePassword = () => setEyeOff(!eyeOff);

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!email || !password) {
      setSnackbar({
        open: true,
        message: 'Please enter both email and password.',
        severity: 'error'
      });
      setLoader(false);
      return;
    }

    try {
      const response = await api.post('/api/technicianlogin', {
        technicianEmail: email,
        password: password,
      });

      if (response.data.status === 200 || response.data.status === 'success') {
        const tokens = response.data.token || response.data.Token;
        const access = tokens?.access || tokens?.accessToken;
        const refresh = tokens?.refresh || tokens?.refreshToken;

        if (access && refresh) {
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
          setIsAuthenticated(true);

          setSnackbar({
            open: true,
            message: 'Login successful!',
            severity: 'success'
          });

          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.status === 401
        ? 'Invalid email or password.'
        : error.response?.data?.error_message || 'Login failed. Please try again.';
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setLoader(false);
    }
  };
          
    
      

  return (
    <div className="log-in">
      <div>
        <a
          href="https://itservicedeskafrica.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="ITSA-logo"></div>
        </a>
        <img className="process-cuate" src={image} alt="Process Cuate" />
      </div>
      <div>
        <div className="div">
          <div className="frame">
            <div className="text-wrapper">Welcome Back</div>
            <div className="text-wrapper-2">Log into your account</div>
          </div>
          <div className="frame-2">
            <form onSubmit={handleSubmit}>
              <div className="frame-3">
                <div className="frame-wrapper">
                  <div className="frame-4">
                    <label className="label" htmlFor="input-email">
                      Email
                    </label>
                    <div className="frame-5">
                      <input
                        className="input-text"
                        placeholder="Enter your Email"
                        type="email"
                        id="input-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="frame-wrapper">
                  <div className="frame-4">
                    <label className="label" htmlFor="input-password">
                      Password
                    </label>
                    <div className="frame-5">
                      <input
                        className="input-text"
                        placeholder="Enter your password"
                        type={eyeOff ? "password" : "text"}
                        id="input-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        className="eye-off"
                        type="button"
                        onClick={togglePassword}
                      >
                        {/* Add eye icon */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="button" type="submit">
                <div className="button-sample">Log in</div>
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
          </div>
          <div className="overlap-group">
            <div className="social-login">
              <div className="sign-in-with-socials">
                <div className="text-wrapper-4">or</div>
              </div>
              <div className="frame-7">
                <img src={image1} alt="Google" className="google-png" />
                <div className="text-wrapper-5">Login with Google</div>
              </div>
              <p className="don-t-have-an">
                <span>Don’t&nbsp;&nbsp;have an account?</span>
                <a href="/SignUp" className="text-wrapper-7">
                  Create account
                </a>
              </p>
            </div>
            <a href="/ResetPassword" className="text-wrapper-8">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
      <Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={handleSnackbarClose}
    severity={snackbar.severity}
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
{isLoader && <Loader />}
    </div>
  );
}





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import "./styleguide.css";
// import "./LogIn.css";
// import image from "../../img/process-cuate.png";
// import image1 from "../../img/google-png-0-1.png";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("info");
//   const [eyeOff, setEyeOff] = useState(true);

//   const navigate = useNavigate();

//   const togglePassword = () => setEyeOff(!eyeOff);

//   const handleSnackbarClose = () => setSnackbarOpen(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For testing purposes, directly log in any user
//     if (email && password) {
//       navigate("/dashboard");
//       setSnackbarMessage("Login successful!");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//     } else {
//       setSnackbarMessage("Email and Password are required!");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <div className="log-in">
//       <div>
//         <a
//           href="https://itservicedeskafrica.com/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <div className="ITSA-logo"></div>
//         </a>
//         <img className="process-cuate" src={image} alt="Process Cuate" />
//       </div>
//       <div>
//         <div className="div">
//           <div className="frame">
//             <div className="text-wrapper">Welcome Back</div>
//             <div className="text-wrapper-2">Log into your account</div>
//           </div>
//           <div className="frame-2">
//             <form onSubmit={handleSubmit}>
//               <div className="frame-3">
//                 <div className="frame-wrapper">
//                   <div className="frame-4">
//                     <label className="label" htmlFor="input-email">
//                       Email
//                     </label>
//                     <div className="frame-5">
//                       <input
//                         className="input-text"
//                         placeholder="Enter your Email"
//                         type="email"
//                         id="input-email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="frame-wrapper">
//                   <div className="frame-4">
//                     <label className="label" htmlFor="input-password">
//                       Password
//                     </label>
//                     <div className="frame-5">
//                       <input
//                         className="input-text"
//                         placeholder="Enter your password"
//                         type={eyeOff ? "password" : "text"}
//                         id="input-password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         className="eye-off"
//                         type="button"
//                         onClick={togglePassword}
//                       >
//                         {/* Add eye icon */}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="frame-6">
//                   <input
//                     type="checkbox"
//                     id="remember-me"
//                     className="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                   />
//                   <label htmlFor="remember-me" className="text-wrapper-3">
//                     Remember me?
//                   </label>
//                 </div>
//               </div>
//               <button className="button" type="submit">
//                 <div className="button-sample">Log in</div>
//               </button>
//             </form>
//           </div>
//           <div className="overlap-group">
//             <div className="social-login">
//               <div className="sign-in-with-socials">
//                 <div className="text-wrapper-4">or</div>
//               </div>
//               <div className="frame-7">
//                 <img src={image1} alt="Google" className="google-png" />
//                 <div className="text-wrapper-5">Login with Google</div>
//               </div>
//               <p className="don-t-have-an">
//                 <span>Don’t&nbsp;&nbsp;have an account?</span>
//                 <a href="/SignUp" className="text-wrapper-7">
//                   Create account
//                 </a>
//               </p>
//             </div>
//             <a href="/ResetPassword" className="text-wrapper-8">
//               Forgot Password?
//             </a>
//           </div>
//         </div>
//       </div>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }
