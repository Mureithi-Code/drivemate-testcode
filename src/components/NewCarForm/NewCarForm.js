import React, { useState } from "react";
import styles from './NewCarForm.module.css'; // Importing the CSS module

function NewCarForm({ onAddCar }) {
  const [newCar, setNewCar] = useState({
    name: "",
    price: "",
    description: "",
    image: "", // Adding image field
    owner: "", // New owner field
    contact: "", // New phone number field
    location: "" // New location field
  });

  // Handle the POST request to add a new car
  const handleAddCar = async () => {
    try {
      const response = await fetch("http://localhost:3000/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      const addedCar = await response.json();
      onAddCar(addedCar); // Update parent component's car list
      setNewCar({
        name: "",
        price: "",
        description: "",
        image: "",
        owner: "", // Reset owner field
        contact: "", // Reset phone number field
        location: "", // Reset location field
      }); // Clear the form
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className={styles.carForm}>
      <h2 className={styles.heading}>Add a New Car</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Car Name"
        value={newCar.name}
        onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Price"
        value={newCar.price}
        onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
      />
      <textarea
        className={styles.textarea}
        placeholder="Description"
        value={newCar.description}
        onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Image URL"
        value={newCar.image}
        onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
      />
      {/* New input fields for Owner, Phone Number, and Location */}
      <input
        className={styles.input}
        type="text"
        placeholder="Owner Name"
        value={newCar.owner}
        onChange={(e) => setNewCar({ ...newCar, owner: e.target.value })}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Phone Number"
        value={newCar.contact}
        onChange={(e) => setNewCar({ ...newCar, contact: e.target.value })}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Location"
        value={newCar.location}
        onChange={(e) => setNewCar({ ...newCar, location: e.target.value })}
      />
      <button className={styles.button} onClick={handleAddCar}>Add Car</button>
    </div>
  );
}

export default NewCarForm;
