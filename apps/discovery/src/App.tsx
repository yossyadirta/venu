import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { EventDetail } from './EventDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/events/:slug" element={<EventDetail />} />
    </Routes>
  );
};

export default App;
