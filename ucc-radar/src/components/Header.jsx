import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Radar, Heart, LogIn, LogOut, User } from 'lucide-react';
import { useSavedVendors } from '../context/SavedVendorsContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/map', label: 'Map' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'List Your Vendor' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { count } = useSavedVendors();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg border-b border-gray-100' : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#1E3A8A] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 group-hover:scale-105 transition-all">
              <Radar size={18} className="text-white" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-black text-gray-900 tracking-tight">UCC</span>
              <span className="text-xl font-black bg-gradient-to-r from-[#1E3A8A] to-amber-500 bg-clip-text text-transparent tracking-tight">Radar</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-[#1E3A8A] font-semibold'
                      : 'text-gray-600 hover:text-[#1E3A8A] hover:bg-gray-50'
                  } ${
                    label === 'List Your Vendor'
                      ? 'ml-2 bg-gradient-to-r from-[#1E3A8A] to-[#172554] hover:from-[#172554] hover:to-[#0f172a] text-white px-5 py-2 rounded-full shadow-md hover:shadow-blue-200 hover:shadow-lg transition-all'
                      : ''
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {/* Saved vendors heart */}
            <Link
              to="/saved"
              aria-label="Saved vendors"
              className="relative ml-1 p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <Heart size={20} className={count > 0 ? 'fill-red-500 text-red-500' : ''} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2 ml-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#1E3A8A] text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  <User size={13} />
                  <span className="max-w-[100px] truncate">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0]}
                  </span>
                </Link>
                <button
                  onClick={signOut}
                  title="Sign out"
                  className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-1 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E3A8A] text-white text-sm font-semibold hover:bg-[#172554] transition-colors shadow-sm"
              >
                <LogIn size={14} />
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {navLinks
            .filter(({ label }) => label === 'About' || label === 'List Your Vendor')
            .map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#1E3A8A] font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${
                    label === 'List Your Vendor'
                      ? 'mt-1 bg-[#1E3A8A] text-white text-center hover:bg-[#172554]'
                      : ''
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
        </div>
      </div>
    </header>
  );
}
