import React, { useState } from "react";
import { Container, Typography, TextField, Button, Rating, Box } from "@mui/material";
import api from "../../config/axiox"; // Đảm bảo đường dẫn tới file config axios đúng
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Đảm bảo import jwtDecode nếu dùng để giải mã token
import Navbar from "../../components/Navbars"; // Import Navbar

const Feedback = () => {
  const { rideId } = useParams(); // Lấy rideId từ URL
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.sub;

      // Dữ liệu để gửi lên API
      const feedbackData = {
        description,
        rating,
        userId,
        rideId
      };

      // Gọi API để tạo phản hồi
      await api.post("/taxi-server/api/v1/complaints/add", feedbackData);

      // Sau khi gửi phản hồi thành công, chuyển về trang MyRides
      navigate("/my-rides");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <Navbar /> {/* Thêm Navbar */}
      <Container maxWidth="sm" style={{ paddingTop: '80px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Feedback
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Feedback;
