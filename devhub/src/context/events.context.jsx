import { createContext, useState } from "react";
export const EventsContext = createContext(
    {
        currentEvents: [],
        setCurrentEvents: () => {}
    }
);
export const EventsProvider = ({ children }) => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const value = { currentEvents, setCurrentEvents };
    return (<EventsContext.Provider value={value}>{children}</EventsContext.Provider>)
}