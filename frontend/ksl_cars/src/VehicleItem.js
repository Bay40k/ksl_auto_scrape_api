import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const VehicleItem = ({ vehicle }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {vehicle.listing_title}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Year: ${vehicle.year}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Make: ${vehicle.make}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Model: ${vehicle.model}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Trim: ${vehicle.trim || 'N/A'}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Price: ${vehicle.price}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Miles: ${vehicle.miles}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`New or Used: ${vehicle.new_or_used}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Location: ${vehicle.location}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`VIN: ${vehicle.vin}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Body Type: ${vehicle.body_type}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Fuel Type: ${vehicle.fuel_type}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Transmission: ${vehicle.transmission}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Seller Type: ${vehicle.seller_type}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Title Type: ${vehicle.title_type}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Time Created: ${vehicle.time_created_utc}`} />
        </ListItem>
      </List>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        color="primary"
        href={vehicle.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Listing
      </Button>
    </CardActions>
  </Card>
);

export default VehicleItem;
