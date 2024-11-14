import React from "react";
import CarCard from "../CarCard/CarCard"; 
import styles from './CarList.module.css';

function CarList({ cars, onDelete, onUpdatePrice, onBookNow }) {
  return (
    <div className={styles.cardList}>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onDelete={onDelete}
          onUpdatePrice={onUpdatePrice}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
}

export default CarList;