import React, { useState } from "react";
import styles from './CarCard.module.css';

function CarCard({ car, onBookNow, onUpdatePrice, onDelete }) {
  const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
  const [newPrice, setNewPrice] = useState(car.price); // Store the new price

  // Handle price update
  const handlePriceChange = (e) => {
    setNewPrice(e.target.value); // Update the new price value
  };

  const handleSavePrice = () => {
    if (newPrice && newPrice !== car.price) {
      onUpdatePrice(car.id, newPrice); // Call the onUpdatePrice function passed as a prop
      setIsEditing(false); // Exit edit mode
    }
  };

  return (
    <div className={styles.cardItem}>
      {/* Car image covering the top of the card */}
      <img
        src={car.image || 'default-image.jpg'}
        alt={car.name}
        className={styles.cardImage}
      />

      {/* Car content (name, description, price, owner, phone number, location) */}
      <div className={styles.cardContent}>
        <div className={styles.cardText}>
          <h3>{car.name}</h3>
          <p>{car.description}</p>

          {/* Show price */}
          <p>
            Price: 
            {isEditing ? (
              <input
                type="number"
                value={newPrice}
                onChange={handlePriceChange}
                className={styles.priceInput}
              />
            ) : (
              `$${car.price}`
            )}
          </p>

          {/* Display additional car information */}
          <p><strong>Owner:</strong> {car.owner}</p>
          <p><strong>Contact:</strong> {car.contact}</p>
          <p><strong>Location:</strong> {car.location}</p>
        </div>

        {/* Action buttons */}
        <div className={styles.cardButtons}>
          <button
            onClick={() => onBookNow(car.id)} // Toggle booking status
            className={styles.bookButton}
          >
            {car.booked ? 'Booked' : 'Book Now'}
          </button>

          {/* Update Price Button */}
          <button
            onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
            className={styles.updateButton}
          >
            {isEditing ? "Save Price" : "Update Price"}
          </button>

          {/* Delete Button */}
          <button onClick={() => onDelete(car.id)} className={styles.deleteButton}>
            Delete
          </button>
        </div>

        {/* Save the price if we're editing */}
        {isEditing && (
          <button onClick={handleSavePrice} className={styles.saveButton}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default CarCard;
