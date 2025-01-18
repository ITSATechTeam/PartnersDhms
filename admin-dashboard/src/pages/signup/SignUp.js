import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./SignUp.css";
import image from "../../img/printed-circuit-board-rafiki0.svg";
import image1 from "../../img/i-tsda-logo-10.png";

const PasswordRequirement = ({ fulfilled, label }) => (
  <div className="password-requirement">
    <Checkbox
      checked={fulfilled}
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{
        color: "#ececec",
        "&.Mui-checked": {
          color: "#2a66b0",
        },
        padding: "4px",
      }}
      disabled
    />
    <span className={`requirement-label ${fulfilled ? "fulfilled" : ""}`}>
      {label}
    </span>
  </div>
);

export default function Signup() {
  const navigate = useNavigate();
  const { api } = useAuth();

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
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const passwordRequirements = [
    {
      key: "min8Chars",
      label: "Minimum of 8 characters",
      fulfilled: passwordCriteria.min8Chars,
    },
    {
      key: "hasUppercase",
      label: "One uppercase letter",
      fulfilled: passwordCriteria.hasUppercase,
    },
    {
      key: "hasNumber",
      label: "One number",
      fulfilled: passwordCriteria.hasNumber,
    },
    {
      key: "hasSpecialChar",
      label: "One special character",
      fulfilled: passwordCriteria.hasSpecialChar,
    },
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
    const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
    setCheckmark(allCriteriaMet);
  }, [passwordCriteria]);

  const handlePasswordFocus = () => {
    setShowPasswordCriteria(true);
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      setShowPasswordCriteria(false);
    }
  };

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

    // Validate phone number format
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(technicianPhoneNumber)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid 11-digit phone number.",
        severity: "error",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(technicianEmail)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
      return;
    }

    const technicianData = {
      technicianEmail: "frank@gmail.com",
      technicianName: "string",
      technicianPhoneNumber: "09127980346",
      technicianAvailability: "Ful_lTime",
      technicianLocation: "string",
      password: "string",
    };

    setLoader(true);

    try {
      const response = await api.post(
        "/api/registertechnician",
        technicianData
      );

      if (response.data.status === 200 || response.data.status === "success") {
        setSnackbar({
          open: true,
          message:
            "Technical partner profile created successfully! Redirecting to login...",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      const errorMessage = error.response?.data?.error_message;
      const formattedError =
        typeof errorMessage === "object"
          ? Object.values(errorMessage).join("\n")
          : errorMessage || "Registration failed. Please try again.";

      setSnackbar({
        open: true,
        message: formattedError,
        severity: "error",
      });
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
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "4px",
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
                  onChange={() => setCheckmark(!checkmark)}
                  required
                />
                <label htmlFor="terms" className="terms-label">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                className="button"
                type="submit"
                disabled={!checkmark || loader}
              >
                <div className="button-sample">
                  {loader ? "Creating Account..." : "Create Account"}
                </div>
              </button>

              <div className="login-link">
                Already have an account? <a href="/">Login here</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
