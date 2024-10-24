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
import IndexNavbar from "../../components/Navbars";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

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
  const [userId, setUserId] = useState(null);

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

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.sub ? Number(decoded.sub) : null);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    const startDate = new Date(newStartTime);
    const localStartDate = new Date(startDate.getTime() + (7 * 60 * 60 * 1000));
    const endDate = new Date(localStartDate);
    endDate.setMinutes(endDate.getMinutes() + 15);

    setEndTime(endDate.toISOString().slice(0, 16));
    setRideDate(localStartDate.toISOString().slice(0, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      userId: userId !== null ? userId : null,
    };

    try {
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
    } catch (error) {
      console.error("Error creating ride:", error.response ? error.response.data : error);
    }
  };

  const isFormValid = () => {
    return (
      rideCode &&
      startTime &&
      endTime &&
      rideDate &&
      capacity > 0 &&
      price > 0 &&
      startLocationId &&
      endLocationId
    );
  };

  return (
    <div>
      <IndexNavbar />
      <Container maxWidth="sm" style={{ marginTop: '80px' }}>
        <Box mt={4} mb={4} padding={2} borderRadius={2} boxShadow={3} bgcolor="#fff">
          <Typography 
            variant="h4" align="center" gutterBottom // Adjust margin
          >
            Create a New Ride
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                  onChange={handleStartTimeChange}
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
                  disabled 
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
                  disabled 
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
                  inputProps={{ min: 1 }}
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
                  inputProps={{ min: 0 }}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!isFormValid()}
                  sx={{ mt: 2 }} // Adjust margin for button
                >
                  Create Ride
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default CreateRide;
