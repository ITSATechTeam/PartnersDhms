import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./styleguide.css";
// import "./style.css";
import "./LogIn.css";
import image from "../../img/process-cuate.png";
import image1 from "../../img/google-png-0-1.png";

export default function Login() {
  // State variables for form inputs and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eyeOff, setEyeOff] = useState(true);

  // Snackbar state for feedback messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle password visibility toggle
  const togglePassword = () => {
    setEyeOff(!eyeOff);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API request with dynamic email and password
      const response = await axios.post(
        "/api/technicianlogin",
        {
          technicianEmail: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      // Check if login was successful
      if (response.status === 200 && response.data.status === 200) {
        // Save the access token if needed
        const accessToken = response.data.Token.access;
        localStorage.setItem("accessToken", accessToken);

        // Redirect to the dashboard
        navigate("/dashboard");
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
      } else {
        setErrorMessage("Invalid email or password");
        setSnackbarMessage("Invalid email or password");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
      setSnackbarMessage("An error occurred during login.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Open Snackbar regardless of success or error
    }
  };

  return (
    <div className='log-in'>
      <div>
        <a
          href='https://itservicedeskafrica.com/'
          target='_blank'
          rel='noreferrer'
        >
          <div className='ITSA-logo'></div>
        </a>
        <img className='process-cuate' src={image} alt='Process Cuate' />
      </div>
      <div>
        <div className='div'>
          <div className='frame'>
            <div className='text-wrapper'>Welcome Back</div>
            <div className='text-wrapper-2'>Log into your account</div>
          </div>
          <div className='frame-2'>
            <form onSubmit={handleSubmit}>
              <div className='frame-3'>
                <div className='frame-wrapper'>
                  <div className='frame-4'>
                    <label className='label' htmlFor='input-email'>
                      Email
                    </label>
                    <div className='frame-5'>
                      <input
                        className='input-text'
                        placeholder='Enter your Email'
                        type='email'
                        id='input-email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className='frame-wrapper'>
                  <div className='frame-4'>
                    <label className='label' htmlFor='input-password'>
                      Password
                    </label>
                    <div className='frame-5'>
                      <input
                        className='input-text'
                        placeholder='Enter your password'
                        type={eyeOff ? "password" : "text"}
                        id='input-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        className='eye-off'
                        type='button'
                        onClick={togglePassword}
                      >
                        {/* You can use an icon for the eye visibility */}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='frame-6'>
                  <input
                    type='checkbox'
                    id='remember-me'
                    className='checkbox'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor='remember-me' className='text-wrapper-3'>
                    Remember me?
                  </label>
                </div>
              </div>
              <button className='button' type='submit'>
                <div className='button-sample'>Log in</div>
              </button>
              {errorMessage && (
                <div className='error-message'>{errorMessage}</div>
              )}
            </form>
          </div>
          <div className='overlap-group'>
            <div className='social-login'>
              <div className='sign-in-with-socials'>
                <div className='text-wrapper-4'>or</div>
              </div>
              <div className='frame-7'>
                <img src={image1} alt='Google' className='google-png' />
                <div className='text-wrapper-5'>Login with Google</div>
              </div>
              <p className='don-t-have-an'>
                <span>Don’t&nbsp;&nbsp;have an account?</span>
                <a href='/SignUp' className='text-wrapper-7'>
                  Create account
                </a>
              </p>
            </div>
            <a href='/ResetPassword' className='text-wrapper-8'>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      {/* Snackbar for displaying login feedback */}
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
    </div>
  );
}
