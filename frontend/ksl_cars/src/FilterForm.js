import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const FilterForm = ({ filters, setFilters }) => {
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const renderTextField = (label, name) => (
    <TextField
      label={label}
      name={name}
      value={filters[name]}
      onChange={handleFilterChange}
      variant="outlined"
      size="small"
      fullWidth
    />
  );

  return (
    <Box component="form" sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Listing Title", "listing_title")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Year", "year")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Make", "make")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Model", "model")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Trim", "trim")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Price From", "priceFrom")} {/* Updated label */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Price To", "priceTo")} {/* New field */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Miles", "miles")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("New or Used", "newUsed")}{" "}
          {/* Updated name and label */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Location", "location")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("VIN", "vin")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Body Type", "body_type")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Fuel Type", "fuel")} {/* Updated name */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Transmission", "transmission")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Seller Type", "sellerType")}{" "}
          {/* Updated name and label */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Title Type", "titleType")} {/* Updated name */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Mileage From", "mileageFrom")} {/* New field */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Mileage To", "mileageTo")} {/* New field */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Drive", "drive")} {/* New field */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterForm;
