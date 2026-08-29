import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CheckoutFlow } from './CheckoutFlow';
import { StandaloneTicket } from './StandaloneTicket';
import { NotFound } from './NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/:slug" element={<CheckoutFlow />} />
        <Route path="/ticket/:slug/:id" element={<StandaloneTicket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
