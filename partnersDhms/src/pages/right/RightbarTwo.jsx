

// import './rightbarTwo.css';

// const RightbarTwo = ({ progress }) => {
//   return (
//     <div className="topissues">
//       <div className="issues">Top Issues</div>
//       <div className="matter">
//         {/* Facebook Progress Bar */}
//         <div className="progress-container">
//           <div className="label">Screen Reports</div>
//           <div className="progress-bar screen-report">
//             <div
//               className="progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <div className="label labelx">20%</div>
//         </div>

//         {/* WhatsApp Progress Bar with Reduced Width */}
//         <div className="progress-container">
//           <div className="label whatsapp">Battery Issues</div>
//           <div className="progress-bar battery-issue">
//             <div
//               className="progress-fill whatsapp-progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <div className="label labelx">50%</div>
//         </div>

//         <div className="progress-container">
//           <div className="label whatsapp">Keyboard Issues</div>
//           <div className="progress-bar  keyboard-issue">
//             <div
//               className="progress-fill whatsapp-progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <div className="label labelx">30%</div>
//         </div>

//         <div className="progress-container">
//           <div className="label whatsapp">Motherboard Issues</div>
//           <div className="progress-bar motherboard-issue">
//             <div
//               className="progress-fill whatsapp-progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <div className="label labelx">10%</div>
//         </div>

//         <div className="progress-container">
//           <div className="label maintenance">Maintenance Issues</div>
//           <div className="progress-bar maintenance-issue">
//             <div
//               className="progress-fill maintenance-progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <div className="label labelx">10%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightbarTwo;


import React, { useEffect, useState } from 'react';
import './rightbarTwo.css';

const RightbarTwo = () => {
  const [progressData, setProgressData] = useState({
    screenReports: 0,
    batteryIssues: 0,
    keyboardIssues: 0,
    motherboardIssues: 0,
    maintenanceIssues: 0,
  });
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch data from the API
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("accessToken");
    
        if (!token) {
          throw new Error("No access token found. Please log in again.");
        }
    
        const response = await fetch("https://dhms.itservicedeskafrica.com/api/getmaintenancetyperate", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Use the stored token securely
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch progress data: ${response.statusText}`);
        }
    
        const data = await response.json();
    
        setProgressData({
          screenReports: data.screenReports || 0,
          batteryIssues: data.batteryIssues || 0,
          keyboardIssues: data.keyboardIssues || 0,
          motherboardIssues: data.motherboardIssues || 0,
          maintenanceIssues: data.maintenanceIssues || 0,
        });
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProgressData(); // Fetch data when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="topissues">
      <div className="issues"> Top Issues</div>
      <div className="matter">
        {/* Screen Reports Progress Bar */}
        <div className="progress-container">
          <div className="label">Screen Reports</div>
          <div className="progress-bar screen-report">
            <div
              className="progress-fill"
              style={{ width: `${progressData.screenReports}%` }}
            />
          </div>
          <div className="label labelx">{`${progressData.screenReports}%`}</div>
        </div>

        {/* Battery Issues Progress Bar */}
        <div className="progress-container">
          <div className="label whatsapp">Battery Issues</div>
          <div className="progress-bar battery-issue">
            <div
              className="progress-fill whatsapp-progress-fill"
              style={{ width: `${progressData.batteryIssues}%` }}
            />
          </div>
          <div className="label labelx">{`${progressData.batteryIssues}%`}</div>
        </div>

        {/* Keyboard Issues Progress Bar */}
        <div className="progress-container">
          <div className="label whatsapp">Keyboard Issues</div>
          <div className="progress-bar keyboard-issue">
            <div
              className="progress-fill whatsapp-progress-fill"
              style={{ width: `${progressData.keyboardIssues}%` }}
            />
          </div>
          <div className="label labelx">{`${progressData.keyboardIssues}%`}</div>
        </div>

        {/* Motherboard Issues Progress Bar */}
        <div className="progress-container">
          <div className="label whatsapp">Motherboard Issues</div>
          <div className="progress-bar motherboard-issue">
            <div
              className="progress-fill whatsapp-progress-fill"
              style={{ width: `${progressData.motherboardIssues}%` }}
            />
          </div>
          <div className="label labelx">{`${progressData.motherboardIssues}%`}</div>
        </div>

        {/* Maintenance Issues Progress Bar */}
        <div className="progress-container">
          <div className="label maintenance">Maintenance Issues</div>
          <div className="progress-bar maintenance-issue">
            <div
              className="progress-fill maintenance-progress-fill"
              style={{ width: `${progressData.maintenanceIssues}%` }}
            />
          </div>
          <div className="label labelx">{`${progressData.maintenanceIssues}%`}</div>
        </div>
      </div>
    </div>
  );
};

export default RightbarTwo;
