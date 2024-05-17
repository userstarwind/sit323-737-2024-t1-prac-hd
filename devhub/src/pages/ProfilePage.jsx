import React from "react";
import { Typography, Container } from "@mui/material";
import Footer from "../components/Footer";
import EventManager from "../components/EventManager";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser,navigate]);
  return (
    <>
      <Container sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h2">{`Welcome, ${currentUser?currentUser.firstName:''}!`}</Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ ml: 20, fontStyle: "italic" }}
        >
          ---- Manage your events here
        </Typography>
        <EventManager />
      </Container>
      <Footer />
    </>
  );
};
export default ProfilePage;
