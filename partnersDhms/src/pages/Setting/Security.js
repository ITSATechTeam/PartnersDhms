import React, { useState } from "react";
import "./Security.css";

const SecuritySettings = () => {
  const [pins, setPins] = useState({
    newPin: ["", "", "", ""],
    confirmPin: ["", "", "", ""],
    currentPin: ["", "", "", ""],
    updateNewPin: ["", "", "", ""],
    updateConfirmPin: ["", "", "", ""],
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePinChange = (section, index, value) => {
    if (value.length > 1) return;
    const newPins = { ...pins };
    newPins[section][index] = value;
    setPins(newPins);
  };

  const handlePasswordChange = (field, value) => {
    setPasswords({ ...passwords, [field]: value });
  };

  return (
    <div className="security-settings1">
      <div className="tabs">
         <a href="/settings" className="active">
            Account Setting
          </a>
          <a href="/security">Security</a>
          <a href="/notifications">Notifications</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/legal">Legal</a>
      </div>

      <div className="sets">
      <div>
<h4 className="set1">Change Password</h4>
</div>
<div className="password-section1">
        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            placeholder="Enter Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              handlePasswordChange("currentPassword", e.target.value)
            }
          />
        </div>

        <div className="input-group1">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
          />
        </div>

        <div className="input-group1">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              handlePasswordChange("confirmPassword", e.target.value)
            }
          />
        </div>
      </div>
      </div>

   
      <div className="sets">
        <div>
          <h4 className="set1">Create Wallet PIN</h4>
        </div>
        <div className="wallet-section2">
          <div className="pin-group1">
            <label>Enter New PIN</label>
            <div className="pin-inputs1">
              {pins.newPin.map((pin, index) => (
                <input
                  key={index}
                  type="password"
                  maxLength="1"
                  value={pin}
                  onChange={(e) =>
                    handlePinChange("newPin", index, e.target.value)
                  }
                />
              ))}
            </div>
          </div>

          <div className="pin-group1">
            <label>Confirm New PIN</label>
            <div className="pin-inputs1">
              {pins.confirmPin.map((pin, index) => (
                <input
                  key={index}
                  type="password"
                  maxLength="1"
                  value={pin}
                  onChange={(e) =>
                    handlePinChange("confirmPin", index, e.target.value)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sets">
      <div >
<h4 className="set1">Update Wallet PIN</h4>
</div>
<div className="wallet-section">
        <div>
          
        </div>
        <div>
          <div className="pin-group">
            <label>Current PIN</label>
            <div className="pin-inputs">
              {pins.currentPin.map((pin, index) => (
                <input
                  key={index}
                  type="password"
                  maxLength="1"
                  value={pin}
                  onChange={(e) =>
                    handlePinChange("currentPin", index, e.target.value)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pin-group">
          <label>Enter New PIN</label>
          <div className="pin-inputs">
            {pins.updateNewPin.map((pin, index) => (
              <input
                key={index}
                type="password"
                maxLength="1"
                value={pin}
                onChange={(e) =>
                  handlePinChange("updateNewPin", index, e.target.value)
                }
              />
            ))}
          </div>
        </div>

        <div className="pin-group">
          <label>Confirm New PIN</label>
          <div className="pin-inputs">
            {pins.updateConfirmPin.map((pin, index) => (
              <input
                key={index}
                type="password"
                maxLength="1"
                value={pin}
                onChange={(e) =>
                  handlePinChange("updateConfirmPin", index, e.target.value)
                }
              />
            ))}
          </div>
        </div>
      </div>

      </div>

     

      <div className="button-group">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default SecuritySettings;
