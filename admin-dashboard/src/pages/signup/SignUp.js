import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./SignUp.css";
import image from "../../img/printed-circuit-board-rafiki0.svg";
import image1 from "../../img/i-tsda-logo-10.png";
import image2 from "../../img/check0.svg";
import image3 from "../../img/fi-eye-off0.svg";

export default function Signup() {
  // Initialize the navigate function
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
  const [passwordCriteria, setPasswordCriteria] = useState({
    min8Chars: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);

  // Snackbar state for Material-UI alerts
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // List of states in Nigeria
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

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check password strength
  const checkPassword = (password) => {
    setPassword(password);
    setPasswordCriteria({
      min8Chars: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()+=._-]/.test(password),
    });
  };

  // Automatically check the checkbox when all password criteria are met
  useEffect(() => {
    const allCriteriaMet =
      passwordCriteria.min8Chars &&
      passwordCriteria.hasUppercase &&
      passwordCriteria.hasNumber &&
      passwordCriteria.hasSpecialChar;

    if (allCriteriaMet) {
      setCheckmark(true); // Automatically check the checkbox
    }
  }, [passwordCriteria]);

  // Toggle the checkbox manually
  const toggleCheckmark = () => {
    setCheckmark(!checkmark);
  };

  // Show password criteria when password input is focused
  const handlePasswordFocus = () => {
    setShowPasswordCriteria(true);
  };

  // Hide password criteria when password input is blurred
  const handlePasswordBlur = () => {
    if (password.length === 0) {
      setShowPasswordCriteria(false);
    }
  };

  // Handle form submission
  const createAccount = async (e) => {
    e.preventDefault();

    // Basic validation to prevent sending null or empty fields
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

    try {
      // Send all fields, even if some are optional
      const response = await axios.post("/api/registertechnician", {
        technicianEmail: "u@example.com",
        technicianName: "string",
        technicianPhoneNumber: "07066128900",
        technicianAvailability: "Ful_lTime",
        technicianLocation: "string",
        password: "string",
      });

      if (response.status === 200) {
        const { message } = response.data;

        if (message === "Technical partner profile created successfull.") {
          setSnackbar({
            open: true,
            message: "Technical partner profile created successfully.",
            severity: "success",
          });
          setTimeout(() => navigate("/"), 1500);
        } else {
          console.error("API response:", response.data);
          setSnackbar({
            open: true,
            message:
              "Account creation failed! Please check your input or try again later.",
            severity: "error",
          });
        }
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (error.response && error.response.data) {
        // Check for specific error messages based on API response
        const errorData = error.response.data.error_message;
        if (errorData) {
          // Prioritize messages from the backend response if available
          if (errorData.required) {
            errorMessage = "A required field is missing.";
          } else if (errorData.null) {
            errorMessage = "A field cannot be null.";
          } else if (errorData.invalid) {
            errorMessage = `Invalid data provided: ${errorData.invalid.replace(
              "{datatype}",
              typeof errorData.invalid
            )}`;
          } else {
            errorMessage =
              error.response.data.message || "Account creation failed!";
          }
        } else {
          errorMessage =
            error.response.data.message || "Account creation failed!";
        }
      } else if (error.request) {
        errorMessage = "No response from the server. Please try again later.";
      }
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className='sign-up'>
      {/* Snackbar for notifications */}
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

      <div className='itsa-logo'>
        <img className='i-tsda-logo-1' src={image1} alt='Logo' />
        <div className='close'>
          <div className='welcome'>Welcome!</div>
          <img
            className='printed-circuit-board-rafiki'
            src={image}
            alt='Rafiki'
          />
          <div className='paragraph'>
            Become part of a dynamic network where your skills keep devices in
            top shape. Sign up to simplify your workflow and make every repair
            count. Let's power the future, one device at a time.
          </div>
        </div>
      </div>

      <div className='sign-up2'>
        <div className='sign-up3'>
          <div className='frame-1000005957'>
            <div className='create-your-account'>Create your account</div>
          </div>
          <form onSubmit={createAccount}>
            <div className='frame-1000005955'>
              <div className='frame-11939'>
                <div className='label'>Technician Name</div>
                <input
                  type='text'
                  id='technician-name'
                  className='input-text'
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  required
                />
              </div>
              <div className='frame-11941'>
                <div className='label'>Email</div>
                <input
                  type='email'
                  id='technician-email'
                  className='input-text'
                  value={technicianEmail}
                  onChange={(e) => setTechnicianEmail(e.target.value)}
                  required
                />
              </div>
              <div className='frame-427319282'>
                <div className='label'>Phone No.</div>
                <input
                  type='tel'
                  id='technician-phone'
                  className='input-text'
                  value={technicianPhoneNumber}
                  onChange={(e) => setTechnicianPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className='frame-11943'>
                <div className='label'>Location</div>
                <select
                  id='technician-location'
                  className='input-text'
                  value={technicianLocation}
                  onChange={(e) => setTechnicianLocation(e.target.value)}
                  required
                >
                  <option value=''>Select Location</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className='frame-11943'>
                <div className='label'>Availability</div>
                <select
                  id='availability'
                  className='input-text'
                  value={technicianAvailability}
                  onChange={(e) => setTechnicianAvailability(e.target.value)}
                  required
                >
                  <option value=''>Select Availability</option>
                  <option value='Full-time'>Full-time</option>
                  <option value='Part-time'>Part-time</option>
                </select>
              </div>
              <div className='frame-1194'>
                <div className='frame-11937'>
                  <div className='label2'>Password</div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    className='input-text'
                    value={password}
                    onChange={(e) => checkPassword(e.target.value)}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    required
                  />
                  <div className='eye-off' onClick={togglePasswordVisibility}>
                    <img
                      className='fi-eye-off'
                      src={image3}
                      alt='Toggle password visibility'
                    />
                  </div>
                </div>
              </div>
              <div
                className={`frame-1000006009 ${
                  password.length > 0 ? "active" : ""
                }`}
              >
                <div className='your-password-must-include-at-least'>
                  Your password must include at least
                </div>
                <div className='frame-1000006007'>
                  <div className='component-17'>
                    <div
                      className={`component-16 ${
                        passwordCriteria.min8Chars ? "active" : ""
                      }`}
                      id='min-8-characters'
                    >
                      <div className='ellipse-986'></div>
                      <img className='check' src={image2} alt='check' />
                    </div>
                    <div className='at-least-8-characters-long'>
                      Minimum of 8 characters
                    </div>
                  </div>
                  <div className='component-18'>
                    <div
                      className={`component-16 ${
                        passwordCriteria.hasUppercase ? "active" : ""
                      }`}
                      id='uppercase-letter'
                    >
                      <div className='ellipse-986'></div>
                      <img className='check2' src={image2} alt='check' />
                    </div>
                    <div className='at-least-8-characters-long'>
                      <span>One uppercase letter</span>
                    </div>
                  </div>
                  <div className='component-20'>
                    <div
                      className={`component-16 ${
                        passwordCriteria.hasNumber ? "active" : ""
                      }`}
                      id='one-number'
                    >
                      <div className='ellipse-9862'></div>
                      <img className='check3' src={image2} alt='check' />
                    </div>
                    <div className='at-least-8-characters-long2'>
                      One number
                    </div>
                  </div>
                  <div className='component-21'>
                    <div
                      className={`component-16 ${
                        passwordCriteria.hasSpecialChar ? "active" : ""
                      }`}
                      id='special-char'
                    >
                      <div className='ellipse-986'></div>
                      <img className='check4' src={image2} alt='check' />
                    </div>
                    <div className='at-least-8-characters-long3'>
                      One special character
                    </div>
                  </div>
                </div>
              </div>
              <div className='frame-11943'>
                <input
                  type='checkbox'
                  id='terms'
                  checked={checkmark}
                  onChange={toggleCheckmark}
                  required
                />
                <label htmlFor='terms'>
                  I agree to the terms and conditions
                </label>
              </div>
              <button className='button' type='submit'>
                <div className='button-sample'>Create Account</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
