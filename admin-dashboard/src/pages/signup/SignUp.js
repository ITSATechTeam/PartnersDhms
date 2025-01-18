import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import "./SignUp.css";
import image from "../../img/printed-circuit-board-rafiki0.svg";
import image1 from "../../img/i-tsda-logo-10.png";
import apiClient from "../../utils/api";

const PasswordRequirement = ({ fulfilled, label }) => (
  <div className="password-requirement">
    <Checkbox
      checked={fulfilled}
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{
        color: '#ececec',
        '&.Mui-checked': {
          color: '#2a66b0',
        },
        padding: '4px',
      }}
      disabled
    />
    <span className={`requirement-label ${fulfilled ? 'fulfilled' : ''}`}>
      {label}
    </span>
  </div>
);

export default function Signup() {
  const navigate = useNavigate();

  // State variables
  const [technicianName, setTechnicianName] = useState("");
  const [technicianEmail, setTechnicianEmail] = useState("");
  const [technicianPhoneNumber, setTechnicianPhoneNumber] = useState("");
  const [technicianAvailability, setTechnicianAvailability] = useState("");
  const [technicianLocation, setTechnicianLocation] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkmark, setCheckmark] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    min8Chars: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", 
    "Imo", "Jigawa", "Kaduna", "Kano", "Kogi", "Kwara", "Lagos", "Nasarawa", 
    "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
    "Taraba", "Yobe", "Zamfara"
  ];

  const passwordRequirements = [
    {
      key: 'min8Chars',
      label: 'Minimum of 8 characters',
      fulfilled: passwordCriteria.min8Chars
    },
    {
      key: 'hasUppercase',
      label: 'One uppercase letter',
      fulfilled: passwordCriteria.hasUppercase
    },
    {
      key: 'hasNumber',
      label: 'One number',
      fulfilled: passwordCriteria.hasNumber
    },
    {
      key: 'hasSpecialChar',
      label: 'One special character',
      fulfilled: passwordCriteria.hasSpecialChar
    }
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPassword = (password) => {
    setPassword(password);
    setPasswordCriteria({
      min8Chars: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()+=._-]/.test(password),
    });
  };

  useEffect(() => {
    const allCriteriaMet =
      passwordCriteria.min8Chars &&
      passwordCriteria.hasUppercase &&
      passwordCriteria.hasNumber &&
      passwordCriteria.hasSpecialChar;

    if (allCriteriaMet) {
      setCheckmark(true);
    }
  }, [passwordCriteria]);

  const toggleCheckmark = () => {
    setCheckmark(!checkmark);
  };

  const handlePasswordFocus = () => {
    setShowPasswordCriteria(true);
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      setShowPasswordCriteria(false);
    }
  };

  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post("/api/refreshtoken", {
            refresh_token: refreshToken,
          });

          if (response.data.access) {
            localStorage.setItem("accessToken", response.data.access);
            api.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
            originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );

  const createAccount = async (e) => {
    e.preventDefault();

    if (
      !technicianName ||
      !technicianEmail ||
      !technicianPhoneNumber ||
      !technicianAvailability ||
      !technicianLocation ||
      !password
    ) {
      setSnackbar({
        open: true,
        message: "Please fill out all required fields.",
        severity: "error",
      });
      return;
    }

    const technicianData = {
      technicianEmail,
      technicianName,
      technicianPhoneNumber,
      technicianAvailability,
      technicianLocation,
      password,
    };

    setLoader(true);

    try {
      const response = await api.post("/api/registertechnician", technicianData);

      if (response.data.status === 200 || response.data.status === "success") {
        const tokens = response.data.token || response.data.Token;
        const access = tokens?.access || tokens?.accessToken;
        const refresh = tokens?.refresh || tokens?.refreshToken;

        if (access && refresh) {
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        }

        setSnackbar({
          open: true,
          message: "Technical partner profile created successfully!",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.status === 400) {
        const errorMessage = error.response.data.error_message;
        const formattedError =
          typeof errorMessage === "object"
            ? Object.keys(errorMessage)
                .map((key) => `${key}: ${errorMessage[key]}`)
                .join("\n")
            : errorMessage;

        setSnackbar({
          open: true,
          message: `Validation Error:\n${formattedError}`,
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: error.message || "An unexpected error occurred. Please try again.",
          severity: "error",
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="sign-up">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="itsa-logo">
        <img className="i-tsda-logo-1" src={image1} alt="Logo" />
        <div className="close">
          <div className="welcome">Welcome!</div>
          <img
            className="printed-circuit-board-rafiki"
            src={image}
            alt="Rafiki"
          />
          <div className="paragraph">
            Become part of a dynamic network where your skills keep devices in
            top shape. Sign up to simplify your workflow and make every repair
            count. Let's power the future, one device at a time.
          </div>
        </div>
      </div>

      <div className="sign-up2">
        <div className="sign-up3">
          <div className="frame-1000005957">
            <div className="create-your-account">Create your account</div>
          </div>
          <form onSubmit={createAccount}>
            <div className="frame-1000005955">
              <div className="frame-11939">
                <div className="label">Technician Name</div>
                <input
                  type="text"
                  id="technician-name"
                  className="input-text"
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  required
                />
              </div>
              <div className="frame-11941">
                <div className="label">Email</div>
                <input
                  type="email"
                  id="technician-email"
                  className="input-text"
                  value={technicianEmail}
                  onChange={(e) => setTechnicianEmail(e.target.value)}
                  required
                />
              </div>
              <div className="frame-427319282">
                <div className="label">Phone No.</div>
                <input
                  type="tel"
                  id="technician-phone"
                  className="input-text"
                  value={technicianPhoneNumber}
                  onChange={(e) => setTechnicianPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="frame-11943">
                <div className="label">Location</div>
                <select
                  id="technician-location"
                  className="input-text"
                  value={technicianLocation}
                  onChange={(e) => setTechnicianLocation(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="frame-11943">
                <div className="label">Availability</div>
                <select
                  id="availability"
                  className="input-text"
                  value={technicianAvailability}
                  onChange={(e) => setTechnicianAvailability(e.target.value)}
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
              <div className="frame-1194">
                <div className="frame-11937">
                  <div className="label">Password</div>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="input-text"
                      value={password}
                      onChange={(e) => checkPassword(e.target.value)}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      required
                    />
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '4px'
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                </div>
              </div>
              
              {password.length > 0 && (
                <div className="password-requirements-container">
                  <div className="requirements-title">
                    Your password must include at least
                  </div>
                  <div className="requirements-list">
                    {passwordRequirements.map((requirement) => (
                      <PasswordRequirement
                        key={requirement.key}
                        fulfilled={requirement.fulfilled}
                        label={requirement.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="frame-11943">
                <input
                  type="checkbox"
                  id="terms"
                  checked={checkmark}
                  onChange={toggleCheckmark}
                  required
                />
                <label htmlFor="terms">
                  I agree to the terms and conditions
                </label>
              </div>
              <button className="button" type="submit">
                <div className="button-sample">Create Account</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
