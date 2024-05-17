import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { Typography, Button } from "@mui/material";
import AIImage from "../assets/images/ai.jpg";
import RoboticsImage from "../assets/images/robotics.jpg";
import BlockChainImage from "../assets/images/blockchain.jpg";
import QuantumImage from "../assets/images/quantum.jpg";
import SustainableImage from "../assets/images/sustainable.jpg";
import VRImage from "../assets/images/vr.jpg";
import IoTImage from "../assets/images/iot.jpg";
import AutoDrive from "../assets/images/autodrive.jpg";
import ThreeDImage from "../assets/images/3d.jpg";
import { useNavigate } from "react-router-dom";
const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.1,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: AIImage,
    title: "AI",
    width: "40%",
  },
  {
    url: RoboticsImage,
    title: "ROBOTICS",
    width: "20%",
  },
  {
    url: BlockChainImage,
    title: "BLOCKCHAIN",
    width: "40%",
  },
  {
    url: QuantumImage,
    title: "QUANTUM COMPUTING",
    width: "38%",
  },
  {
    url: SustainableImage,
    title: "SUSTAINABLE ENERGY",
    width: "38%",
  },
  {
    url: VRImage,
    title: "VR & AR",
    width: "24%",
  },
  {
    url: IoTImage,
    title: "IOT",
    width: "40%",
  },
  {
    url: AutoDrive,
    title: "AUTO DRIVE",
    width: "25%",
  },
  {
    url: ThreeDImage,
    title: "3D PRINTING",
    width: "35%",
  },
];

export default function HubCategories() {
  let navigate = useNavigate();
  const handleExploreMore = () => {
    navigate("event");
  };
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
                sx={{ fontWeight: "bold" }}
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 6,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleExploreMore}
          sx={{ width: 250 }}
        >
          EXPLORE MORE
        </Button>
      </Box>
    </Container>
  );
}
