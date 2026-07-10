import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Vendors from './pages/Vendors';
import VendorDetails from './pages/VendorDetails';
import SavedVendors from './pages/SavedVendors';
import CampusMap from './pages/CampusMap';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { SavedVendorsProvider } from './context/SavedVendorsContext';
import { RatingsProvider } from './context/RatingsContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import VendorDashboard from './pages/VendorDashboard';
import BottomNav from './components/BottomNav';

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
    <LocationProvider>
    <RatingsProvider>
    <SavedVendorsProvider>
      <Routes>
        {/* Full-screen standalone pages — no header/footer */}
        <Route path="/login" element={<Login />} />

        {/* Protected pages — require sign in */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/saved" element={<SavedVendors />} />
          <Route path="/map" element={<CampusMap />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        </Route>
      </Routes>
    </SavedVendorsProvider>
    </RatingsProvider>
    </LocationProvider>
    </AuthProvider>
  );
}

export default App;
