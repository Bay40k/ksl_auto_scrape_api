import React from 'react';
import VehiclesList from './VehiclesList';

const App = () => {
  const vehicles = [
    {
      listing_title: '1998 Toyota Tacoma',
      year: 1998,
      make: 'Toyota',
      model: 'Tacoma',
      trim: null,
      price: '$4900',
      miles: 274,
      new_or_used: 'Used',
      location: 'West Valley City, UT',
      vin: '4TANL42N0WZ023422',
      body_type: 'Truck',
      fuel_type: 'Gasoline',
      transmission: 'Manual',
      link: 'https://cars.ksl.com/listing/8434285',
      seller_type: 'For Sale By Owner',
      title_type: 'Clean Title',
      time_created_utc: '2023-03-12 23:30:11',
      unix_timestamp: 1678663811,
    },
    // ...more vehicle objects
  ];

  return (
    <div className="App">
      <h1>Vehicle Listings</h1>
      <VehiclesList vehicles={vehicles} />
    </div>
  );
};

export default App;
