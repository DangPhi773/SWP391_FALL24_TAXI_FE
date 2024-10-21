import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import api from "../../config/axiox";

const CreateRide = () => {
  const [rideCode, setRideCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [startLocationId, setStartLocationId] = useState(null);
  const [endLocationId, setEndLocationId] = useState(null);
  const [locations, setLocations] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get("/locations/getAll");
        setLocations(response.data); 
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        rideCode,
        startTime,
        endTime,
        rideDate,
        capacity,
        price,
        paymentMethod,
        startLocationId,
        endLocationId,
        userId: userId ? Number(userId) : null,
      };
      const response = await api.post("/rides/add", payload);
      console.log("Ride created successfully:", response.data);
      // Reset form
      setRideCode("");
      setStartTime("");
      setEndTime("");
      setRideDate("");
      setCapacity(1);
      setPrice(0);
      setPaymentMethod("CASH");
      setStartLocationId(null);
      setEndLocationId(null);
      setUserId(""); // Reset userId
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Create a New Ride
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Ride Code"
                value={rideCode}
                onChange={(e) => setRideCode(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Start Time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="End Time"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Ride Date"
                type="date"
                value={rideDate}
                onChange={(e) => setRideDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="CASH">Cash on Delivery</MenuItem>
                  <MenuItem value="ONLINE">Online Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Autocomplete for Start Location */}
            <Grid item xs={12}>
              <Autocomplete
                options={locations}
                getOptionLabel={(option) => option.locationName}
                onChange={(event, newValue) => setStartLocationId(newValue ? newValue.locationId : null)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Start Location" required />
                )}
              />
            </Grid>

            {/* Autocomplete for End Location */}
            <Grid item xs={12}>
              <Autocomplete
                options={locations}
                getOptionLabel={(option) => option.locationName}
                onChange={(event, newValue) => setEndLocationId(newValue ? newValue.locationId : null)}
                renderInput={(params) => (
                  <TextField {...params} label="Select End Location" required />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Ride
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateRide;
