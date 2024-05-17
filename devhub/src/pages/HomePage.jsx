import React from "react";
import HubHero from "../components/HubHero";
import HubValues from "../components/HubValues";
import Banner from "../components/Banner";
import HubCategories from "../components/HubCategories";
import HubCTA from "../components/HubCTA";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
const HomePage = () => {
  return (
    <>
      <HubHero />
      <Banner content="WHY US" />
      <HubValues />
      <Box sx={{bgcolor: '#F0F0F0', pb:10,pt:5}}>
        <Banner content="The Technological Frontier at DevHub" />
        <HubCategories />
      </Box>
      <Banner content="FOLLOW US" />
      <HubCTA />
      <Footer/>
    </>
  );
};
export default HomePage;
