import './App.css'
import { Header } from './components/header'
import { Home } from './pages/home';
import { Calendar } from './pages/calendar';
import { Graphics } from './pages/graphics-revenue';
import { Map } from './pages/map-competitors';
import { Revenue } from './pages/revenue-overview';
import { Footer } from './components/footer';
import { Route, Routes } from 'react-router-dom';
import { ScrollToTopButton } from './components/ScrollTopButton';

function App() {
  return (
    <>
      <Header />
      <div className='bg-slate-200 flex flex-col min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/revenue' element={<Revenue />} />
          <Route path='/graphics' element={<Graphics />} />
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