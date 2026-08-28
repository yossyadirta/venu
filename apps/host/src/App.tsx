import React, { Suspense } from 'react';
import 'loka/src/tailwind.css';
import { GlobalNavbar } from './GlobalNavbar';
import { GlobalFooter } from './GlobalFooter';
import { Routes, Route, useLocation } from 'react-router-dom';

// @ts-ignore
const DiscoveryApp = React.lazy(() => import('discovery/App'));
// @ts-ignore
const TicketingApp = React.lazy(() => import('ticketing/App'));
// @ts-ignore
const CheckoutApp = React.lazy(() => import('checkout/App'));

const App = () => {
  const location = useLocation();
  const isImmersiveRoute = location.pathname.startsWith('/checkout') || location.pathname.startsWith('/tickets');

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalNavbar />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/*" element={<DiscoveryApp />} />
            <Route path="/tickets/*" element={<TicketingApp />} />
            <Route path="/checkout/*" element={<CheckoutApp />} />
          </Routes>
        </Suspense>
      </main>
      {!isImmersiveRoute && <GlobalFooter />}
    </div>
  );
};

export default App;
