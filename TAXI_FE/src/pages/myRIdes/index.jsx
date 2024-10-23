import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import api from "../../config/axiox";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbars";
import './index.css'; 

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.sub;
          setUserId(userId);

          const userRidesResponse = await api.get(`/rides/user/${userId}`);
          const userRides = userRidesResponse.data;

          const allRidesResponse = await api.get("/rides/getAll");
          const allRides = allRidesResponse.data;

          const enrichedRides = userRides.map((userRide) => {
            const rideDetails = allRides.find(ride => ride.rideId === userRide.rideId);
            return {
              ...userRide, 
              ...rideDetails, 
            };
          });

          setRides(enrichedRides);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRides();
  }, []);

  const getOrganizerUsername = (rideId) => {
    const ride = rides.find(r => r.rideId === rideId);
    return ride ? ride.organizerUsername : null; 
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ paddingTop: '80px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Rides
        </Typography>

        <Grid container spacing={4}>
  {rides.map((ride) => (
    <Grid item xs={12} sm={6} md={4} key={ride.rideId}>
      <Card className="card" variant="outlined" sx={{ mb: 3, p: 2 }}>
        <CardContent className="card-content">
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>{ride.rideCode}</Typography>
          <Typography variant="body2">Start Location: {ride.startLocationName}</Typography>
          <Typography variant="body2">End Location: {ride.endLocationName}</Typography>
          <Typography variant="body2">
            Start Time: {new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
          <Typography variant="body2">
            End Time: {new Date(ride.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
          <Typography variant="body2">
            Ride Date: {new Date(ride.rideDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">Capacity: {ride.capacity}</Typography>
          <Typography variant="body2">Status: {ride.status}</Typography>
          <Typography variant="body2">Price: ${ride.price.toFixed(2)}</Typography>
          <Typography variant="body2">Payment Method: {ride.paymentMethod}</Typography>
          <Typography variant="body2">Organizer: {getOrganizerUsername(ride.rideId) || "N/A"}</Typography>
          <Button variant="contained" className="select-ride-btn" sx={{ mt: 2 }} fullWidth>
            View Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      </Container>
    </>
  );
};

export default MyRides;
