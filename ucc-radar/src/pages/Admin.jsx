import { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, ShieldCheck, Lock } from 'lucide-react';
import { getPendingVendors, getApprovedVendors, approveVendor, rejectVendor } from '../data/vendors';

const ADMIN_PASSWORD = 'ucc2025';

const categoryLabel = {
  local: 'Local Dishes', restaurant: 'Restaurant', fast_food: 'Fast Food',
  cafe: 'Cafés & Drinks', chinese: 'Chinese / International',
  printing: 'Printing & Stationery', beauty: 'Hair & Beauty',
  tech: 'Tech Services', clothing: 'Clothing & Accessories', tutoring: 'Tutoring & Academic',
};

function VendorRow({ vendor, onApprove, onReject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-4 p-5">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-14 h-14 rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{vendor.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {categoryLabel[vendor.category] || vendor.category} · {vendor.location}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onApprove(vendor.id)}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            <CheckCircle size={13} />
            Approve
          </button>
          <button
            onClick={() => onReject(vendor.id)}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition-colors border border-red-100"
          >
            <XCircle size={13} />
            Reject
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-50 px-5 pb-5 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            ['Owner',         vendor.contact],
            ['Phone',         vendor.contact],
            ['WhatsApp',      `+${vendor.whatsapp}`],
            ['Email',         vendor.email || '—'],
            ['Opening Hours', vendor.openHours],
            ['Delivery',      vendor.delivery ? `Yes — ${vendor.deliveryFee}` : 'No'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-gray-700 break-words">{value}</p>
            </div>
          ))}
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Description</p>
            <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [password, setPassword]     = useState('');
  const [authenticated, setAuth]    = useState(false);
  const [wrongPassword, setWrong]   = useState(false);
  const [pending, setPending]       = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      try {
        const [pendingData, approvedData] = await Promise.all([
          getPendingVendors(),
          getApprovedVendors(),
        ]);
        setPending(pendingData);
        setApprovedCount(approvedData.length);
      } catch {
        setPending([]);
      }
    } else {
      setWrong(true);
    }
  };

  const handleApprove = async (id) => {
    await approveVendor(id);
    setPending((prev) => prev.filter((v) => v.id !== id));
    setApprovedCount((n) => n + 1);
  };

  const handleReject = async (id) => {
    await rejectVendor(id);
    setPending((prev) => prev.filter((v) => v.id !== id));
  };

  if (!authenticated) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Admin Panel</h2>
          <p className="text-sm text-gray-400 mb-6">UCC Radar vendor management</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setWrong(false); }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            {wrongPassword && (
              <p className="text-xs text-red-500">Incorrect password. Try again.</p>
            )}
            <button
              type="submit"
              className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-400">{approvedCount} vendor{approvedCount !== 1 ? 's' : ''} approved · {pending.length} pending review</p>
          </div>
        </div>

        {/* Pending list */}
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle size={48} className="text-emerald-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">All caught up!</h3>
            <p className="text-gray-400">No pending vendor requests right now.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Pending Requests ({pending.length})
            </h2>
            {pending.map((vendor) => (
              <VendorRow
                key={vendor.id}
                vendor={vendor}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
