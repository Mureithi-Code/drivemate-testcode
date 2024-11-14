// App.js
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import CarPage from './components/CarPage/CarPage';
import Footer from './components/Footer/Footer'; // Import Footer component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar /> {/* Render NavBar component */}
        <Routes>
          <Route path="/" element={<CarPage />} />
        </Routes>
        <Footer /> {/* Render Footer component */}
      </div>
    </Router>
  );
}

export default App;
