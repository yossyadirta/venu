import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { EventDetail } from './EventDetail';
import { ExploreEvents } from './ExploreEvents';
import { NotFound } from './NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<ExploreEvents />} />
      <Route path="/events/:slug" element={<EventDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
