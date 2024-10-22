import './index.css'; 
import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import api from "../../config/axiox";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbars";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JoinRide = () => {
  const [rideId, setRideId] = useState("");
  const [rides, setRides] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await api.get("/rides/getAll");
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.sub ? Number(decoded.sub) : null);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    fetchRides();
  }, []);

  const handleJoinRide = async (e) => {
    e.preventDefault();

    const rideIdNumber = Number(rideId);

    if (isNaN(rideIdNumber) || !userId) {
      setMessage("Invalid input: rideId or userId is missing.");
      setOpen(true);
      return;
    }

    try {
      const response = await api.post(`/rides/${rideIdNumber}/join`, null, {
        params: { userId },
      });
      setMessage(response.data);
      setOpen(true);
      setRideId("");
    } catch (error) {
      setMessage(error.response?.data || "Error joining ride");
      setOpen(true);
      console.error("Error joining ride:", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Navbar /> {/* Navbar component */}
      <Container className="container" maxWidth="md">
        <Box mt={4} mb={4}>
          <Typography variant="h4" align="center" className="typography-title">
            Join a Ride
          </Typography>

          <Grid container spacing={2}>
            {rides.map((ride) => (
              <Grid item xs={12} sm={6} md={4} key={ride.rideCode}>
                <Card className="card" variant="outlined" sx={{ mb: 2 }}>
                  <CardContent className="card-content">
                    <Typography variant="h6">{ride.rideCode}</Typography>
                    <Typography variant="body2">Start Location: {ride.startLocationName}</Typography>
                    <Typography variant="body2">End Location: {ride.endLocationName}</Typography>
                    <Typography variant="body2">Start Time: {new Date(ride.startTime).toLocaleString()}</Typography>
                    <Typography variant="body2">End Time: {new Date(ride.endTime).toLocaleString()}</Typography>
                    <Typography variant="body2">Ride Date: {new Date(ride.rideDate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Capacity: {ride.capacity}</Typography>
                    <Typography variant="body2">Available Seats: {ride.availableSeats}</Typography>
                    <Typography variant="body2">Price: ${ride.price.toFixed(2)}</Typography>
                    <Typography variant="body2">Payment Method: {ride.paymentMethod}</Typography>
                    <Typography variant="body2">Status: {ride.status}</Typography>
                    <Typography variant="body2">Organizer User ID: {ride.userId}</Typography>
                    <Button 
                      onClick={() => setRideId(ride.rideId)} 
                      variant="contained" 
                      className="select-ride-btn" 
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Select Ride
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <form onSubmit={handleJoinRide}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <Select
                    value={rideId}
                    onChange={(e) => setRideId(e.target.value)}
                    fullWidth
                  >
                    {rides.map((ride) => (
                      <MenuItem key={ride.rideId} value={ride.rideId}>
                        {ride.rideCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className="join-btn"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Join Ride
                </Button>
              </Grid>
            </Grid>
          </form>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={message.includes("Error") ? "error" : "success"} 
              className={message.includes("Error") ? "snackbar-error" : "snackbar-success"}
            >
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
};

export default JoinRide;
