import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
  boxShadow: 2,
  borderRadius: 2,
};

function ProductValues() {
  return (
    <Box component="section" sx={{ display: "flex", overflow: "hidden" }}>
      <Container sx={{ mt: 15, mb: 15, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component={ConstructionIcon}
                sx={{ fontSize: 55, height: 55, color: "info.main", mt: 5 }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ my: 5, fontWeight: "bold" }}
              >
                Tech Community
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Foster innovation and solve challenges by engaging with a global
                network of tech enthusiasts.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component={LocalLibraryIcon}
                sx={{ fontSize: 55, height: 55, color: "info.main", mt: 5 }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", my: 5 }}
              >
                Learning Commitment
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Elevate your skills with our comprehensive resources, from basic
                coding to advanced technologies.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component={ConnectWithoutContactIcon}
                sx={{ fontSize: 55, height: 55, color: "info.main", mt: 5 }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", my: 5 }}
              >
                Global Collaboration
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Collaborate on innovatve projects that set the stage for the
                next technological advancements.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
