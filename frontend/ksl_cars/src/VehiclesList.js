import React from 'react';
import VehicleCard from './VehicleCard';
import Grid from '@mui/material/Grid';

const VehiclesList = ({ vehicles }) => {
  return (
    <Grid container spacing={2}>
      {vehicles.map((vehicle) => (
        <Grid item xs={12} sm={6} md={4} key={vehicle.vin}>
          <VehicleCard vehicle={vehicle} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VehiclesList;
