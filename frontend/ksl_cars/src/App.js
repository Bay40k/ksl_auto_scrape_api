import React, { useState, useEffect } from 'react';
import VehiclesList from './VehiclesList';
import FilterForm from './FilterForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    listing_title: '',
    year: '',
    make: '',
    model: '',
    trim: '',
    priceFrom: '',
    priceTo: '',
    miles: '',
    newUsed: '',
    location: '',
    vin: '',
    body_type: '',
    fuel: '',
    transmission: '',
    sellerType: '',
    titleType: '',
    mileageFrom: '',
    mileageTo: '',
    drive: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const query = Object.entries(filters)
          .filter(([_, value]) => value !== '')
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        const response = await fetch(`http://127.0.0.1:4000/api/?${query}`);
        const data = await response.json();
        setVehicles(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [filters]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newFilters = {};

    for (const [name, value] of formData) {
      newFilters[name] = value;
    }

    setFilters(newFilters);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Vehicle Listings
      </Typography>
      <form onSubmit={handleFilterSubmit}>
      <FilterForm filters={filters} setFilters={setFilters} />
        <button type="submit">Apply Filters</button>
      </form>
      {isLoading ? (
        <Typography variant="body1" component="p">
          Loading...
        </Typography>
      ) : vehicles.length > 0 ? (
        <VehiclesList vehicles={vehicles} />
      ) : (
        <Typography variant="body1" component="p">
          No vehicles found.
        </Typography>
      )}
    </Container>
  );
};

export default App;
