import React, { Suspense } from 'react';

// @ts-ignore
const DiscoveryApp = React.lazy(() => import('discovery/App'));

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <DiscoveryApp />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
