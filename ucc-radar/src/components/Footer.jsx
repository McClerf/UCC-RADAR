import { Link } from 'react-router-dom';
import { UtensilsCrossed, MapPin, Mail, Heart } from 'lucide-react';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/vendors', label: 'All Vendors' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'List Your Vendor' },
];

const categories = [
  { to: '/vendors?tab=food&sub=local', label: 'Local Dishes' },
  { to: '/vendors?tab=food&sub=fast_food', label: 'Fast Food' },
  { to: '/vendors?tab=student&sub=printing', label: 'Printing & Stationery' },
  { to: '/vendors?tab=student&sub=beauty', label: 'Hair & Beauty' },
  { to: '/vendors?tab=student&sub=tech', label: 'Tech Services' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                <UtensilsCrossed size={18} className="text-white" />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-black text-white">UCC</span>
                <span className="text-xl font-black text-amber-400">Radar</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your go-to guide for discovering food vendors and student services on the University of Cape Coast campus.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} className="text-emerald-500 shrink-0" />
                University of Cape Coast, Ghana
              </span>
              <a
                href="mailto:joshuamcclerf@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Mail size={14} className="text-emerald-500 shrink-0" />
                joshuamcclerf@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categories
            </h4>
            <ul className="flex flex-col gap-2.5">
              {categories.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              For Vendors
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              A vendor or service provider on UCC campus? Get listed today and reach thousands of students.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Get Listed →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} UCCRadar. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart size={11} className="text-red-400 fill-red-400 mx-1" /> for UCC students
          </p>
        </div>
      </div>
    </footer>
  );
}
