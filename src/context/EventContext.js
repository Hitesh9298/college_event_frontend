import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);

  const addEvent = (event) => {
    setEvents(prev => [...prev, event]);
  };

  const saveEvent = (event) => {
    setSavedEvents(prev => [...prev, event]);
  };

  return (
    <EventContext.Provider value={{ events, savedEvents, addEvent, saveEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};