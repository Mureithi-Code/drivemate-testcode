import React, { useState, useEffect } from "react";
import CarList from "../CarList/CarList"; // Assuming CarList component exists
import NewCarForm from "../NewCarForm/NewCarForm";
import Search from "../Search/Search";
import ErrorPage from "../ErrorPage/ErrorPage"; // Import the error page
import styles from './CarPage.module.css'; // Import CSS module

function CarPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // State for filtered cars
  const [error, setError] = useState(null); // Error state for tracking errors

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
        setFilteredCars(data); // Set filtered cars to all cars initially
        setError(null); // Reset error on successful fetch
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Oops! Something went wrong while fetching the cars.");
      }
    };

    fetchCars();
  }, []);

  // Add a new car to the lists
  const handleAddCar = (newCar) => {
    setCars([...cars, newCar]);
    setFilteredCars([...cars, newCar]); // Update filtered cars as well
  };

  // Delete a car from the lists
  const handleDeleteCar = async (id) => {
    try {
      await fetch(`http://localhost:3000/cars/${id}`, { method: "DELETE" });
      const updatedCars = cars.filter((car) => car.id !== id);
      setCars(updatedCars);
      setFilteredCars(updatedCars); // Update filtered cars as well
    } catch (error) {
      console.error("Error deleting car:", error);
      setError("Oops! Something went wrong while deleting the car.");
    }
  };

  // Update car price
  const handleUpdatePrice = (id, newPrice) => {
    const updatedCar = cars.find((car) => car.id === id);
    updatedCar.price = newPrice;

    fetch(`http://localhost:3000/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    })
      .then(() => {
        const updatedCars = cars.map((car) =>
          car.id === id ? updatedCar : car
        );
        setCars(updatedCars);
        setFilteredCars(updatedCars);
      })
      .catch((error) => {
        console.error("Error updating car price:", error);
        setError("Oops! Something went wrong while updating the car price.");
      });
  };

  // Book a car (and change the button text to 'Booked')
  const handleBookNow = async (id) => {
    try {
      // Find the car to update
      const carToUpdate = cars.find((car) => car.id === id);
      
      // Toggle the 'booked' status
      const updatedCar = { ...carToUpdate, booked: !carToUpdate.booked };

      // Send a PATCH request to update the car's booking status in the backend
      const response = await fetch(`http://localhost:3000/cars/${id}`, {
        method: 'PATCH', // Use PATCH to partially update the car
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
      });

      if (!response.ok) {
        throw new Error('Failed to update the car status');
      }

      // If the request is successful, update the local state to reflect the changes
      const updatedCars = cars.map((car) =>
        car.id === id ? updatedCar : car
      );
      setCars(updatedCars);
      setFilteredCars(updatedCars); // Ensure filtered cars are also updated

    } catch (error) {
      console.error('Error booking car:', error);
      setError('Oops! Something went wrong while booking the car.');
    }
  };

  // Filter cars based on search input
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredCars(cars); // Show all cars if search term is empty
    } else {
      const filtered = cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <div className={styles.carPage}>
      <Search onSearch={handleSearch} /> {/* Pass handleSearch as onSearch prop */}
      
      <h2>Cars Available</h2>

      {/* Show error page if there's an error or no cars found after search */}
      {error ? (
        <ErrorPage message={error} />
      ) : filteredCars.length === 0 ? (
        <ErrorPage message="Oops, car not found." />
      ) : (
        <CarList
          cars={filteredCars} // Use filteredCars for displaying
          onDelete={handleDeleteCar}
          onUpdatePrice={handleUpdatePrice}  // Ensure this is passed correctly
          onBookNow={handleBookNow}  // And this too
        />
      )}
       <NewCarForm onAddCar={handleAddCar} /> 
    </div>
  );
}

export default CarPage;
