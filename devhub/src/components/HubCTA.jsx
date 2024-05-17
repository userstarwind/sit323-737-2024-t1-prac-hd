import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";
import validator from "validator";
import Snackbar from "./Snackbar";
import Button from "@mui/material/Button";
import CTAImage from "../assets/images/cta.jpg";
import { sendWelcomeEmail } from "../api/database";

function HubCTA() {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [receiverEmail, setReceiverEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleReceiverEmailChange = (event) => {
    setReceiverEmail(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault(receiverEmail);
    setIsLoading(true);
    if (validator.isEmail(receiverEmail)) {
      const response = await sendWelcomeEmail(receiverEmail);
      if (response.success) {
        setMessage(`${response.message}`);
        setOpenSnackBar(true);
      } else {
        setMessage(`${response.message}`);
        setOpenSnackBar(true);
      }
    } else {
      setMessage("Please input valide email!");
      setOpenSnackBar(true);
    }
    setIsLoading(false);
    setReceiverEmail('');
  };
  const handleClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: "flex", mb: 10 }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "white",
              py: 8,
              px: 3,
              border: 2,
              borderColor: "#2196f3",
              borderRadius: 2,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{ color: "#2196f3" }}
              >
                Explore Future
              </Typography>
              <Typography variant="h5" sx={{ color: "#2196f3" }}>
                Push the World Forward Together
              </Typography>
              <TextField
              
                fullWidth
                id="receiverEmail"
                label="Your Email"
                name="receiverEmail"
                sx={{
                  width: "100%",
                  mt: 3,
                  mb: 2,
                  
                }}
                value={receiverEmail}
                onChange={handleReceiverEmailChange}
                disabled={isLoading}
              />
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                disabled={isLoading}
                sx={{
                  width: "100%",
                  border: 2,
                  fontWeight: "bold",
                  p: 1,
                  "&:hover": {
                    border: 2,
                  },
                }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
            }}
          />
          <Box
            component="img"
            src={CTAImage}
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackBar}
        closeFunc={handleClose}
        message={message}
        onClose={handleClose}
      />
    </Container>
  );
}

export default HubCTA;
