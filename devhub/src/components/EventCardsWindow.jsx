import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Container } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { EventsContext } from "../context/events.context";
import { useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
export default function EventCardsWindow() {
  const navigate = useNavigate();
  const { currentEvents } = useContext(EventsContext);
  const [alignment, setAlignment] = React.useState("show_all");
  const [search, setSearch] = React.useState("");
  const handleCardClick = (eventId) => {
    navigate(`/event/details/${eventId}`);
  };
  const renderSkeletons = () => {
    let skeletons = [];
    for (let i = 0; i < 4; i++) {
      skeletons.push(
        <Card key={i}>
          <Skeleton animation="wave" variant="rectangular" height={200} />
          <Skeleton
            animation="wave"
            variant="text"
            width={80}
            sx={{ ml: 1, mr: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={50}
            sx={{ ml: 1, mr: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={200}
            sx={{ ml: 1, mr: 1 }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={100}
            sx={{ ml: 1, mr: 1 }}
          />
        </Card>
      );
    }
    return skeletons;
  };
  const [selectedEvents, setSelectedEvents] = React.useState([]);
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedEvents(
      currentEvents.filter((event) => new Date(event.date) >= today)
    );
    setAlignment("show_all");
    setSearch("");
  }, [currentEvents]);
  const handleAlignment = (event, newAlignment) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let newSelectedEvents;
    switch (newAlignment) {
      case "today":
        newSelectedEvents = currentEvents.filter(
          (event) =>
            new Date(event.date) >= today &&
            new Date(event.date) < new Date(today).setDate(today.getDate() + 1)
        );
        break;
      case "this_week":
        newSelectedEvents = currentEvents.filter(
          (event) =>
            new Date(event.date) >= today && new Date(event.date) <= endOfWeek
        );
        break;
      case "this_month":
        newSelectedEvents = currentEvents.filter(
          (event) =>
            new Date(event.date) >= today && new Date(event.date) <= endOfMonth
        );
        break;
      default:
        newSelectedEvents = currentEvents.filter(
          (event) => new Date(event.date) >= today
        );
    }

    if (search) {
      const regex = new RegExp(search, "i");
      newSelectedEvents = newSelectedEvents.filter(
        (event) => regex.test(event.description) || regex.test(event.title)
      );
    }

    setAlignment(newAlignment);
    setSelectedEvents(newSelectedEvents);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const performSearch = () => {
    console.log("Searching for:", search);
    if (search) {
      const regex = new RegExp(search, "i");
      setSelectedEvents(
        selectedEvents.filter(
          (event) => regex.test(event.description) || regex.test(event.title)
        )
      );
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      setSelectedEvents(
        currentEvents.filter((event) => new Date(event.date) >= today)
      );
      setAlignment("show_all");
    }
  };
  return (
    <Container sx={{ mb: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 6, mt: 8, mb: 8 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          When
        </Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="show_all" aria-label="show all">
            Show all
          </ToggleButton>
          <ToggleButton value="today" aria-label="today">
            Today
          </ToggleButton>
          <ToggleButton value="this_week" aria-label="this week">
            This week
          </ToggleButton>
          <ToggleButton value="this_month" aria-label="this month">
            This month
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          What
        </Typography>
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="Search event"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton onClick={performSearch}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
        {selectedEvents
          ? selectedEvents.map((event, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(event._id)}
              >
                <Card>
                  <CardMedia
                    component="img"
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                    <Divider variant="full" sx={{ mb: 1, mt: 1 }} />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon fontSize="medium" color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {event.date}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {event.startTime}-{event.endTime}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider variant="full" sx={{ mb: 1, mt: 1 }} />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon fontSize="medium" color="primary" />
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {event.location}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            ))
          : renderSkeletons()}
      </Masonry>
    </Container>
  );
}
