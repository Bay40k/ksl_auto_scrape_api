import React, { useState, useEffect } from "react";
import VehiclesList from "./VehiclesList";
import FilterForm from "./FilterForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchVehicles();
  }, [page]);


  const fetchVehicles = async (updatedFilters = filters) => {
    try {
      const queryParams = new URLSearchParams(updatedFilters);
      queryParams.append("page", page);
      setIsLoading(true);
      const response = await fetch(`/api/?${queryParams}`);
      const data = await response.json();
      setIsLoading(false);
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };  

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Vehicle Listings
        </Typography>
        <FilterForm
          filters={filters}
          setFilters={setFilters}
          fetchVehicles={fetchVehicles}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page={page}
        />
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
      </Box>
    </Container>
  );
};

export default App;
