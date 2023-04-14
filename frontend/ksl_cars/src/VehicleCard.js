import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const VehicleCard = ({ vehicle }) => {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {vehicle.listing_title}
          </Typography>
          {/* Add other vehicle information as desired */}
          <Typography variant="body1" component="p">
            Year: {vehicle.year}
          </Typography>
          <Typography variant="body1" component="p">
            Make: {vehicle.make}
          </Typography>
          <Typography variant="body1" component="p">
            Model: {vehicle.model}
          </Typography>
          <Typography variant="body1" component="p">
            Price: ${vehicle.price}
          </Typography>
          <Typography variant="body1" component="p">
            Miles: {vehicle.miles}
          </Typography>
          <Typography variant="body1" component="p">
            Location: {vehicle.location}
          </Typography>
          <Typography variant="body1" component="p">
            Link: <Link href={vehicle.link} target="_blank">{vehicle.link}</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default VehicleCard;
  