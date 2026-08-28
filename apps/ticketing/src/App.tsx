import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TicketingFlow } from './TicketingFlow';
import { NotFound } from './NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/:slug" element={<TicketingFlow />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
