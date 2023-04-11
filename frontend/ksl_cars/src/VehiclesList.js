import React from 'react';

// VehicleItem component to display individual vehicle details
const VehicleItem = ({ vehicle }) => (
  <div className="vehicle-item">
    <h2>{vehicle.listing_title}</h2>
    <ul>
      <li>Year: {vehicle.year}</li>
      <li>Make: {vehicle.make}</li>
      <li>Model: {vehicle.model}</li>
      <li>Trim: {vehicle.trim || 'N/A'}</li>
      <li>Price: {vehicle.price}</li>
      <li>Miles: {vehicle.miles}</li>
      <li>New or Used: {vehicle.new_or_used}</li>
      <li>Location: {vehicle.location}</li>
      <li>VIN: {vehicle.vin}</li>
      <li>Body Type: {vehicle.body_type}</li>
      <li>Fuel Type: {vehicle.fuel_type}</li>
      <li>Transmission: {vehicle.transmission}</li>
      <li>Seller Type: {vehicle.seller_type}</li>
      <li>Title Type: {vehicle.title_type}</li>
      <li>Time Created: {vehicle.time_created_utc}</li>
    </ul>
    <a href={vehicle.link} target="_blank" rel="noopener noreferrer">
      View Listing
    </a>
  </div>
);

// VehiclesList component to display a list of vehicle objects
const VehiclesList = ({ vehicles }) => (
  <div className="vehicles-list">
    {vehicles.map((vehicle, index) => (
      <VehicleItem key={index} vehicle={vehicle} />
    ))}
  </div>
);

export default VehiclesList;
