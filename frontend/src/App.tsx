import React, { Suspense } from 'react';
import Spinner from './components/ui/spinner';

import { Header } from './components/ui/header';
import { Footer } from './components/ui/footer';
import { ScrollToTopButton } from './components/ui/button-scroll-up';
import { routes } from './routes';

import RouteRenderer from './routes/RouteRenderer';
import { RouteObject } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <div className="bg-slate-200 flex flex-col min-h-screen">
        <Suspense fallback={<Spinner />}>
          <RouteRenderer routes={routes as RouteObject[]} />
        </Suspense>
      </div>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default App;