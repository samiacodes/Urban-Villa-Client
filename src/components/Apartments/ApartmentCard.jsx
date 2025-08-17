import React from "react";

const ApartmentCard = ({ apartment, onAgree }) => {
  const { image, floor, block, apartmentNo, rent, isRented } = apartment;

  return (
    <div className="card bg-base-100 shadow-md p-4">
      <figure>
        <img src={image} alt={`Apartment ${apartmentNo}`} className="rounded" />
      </figure>
      <div className="card-body space-y-2">
        <h2 className="card-title">Apartment No: {apartmentNo}</h2>
        <p>Floor: {floor}</p>
        <p>Block: {block}</p>
        <p>Rent: {rent} ৳</p>

        <button
          onClick={() => onAgree(apartment)}
          disabled={isRented}
          className="btn btn-primary btn-sm"
        >
          {isRented ? "Already Rented" : "Make Agreement"}
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;
