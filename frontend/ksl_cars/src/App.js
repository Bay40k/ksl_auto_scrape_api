import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import VehiclesList from "./VehiclesList";
import FilterForm from "./FilterForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "react-query";

const fetchVehicles = async ({ queryKey }) => {
  const [, filters, page] = queryKey;
  const queryParams = new URLSearchParams(filters);
  queryParams.append("page", page);
  const response = await fetch(`/api/?${queryParams}`);
  const data = await response.json();
  return data;
};

const App = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const {
    data: vehicles,
    isLoading,
    refetch,
  } = useQuery(["vehicles", filters, page], fetchVehicles, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });

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
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page={page}
          setPage={setPage}
          hasMoreListings={vehicles?.length > 0}
        />
        {isLoading ? (
          <Typography variant="body1" component="p">
            Loading...
          </Typography>
        ) : vehicles?.length > 0 ? (
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

const queryClient = new QueryClient();

const AppWithQueryClientProvider = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default AppWithQueryClientProvider;
