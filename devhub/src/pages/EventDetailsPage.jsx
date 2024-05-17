import React, { useEffect } from "react";
import EventDetailsHero from "../components/EventDetailsHero";
import Footer from "../components/Footer";
import EventDetailsContent from "../components/EventDetailsContent";
import HubCTA from "../components/HubCTA";
import Banner from "../components/Banner";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { EventsContext } from "../context/events.context";
export default function EventDetailsPage() {
  const { currentEvents } = useContext(EventsContext);
  const [currentEvent, setCurrentEvent] = React.useState([]);
  const { eid } = useParams();
  useEffect(() => {
    const eventById = currentEvents.find((event) => event._id === eid);
    setCurrentEvent(eventById);
  }, [eid, currentEvents]);
  return (
    <>
      <EventDetailsHero
        title={currentEvent.title}
        date={currentEvent.date}
        startTime={currentEvent.startTime}
        endTime={currentEvent.endTime}
        location={currentEvent.location}
        src={currentEvent.image}
      />
      <EventDetailsContent
        content={currentEvent.content}
        organizerID={currentEvent.organizerID}
        participantIDs={currentEvent.participantIDs}
        eid={eid}
      />
      <Banner content="More Other Events" />
      <HubCTA />
      <Footer />
    </>
  );
}
