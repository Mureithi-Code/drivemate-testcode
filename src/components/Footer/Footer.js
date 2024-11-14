import React, { useState } from "react";
import styles from "./Footer.module.css"; // Import the CSS module for styling

const Footer = () => {
  // State to track which developer's details are currently displayed
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  // Developer data
  const developers = [
    {
      name: "Said Abdi",
      contribution: "Worked on the UI",
      details: "Said is a UI/UX designer with a passion for creating intuitive user interfaces. He enjoys designing beautiful and user-friendly applications."
    },
    {
      name: "Mary",
      contribution: "Worked on the Design",
      details: "Mary is a talented designer who focuses on creating visually appealing and functional designs. She has a keen eye for detail and user-centered design."
    },
    {
      name: "Joseph",
      contribution: "Worked on the Backend",
      details: "Joseph is a backend developer who specializes in building robust and scalable server-side applications. He has experience with Node.js, databases, and API development."
    }
  ];

  // Function to handle the developer name click
  const handleDeveloperClick = (developer) => {
    // Toggle the details for the clicked developer
    setSelectedDeveloper(prevSelected => prevSelected === developer ? null : developer);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h3 className={styles.footerHeading}>Meet Our Team</h3>
        <div className={styles.developerProfiles}>
          {developers.map((developer) => (
            <div
              key={developer.name}
              className={styles.developerProfile}
              onClick={() => handleDeveloperClick(developer)} // Call the click handler
            >
              <h4 className={styles.developerName}>{developer.name}</h4>
              <p className={styles.developerContribution}>{developer.contribution}</p>
            </div>
          ))}
        </div>

        {/* Display the selected developer's details below */}
        {selectedDeveloper && (
          <div className={styles.developerDetails}>
            <h4>{selectedDeveloper.name}</h4>
            <p><strong>Contribution:</strong> {selectedDeveloper.contribution}</p>
            <p>{selectedDeveloper.details}</p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
