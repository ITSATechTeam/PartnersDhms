import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from '../../components/Loader/Loader'
import axios from "axios";
import apiClient from "../../utils/api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./styleguide.css";
import "./LogIn.css";
import image from "../../img/process-cuate.png";
import image1 from "../../img/google-png-0-1.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eyeOff, setEyeOff] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [isLoader, setLoader] = useState(false);

  const togglePassword = () => setEyeOff(!eyeOff);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    setLoader(true);

    try {
      // Use the correct endpoint based on the environment
      const baseURL =
        process.env.NODE_ENV === "development"
          ? "/api/technicianlogin"
          : "https://dhms.itservicedeskafrica.com/api/technicianlogin"; // Replace with your production URL

          try {
            const response = await apiClient.post("/technicianlogin", {
              technicianEmail: email,
              password: password,
            });
          
            // Check if the response is successful
            if (response.status === 200 && response.data.status === 200) {
              // Extract and save the access token
              const accessToken = response.data.Token?.access || response.data.token?.access || "";
              if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
              } else {
                throw new Error("Failed to retrieve access token.");
              }
          
              // Show success message
              setSnackbarMessage("Login successful!");
              setSnackbarSeverity("success");
          
              // Redirect to the dashboard
              window.location = "/dashboard";
            } else {
              // Handle unsuccessful login
              throw new Error(
                response.data.message || "Invalid email or password. Please try again."
              );
            }
          } catch (error) { // Ensure 'error' is defined here
            // Log the error for debugging
            console.error("Login error:", error);
          
            // Show error message
            setSnackbarMessage(error.message || "An unexpected error occurred.");
            setSnackbarSeverity("error");
          } finally {
            setLoader(false); // Stop the loader
          }
          
          
    
      // setSnackbarMessage(error.response?.data?.message || "Login failed. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setLoader(false);
      setSnackbarOpen(true);
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {isLoader && <div className="loader">{loader}</div>}
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
