// ErrorPage.js
import React from "react";
import styles from './ErrorPage.module.css'; // Assuming you have a CSS module for styling

const ErrorPage = ({ message }) => {
  return (
    <div className={styles.errorPage}>
      <h2>{message}</h2>
    </div>
  );
};

export default ErrorPage;