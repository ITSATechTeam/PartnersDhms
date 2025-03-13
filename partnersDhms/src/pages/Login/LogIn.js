import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./styleguide.css";
import "./LogIn.css";
import image from "../../img/process-cuate.png";
import image1 from "../../img/google-png-0-1.png";

const loginTechnician = async (technicianEmail, password) => {
  try {
    const response = await fetch("/api/technicianlogin", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ technicianEmail, password }),
    });

    const data = await response.json();
    console.log("API Response:", data); // Log the entire response

    if (data.code === 403) {
      return {
        success: false,
        message: data.message || "Permission denied. Check your credentials or user role.",
        code: data.code,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error: ${response.status} ${response.statusText}`,
        code: response.status,
      };
    }

    if (data.Token?.access) {
      localStorage.setItem("accessToken", data.Token.access);
    }
    if (data.Token?.refresh) {
      localStorage.setItem("refreshToken", data.Token.refresh);
    }

    return {
      success: true,
      message: data.message || "Login successful!",
      data: data.data,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network or server error. Please try again later.",
      code: 500,
    };
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [eyeOff, setEyeOff] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => setEyeOff(!eyeOff);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Basic validation
      if (!email || !password) {
        setSnackbarMessage("Email and Password are required!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
  
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setSnackbarMessage("Please enter a valid email address");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
  
      // Attempt login with the updated parameters
      const loginResponse = await loginTechnician(email, password);
  
      // Check if login was successful based on the response
      if (!loginResponse.success) {
        // Handle the error from the API response
        setSnackbarMessage(loginResponse.message || "Login failed. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
  
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
  
      // Store user email if available
      if (loginResponse.data?.technicianEmail) {
        localStorage.setItem("userEmail", loginResponse.data.technicianEmail);
      }
  
      setSnackbarMessage(loginResponse.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      // Short delay before navigation to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
  
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage("An unexpected error occurred. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }

    // Clear any existing tokens on mount
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  return (
    <div className="log-in">
      <div>
        <a href="https://itservicedeskafrica.com/" target="_blank" rel="noreferrer">
          <div className="ITSA-logo"></div>
        </a>
      </div>
      <div className="Second">
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
                        disabled={loading}
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
                        disabled={loading}
                      />
                      <IconButton
                        onClick={togglePassword}
                        disabled={loading}
                        style={{
                          position: "absolute",
                          right: "35px",
                          top: "53%",
                          transform: "translateY(-100%)",
                        }}
                      >
                        {eyeOff ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="frame-6">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <label htmlFor="remember-me" className="text-wrapper-3">
                    Remember me?
                  </label>
                </div>
              </div>
              <button className="button" type="submit" disabled={loading}>
                <div className="button-sample">
                  {loading ? "Logging in..." : "Log in"}
                </div>
              </button>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <a href="/ResetPassword" className="text-wrapper-8">
                  Forgot Password?
                </a>
              </div>
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
                <span>Don't&nbsp;&nbsp;have an account?</span>
                <a href="/SignUp" className="text-wrapper-7">
                  Create account
                </a>
              </p>
            </div>
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
    </div>
  );
}