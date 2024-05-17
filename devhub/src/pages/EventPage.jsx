import React from "react";
import Caroursel from "../components/Carousel/Carousel";
import Banner from "../components/Banner";
import EventCardsWindow from "../components/EventCardsWindow";
import Footer from "../components/Footer"
import HubCTA from "../components/HubCTA";
import { useEffect,useContext } from "react";
import { EventsContext } from "../context/events.context";
import { fetchEvents } from "../api/database";
import Snackbar from "../components/Snackbar";
const EventPage = () => {
  const {setCurrentEvents}=useContext(EventsContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEvents();
      if (response.success) {
        setCurrentEvents(response.data);
      } else {
        setMessage(`${response.message}`);
        setOpen(true);
      }
    };
    fetchData();
  }, [setCurrentEvents]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Caroursel />
      <Banner content="UPCOMING EVENTS" />
      <EventCardsWindow/>
      <Banner content="EXPLORE MORE"/>
      <HubCTA/>
      <Footer/>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message={message}
        onClose={handleClose}
      />
    </>
  );
};
export default EventPage;
