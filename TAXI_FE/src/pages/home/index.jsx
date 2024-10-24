import React, { useEffect, useState } from "react";
import api from "../../config/axiox";
import "./index.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

function HomePage() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  const fetchTrip = async () => {
    try {
      const response = await api.get();
      setTrips(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleBookRide = () => {
    if (token && role === "STUDENT") {
      navigate("/create-ride"); 
    } else {
      toast.error("You must be logged in as STUDENT to access this page."); 
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
<div className="homepage-bg"> 
<div className="overlay">
        <div className="hero-text">
          <h2>Taxis Online Service</h2>
          <h1>Amazing Journey With Share Ride</h1>
          <p>Made for Student by Student</p>
          <div className="hero-buttons">
            <button className="learn-more">Learn More</button>
            <button className="book-ride" onClick={handleBookRide}> Book a Ride</button>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8"> {/* Added container */}
          <div className="trips-list">
            {trips.map((trip, index) => (
              <div key={index} className="trip-item">
                <h3>{trip.name}</h3>
                <p>{trip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
