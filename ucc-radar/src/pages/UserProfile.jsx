import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Calendar, Heart, LogOut, Pencil, Check, X, Star, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSavedVendors } from '../context/SavedVendorsContext';
import { vendors, getApprovedVendors } from '../data/vendors';
import { supabase } from '../config/supabase';

const BG = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80';

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { savedIds } = useSavedVendors();
  const [allVendors, setAllVendors] = useState([...vendors]);
  const [displayName, setDisplayName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const name = user.user_metadata?.full_name || '';
    setDisplayName(name);
    setNameInput(name);
    getApprovedVendors().then(approved => setAllVendors([...vendors, ...approved])).catch(() => {});
  }, [user]);

  if (!user) return null;

  const savedVendors = allVendors.filter(v => savedIds.has(v.id));
  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();
  const joinDate = new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  async function saveName() {
    setSavingName(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: nameInput.trim() } });
    if (!error) setDisplayName(nameInput.trim());
    setEditingName(false);
    setSavingName(false);
  }

  return (
    <div className="pt-16 min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${BG}')`, filter: 'blur(20px)', transform: 'scale(1.08)' }}
        />
        <div className="absolute inset-0 bg-[#0a1628]/80" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-amber-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0">
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              {editingName ? (
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                  <input
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveName();
                      if (e.key === 'Escape') { setEditingName(false); setNameInput(displayName); }
                    }}
                    className="bg-white/10 border border-white/30 rounded-xl px-3 py-1.5 text-white text-lg font-bold focus:outline-none focus:border-amber-400 min-w-0 flex-1 max-w-xs"
                  />
                  <button onClick={saveName} disabled={savingName} className="p-1.5 text-green-400 hover:text-green-300 shrink-0">
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => { setEditingName(false); setNameInput(displayName); }}
                    className="p-1.5 text-white/40 hover:text-white/70 shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                  <h1 className="text-2xl font-black text-white truncate">
                    {displayName || user.email.split('@')[0]}
                  </h1>
                  <button
                    onClick={() => setEditingName(true)}
                    className="p-1.5 text-white/30 hover:text-amber-400 transition-colors shrink-0"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 text-white/50 text-sm mb-1 justify-center sm:justify-start">
                <Mail size={13} />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/35 text-xs justify-center sm:justify-start">
                <Calendar size={12} />
                Joined {joinDate}
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={() => { signOut(); navigate('/'); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/15 hover:border-red-400/30 text-white/60 hover:text-red-400 text-sm font-semibold transition-all shrink-0"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <p className="text-3xl font-black text-red-400">{savedIds.size}</p>
              <p className="text-white/50 text-xs mt-1 font-semibold">Saved Vendors</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-green-400">
                {user.email_confirmed_at ? '✓ Verified' : 'Unverified'}
              </p>
              <p className="text-white/50 text-xs mt-1 font-semibold">Email Status</p>
            </div>
          </div>
        </div>

        {/* Saved Vendors */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-5">
            <Heart size={18} className="text-red-400 fill-red-400" />
            <h2 className="text-lg font-black text-white">Saved Vendors</h2>
            {savedVendors.length > 0 && (
              <span className="ml-auto text-xs text-white/40 font-medium">{savedVendors.length} saved</span>
            )}
          </div>

          {savedVendors.length === 0 ? (
            <div className="text-center py-10">
              <Heart size={36} className="text-white/15 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No saved vendors yet.</p>
              <Link
                to="/vendors"
                className="inline-block mt-4 px-5 py-2 bg-[#1E3A8A] hover:bg-[#172554] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Browse Vendors
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {savedVendors.map(v => (
                <Link
                  key={v.id}
                  to={`/vendors/${v.id}`}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{v.name}</p>
                    <p className="text-white/50 text-xs truncate">{v.location}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-amber-400 text-xs font-semibold">
                        {v.rating.rate.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors text-lg">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Vendor link */}
        <div className="text-center">
          <Link to="/vendor-dashboard" className="text-white/30 hover:text-amber-400 text-sm transition-colors">
            Are you a vendor?{' '}
            <span className="underline underline-offset-2">Manage your listing →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
