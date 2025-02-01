import { Route, Routes } from 'react-router-dom';
import { Header } from './components/ui/header'
import { Home } from './pages/home';
import { Calendar } from './pages/calendar';
import { Graphics } from './pages/graphics-revenue';
import { Map } from './pages/map-competitors';
import { Revenue } from './pages/overview-revenue';
import { Footer } from './components/ui/footer';
import { ScrollToTopButton } from './components/ui/button-scroll-up';
import { RevenueLayout } from './layouts/revenue-layout';

function App() {
  return (
    <>
      <Header />
      <div className='bg-slate-200 flex flex-col min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<RevenueLayout />}>
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/graphics" element={<Graphics />} />
          </Route>
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App;