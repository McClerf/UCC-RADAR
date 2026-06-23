import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Vendors from './pages/Vendors';
import VendorDetails from './pages/VendorDetails';
import SavedVendors from './pages/SavedVendors';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { SavedVendorsProvider } from './context/SavedVendorsContext';

function App() {
  return (
    <SavedVendorsProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/:id" element={<VendorDetails />} />
            <Route path="/saved" element={<SavedVendors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SavedVendorsProvider>
  );
}

export default App;
