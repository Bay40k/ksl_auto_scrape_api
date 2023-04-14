import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, ButtonGroup } from "@mui/material";

const FilterForm = ({
  filters,
  setFilters,
  fetchVehicles,
  handleNextPage,
  handlePrevPage,
  page
}) => {
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchVehicles();
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

  const renderSelectField = (label, name, options) => (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={filters[name]}
        onChange={handleFilterChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [trims, setTrims] = useState([]);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          "/api/makes-models-trims/"
        );
        const data = await response.json();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `/api/makes-models-trims/?make=${filters.make}`
        );
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    if (filters.make) {
      fetchModels();
    }
  }, [filters.make]);

  useEffect(() => {
    const fetchTrims = async () => {
      try {
        const response = await fetch(
          `/api/makes-models-trims/?make=${filters.make}&model=${filters.model}`
        );
        const data = await response.json();
        setTrims(data);
      } catch (error) {
        console.error("Error fetching trims:", error);
      }
    };

    if (filters.make && filters.model) {
      fetchTrims();
    }
  }, [filters.make, filters.model]);
  return (
    <Box component="form" onSubmit={handleFilterSubmit} sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Make", "make", makes)}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Model", "model", models)}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Trim", "trim", trims)}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Year From", "yearFrom")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Year To", "yearTo")}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Price From", "priceFrom")} {/* Updated label */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Price To", "priceTo")} {/* New field */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Mileage From", "mileageFrom")} {/* New field */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderTextField("Mileage To", "mileageTo")} {/* New field */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Seller Type", "sellerType", [
            "For Sale By Owner",
            "Dealership",
          ])}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("New or Used", "newUsed", [
            "Used",
            "New",
            "Certified",
          ])}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Transmission", "transmission", [
            "Automatic",
            "Manual",
            "CVT",
            "Automanual",
          ])}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Fuel Type", "fuel", [
            "Compressed Natural Gas",
            "Diesel",
            "Electric",
            "Flex Fuel",
            "Gasoline",
            "Hybrid",
          ])}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Drive", "drive", [
            "2-Wheel Drive",
            "4-Wheel Drive",
            "AWD",
            "FWD",
            "RWD",
          ])}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderSelectField("Title Type", "titleType", [
            "Clean Title",
            "Dismantled Title",
            "Not Specified",
            "Rebuilt/Reconstructed Title",
            "Salvage Title",
          ])}
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <Button onClick={handlePrevPage} variant="contained" color="primary" disabled={page === 1} >
            Previous
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Apply Filters
          </Button>
          <Button onClick={handleNextPage} variant="contained" color="primary">
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default FilterForm;
