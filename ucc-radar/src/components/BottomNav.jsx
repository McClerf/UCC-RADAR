import { NavLink } from 'react-router-dom';
import { Home, Store, Navigation, Heart, UserCircle } from 'lucide-react';
import { useSavedVendors } from '../context/SavedVendorsContext';

const tabs = [
  { to: '/',        label: 'Home',    Icon: Home,        end: true },
  { to: '/vendors', label: 'Vendors', Icon: Store,        end: false },
  { to: '/map',     label: 'Map',     Icon: Navigation,   end: false },
  { to: '/saved',   label: 'Saved',   Icon: Heart,        end: false },
  { to: '/profile', label: 'Profile', Icon: UserCircle,   end: false },
];

export default function BottomNav() {
  const { count } = useSavedVendors();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex items-stretch h-16">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors ${
                isActive ? 'text-[#1E3A8A]' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1E3A8A] rounded-full" />
                )}
                <div className="relative">
                  <Icon
                    size={22}
                    className={Icon === Heart && count > 0 ? 'fill-red-500 text-red-500' : ''}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  {Icon === Heart && count > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center px-0.5 leading-none">
                      {count > 9 ? '9+' : count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-semibold leading-none ${isActive ? 'text-[#1E3A8A]' : 'text-gray-400'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      {/* Safe area spacer for phones with home bar */}
      <div className="h-safe-bottom bg-white/95" style={{ height: 'env(safe-area-inset-bottom)' }} />
    </nav>
  );
}
