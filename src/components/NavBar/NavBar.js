import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom'; // Updated to useNavigate for dynamic navigation
import styles from './NavBar.module.css'; // Import the styles for the navbar

const Home = () => {
  return (
    <div>
      <h2>Pick Your Ride and Travel The World</h2>
    </div>
  );
};

// Cars component (which will display the list of cars based on the status passed in props)
const Cars = ({ cars, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      {cars.length === 0 ? (
        <p>No cars available</p>
      ) : (
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <p>{car.price}</p>
              <p>Owner: {car.owner}</p>
              <p>Phone: {car.phoneNumber}</p>
              <p>Location: {car.location}</p>
              <img src={car.image} alt={car.name} width="100" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Navbar = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // useNavigate for dynamic routing

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars');
        const data = await response.json();
        setCars(data); // Set the cars data into the state
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars(); // Call fetchCars when the component mounts
  }, []);

  // Filter cars for available and booked
  const availableCars = cars.filter(car => !car.booked);
  const bookedCars = cars.filter(car => car.booked);

  return (
    <div>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/available-cars" className={styles.navLink}>Available Cars</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/booked-cars" className={styles.navLink}>Booked Cars</Link>
          </li>
        </ul>
      </nav>

      {/* React Router's Routes to conditionally render the content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/available-cars" element={<Cars cars={availableCars} title="Available Cars" />} />
        <Route path="/booked-cars" element={<Cars cars={bookedCars} title="Booked Cars" />} />
      </Routes>
    </div>
  );
};

export default Navbar;
