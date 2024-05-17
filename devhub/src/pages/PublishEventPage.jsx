import * as React from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { useState } from "react";
import { publishNewEvent } from "../api/database";
import { useParams } from "react-router-dom";
import Snackbar from "../components/Snackbar";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function PublishEventPage() {
  const { currentUser } = useContext(UserContext);
  const [imageName, setImageName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setImageName(imageFile.name);
      let reader = new FileReader();
      reader.onload = (e) => {
        setEvent((prevEvent) => ({
          ...prevEvent,
          image: e.target.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const [event, setEvent] = React.useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    content: "",
    image: "",
  });
  const handleDateChange = (newValue) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      date: newValue.format("YYYY-MM-DD"),
    }));
  };
  const handleStartTimeChange = (newValue) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      startTime: newValue.format("HH:mm"),
    }));
  };

  const handleEndTimeChange = (newValue) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      endTime: newValue.format("HH:mm"),
    }));
  };

  const handleChange = (prop) => (value) => {
    setEvent({ ...event, [prop]: value });
  };
  const { uid } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await publishNewEvent(
      {
        ...event,
        organizerID: `${uid}`,
        participantIDs: [`${uid}`],
        participantNumber: 1,
      },
      currentUser.token
    );
    if (response.success) {
      navigate("/event");
    } else {
      setMessage(`${response.message}`);
      setOpen(true);
    }
  };

  return (
    <>
      <Container sx={{ mt: 2, mb: 2 }}>
        <Banner content="Publish Events" />
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Event Title"
            name="title"
            autoFocus
            onChange={(e) => handleChange("title")(e.target.value)}
          />
          <Box sx={{ mb: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Date" onChange={handleDateChange} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <TimePicker
                  label="Start Time"
                  onChange={handleStartTimeChange}
                />
                <TimePicker label="End Time" onChange={handleEndTimeChange} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Localtion"
            name="localtion"
            onChange={(e) => handleChange("location")(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            onChange={(e) => handleChange("description")(e.target.value)}
          />
          <Box sx={{ mt: 1 }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                Upload Image
              </Button>
            </label>
            {imageName && (
              <div style={{ marginTop: 20 }}>File: {imageName}</div>
            )}
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Content"
            name="content"
            multiline
            rows={6}
            onChange={(e) => handleChange("content")(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Publish Now
          </Button>
        </form>
      </Container>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message={message}
        onClose={handleClose}
      />
      <Footer />
    </>
  );
}
