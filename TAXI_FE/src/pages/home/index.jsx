import React, { useEffect, useState } from "react";
import api from "../../config/axiox";

function HomePage() {
  const [trips, setTrips] = useState([]);

  const fetchTrip = async () => {
    try {
      const response = await api.get();
      setTrips(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return ( 
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;
