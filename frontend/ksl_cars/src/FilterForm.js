import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import {
  FormControl,
  InputLabel,
  Select,
  ButtonGroup,
  CardContent,
  Card,
  Typography,
} from "@mui/material";

const FilterForm = ({
  filters,
  setFilters,
  handleFilterSubmit,
  handleNextPage,
  handlePrevPage,
  page,
  hasMoreListings,
}) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });

    if (name === "model") {
      setSelectedModels(value);
    }
  };
  const renderTextField = (label, name) => (
    <TextField
      label={label}
      name={name}
      value={filters[name] || ""}
      onChange={handleFilterChange}
      variant="outlined"
      size="small"
      fullWidth
    />
  );

  const renderSelectField = (label, name, options, multiple = false) => (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={filters[name] || []}
        onChange={handleFilterChange}
        multiple={multiple}
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
      <Box paddingTop={1} />
    </FormControl>
  );

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [trims, setTrims] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const minMileage = 0;
  const maxMileage = 300000;
  const minPrice = 1000;
  const maxPrice = 150000;
  const minYear = 1970;
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear;

  useEffect(() => {
    setSelectedModels(filters.model);
  }, [filters.model]);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("/api/makes-models-trims/");
        const data = await response.json();
        setMakes(data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  // Fetching models for multiple selected makes
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelsResponse = await Promise.all(
          filters.make.map(async (make) => {
            const response = await fetch(
              `/api/makes-models-trims/?make=${make}`
            );
            const data = await response.json();
            return data.map((model) => ({ make, name: model }));
          })
        );

        const allModels = modelsResponse.flat();
        setModels(allModels);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    if (filters.make && filters.make.length) {
      fetchModels();
    }
  }, [filters.make]);

  // Fetching trims for multiple selected makes and models
  useEffect(() => {
    const fetchTrims = async () => {
      try {
        const trimsData = await Promise.all(
          selectedModels.map(async (model) => {
            const make = models.find((m) => m.name === model)?.make;
            if (!make) return [];
            const response = await fetch(
              `/api/makes-models-trims/?make=${make}&model=${model}`
            );
            const data = await response.json();
            return data;
          })
        );

        const combinedTrims = trimsData.flat();
        setTrims(combinedTrims);
      } catch (error) {
        console.error("Error fetching trims:", error);
      }
    };

    if (
      filters.make &&
      filters.make.length > 0 &&
      selectedModels &&
      selectedModels.length > 0
    ) {
      fetchTrims();
    } else {
      setTrims([]);
    }
  }, [filters.make, selectedModels, models]);

  useEffect(() => {
    setFilters({
      ...filters,
    });
  }, []);

  const renderYearSlider = () => (
    <Slider
      value={[filters.yearFrom || minYear, filters.yearTo || currentYear]}
      onChange={(event, newValue) => {
        setFilters({
          ...filters,
          yearFrom: newValue[0],
          yearTo: newValue[1],
        });
      }}
      valueLabelDisplay="auto"
      min={minYear}
      max={maxYear}
      sx={{ width: "100%" }}
    />
  );

  const renderMileageSlider = () => (
    <Slider
      value={[
        filters.mileageFrom || minMileage,
        filters.mileageTo || maxMileage,
      ]}
      onChange={(event, newValue) => {
        setFilters({
          ...filters,
          mileageFrom: newValue[0],
          mileageTo: newValue[1],
        });
      }}
      valueLabelDisplay="auto"
      min={minMileage}
      max={maxMileage}
      sx={{ width: "100%" }}
    />
  );

  const renderPriceSlider = () => (
    <Slider
      value={[filters.priceFrom || minPrice, filters.priceTo || maxPrice]}
      onChange={(event, newValue) => {
        setFilters({
          ...filters,
          priceFrom: newValue[0],
          priceTo: newValue[1],
        });
      }}
      valueLabelDisplay="auto"
      min={minPrice}
      max={maxPrice}
      sx={{ width: "100%" }}
    />
  );

  return (
    <Box component="form" sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Vehicle
              </Typography>
              {renderSelectField("Make", "make", makes, true)}
              {renderSelectField(
                "Model",
                "model",
                models.map((model) => model.name),
                true
              )}
              {renderSelectField("Trim", "trim", trims, true)}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Year & Price
              </Typography>
              <Typography>Year Range</Typography>
              {renderYearSlider()}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: 1,
                }}
              >
                {renderTextField("Year From", "yearFrom")}
                {renderTextField("Year To", "yearTo")}
              </Box>
              <Typography>Price Range</Typography>
              {renderPriceSlider()}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {renderTextField("Price From", "priceFrom")}
                {renderTextField("Price To", "priceTo")}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Mileage & Seller
              </Typography>
              <Typography>Mileage Range</Typography>
              {renderMileageSlider()}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: 1,
                }}
              >
                {renderTextField("Mileage From", "mileageFrom")}
                {renderTextField("Mileage To", "mileageTo")}
              </Box>
              {renderSelectField("Seller Type", "sellerType", [
                "For Sale By Owner",
                "Dealership",
              ])}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Vehicle Details
              </Typography>
              {renderSelectField("New or Used", "newUsed", [
                "Used",
                "New",
                "Certified",
              ])}
              {renderSelectField("Transmission", "transmission", [
                "Automatic",
                "Manual",
                "CVT",
                "Automanual",
              ])}
              {renderSelectField("Fuel Type", "fuel", [
                "Compressed Natural Gas",
                "Diesel",
                "Electric",
                "Flex Fuel",
                "Gasoline",
                "Hybrid",
              ])}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Drive & Title
              </Typography>
              {renderSelectField("Drive", "drive", [
                "2-Wheel Drive",
                "4-Wheel Drive",
                "AWD",
                "FWD",
                "RWD",
              ])}
              {renderSelectField("Title Type", "titleType", [
                "Clean Title",
                "Dismantled Title",
                "Not Specified",
                "Rebuilt/Reconstructed Title",
                "Salvage Title",
              ])}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <Button
            onClick={handlePrevPage}
            variant="contained"
            color="primary"
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button onClick={handleFilterSubmit} type="submit" variant="contained" color="primary">
            Apply Filters
          </Button>
          <Button
            onClick={handleNextPage}
            variant="contained"
            color="primary"
            disabled={!hasMoreListings}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default FilterForm;
