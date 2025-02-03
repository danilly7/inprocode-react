import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/ui/header'
import { Footer } from './components/ui/footer';
import { ScrollToTopButton } from './components/ui/button-scroll-up';

const Home = React.lazy(() => import('./pages/home'));
const Calendar = React.lazy(() => import('./pages/calendar-bank-holidays'));
const Graphics = React.lazy(() => import('./pages/graphics-revenue'));
const Map = React.lazy(() => import('./pages/map-competitors'));
const Revenue = React.lazy(() => import('./pages/overview-revenue'));
const RevenueLayout = React.lazy(() => import('./layouts/revenue-layout'));
const CompetitorsLayout = React.lazy(() => import('./layouts/competitors-layout'));
const CalendarLayout = React.lazy(() => import('./layouts/calendar-layout'));

import Spinner from './components/ui/spinner';

function App() {
  return (
    <>
      <Header />

      <div className='bg-slate-200 flex flex-col min-h-screen'>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route element={<RevenueLayout />}>
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/graphics" element={<Graphics />} />
            </Route>

            <Route element={<CalendarLayout />}>
              <Route path='/calendar' element={<Calendar />} />
            </Route>

            <Route element={<CompetitorsLayout />}>
              <Route path='/map' element={<Map />} />
            </Route>
          </Routes>
        </Suspense>
      </div>

      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App;