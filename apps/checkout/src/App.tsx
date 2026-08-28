import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CheckoutFlow } from './CheckoutFlow';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/:slug" element={<CheckoutFlow />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
