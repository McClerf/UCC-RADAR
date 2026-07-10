import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Store, MapPin, Clock, Phone, Save, AlertCircle,
  CheckCircle, Pencil, MessageCircle, RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';

const BG = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80';

const CATEGORIES = [
  { value: 'local',      label: 'Local Dishes' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'fast_food',  label: 'Fast Food' },
  { value: 'cafe',       label: 'Café & Drinks' },
  { value: 'chinese',    label: 'Chinese / International' },
  { value: 'printing',   label: 'Printing & Stationery' },
  { value: 'beauty',     label: 'Hair & Beauty' },
  { value: 'tech',       label: 'Tech Services' },
  { value: 'clothing',   label: 'Clothing & Accessories' },
  { value: 'tutoring',   label: 'Tutoring & Academic' },
];

const inputCls =
  'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400/60 transition-all placeholder-white/30';

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ icon, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <span className="text-white/70 leading-snug">{value}</span>
    </div>
  );
}

export default function VendorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchSubmission();
  }, [user]);

  async function fetchSubmission() {
    setLoading(true);
    const { data } = await supabase
      .from('vendor_submissions')
      .select('*')
      .eq('email', user.email)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    setSubmission(data || null);
    if (data) {
      setForm({
        name:        data.name || '',
        description: data.description || '',
        location:    data.location || '',
        phone:       data.phone || '',
        whatsapp:    data.whatsapp || '',
        open_hours:  data.open_hours || '',
        category:    data.category || 'local',
      });
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const { error } = await supabase
      .from('vendor_submissions')
      .update(form)
      .eq('id', submission.id);
    if (error) {
      setMsg({ type: 'error', text: `Could not save: ${error.message}` });
    } else {
      setMsg({ type: 'success', text: 'Listing updated successfully!' });
      setSubmission({ ...submission, ...form });
      setEditing(false);
    }
    setSaving(false);
  }

  if (!user) return null;

  return (
    <div className="pt-16 min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${BG}')`, filter: 'blur(20px)', transform: 'scale(1.08)' }}
        />
        <div className="absolute inset-0 bg-[#0a1628]/82" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-1">Vendor Dashboard</h1>
          <p className="text-white/50 text-sm">Manage your UCC Radar listing</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submission ? (
          /* ── Has a listing ── */
          <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8">

            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-black text-white">{submission.name}</h2>
                <p className="text-white/50 text-sm mt-0.5">{submission.location}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-400/25 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active Listing
                </span>
              </div>
              <button
                onClick={() => { setEditing(!editing); setMsg(null); }}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-400 text-sm font-semibold rounded-xl transition-all shrink-0"
              >
                <Pencil size={14} />
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {/* Message */}
            {msg && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4 ${
                msg.type === 'success'
                  ? 'bg-green-500/20 border border-green-400/30 text-green-300'
                  : 'bg-red-500/20 border border-red-400/30 text-red-300'
              }`}>
                {msg.type === 'success'
                  ? <CheckCircle size={15} />
                  : <AlertCircle size={15} />}
                {msg.text}
              </div>
            )}

            {editing ? (
              /* ── Edit form ── */
              <div className="flex flex-col gap-4">
                <Field label="Vendor Name">
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Location">
                    <input
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Category">
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className={`${inputCls} bg-[#172554]`}
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Phone">
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="WhatsApp Number">
                    <input
                      value={form.whatsapp}
                      onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="233..."
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Open Hours">
                  <input
                    value={form.open_hours}
                    onChange={e => setForm({ ...form, open_hours: e.target.value })}
                    placeholder="Mon–Fri: 7am–8pm, Sat: 9am–5pm"
                    className={inputCls}
                  />
                </Field>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors mt-1"
                >
                  <Save size={16} />
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            ) : (
              /* ── View mode ── */
              <div className="flex flex-col gap-3">
                <InfoRow
                  icon={<MapPin size={15} className="text-amber-400" />}
                  value={submission.location}
                />
                <InfoRow
                  icon={<Clock size={15} className="text-amber-400" />}
                  value={submission.open_hours || 'Open hours not set'}
                />
                <InfoRow
                  icon={<Phone size={15} className="text-amber-400" />}
                  value={submission.phone}
                />
                {submission.whatsapp && (
                  <InfoRow
                    icon={<MessageCircle size={15} className="text-green-400" />}
                    value={`+${submission.whatsapp}`}
                  />
                )}
                {submission.description && (
                  <p className="text-white/60 text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                    {submission.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ── No listing found ── */
          <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Store size={30} className="text-white/30" />
            </div>
            <h2 className="text-xl font-black text-white mb-2">No Vendor Listing Found</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-1 max-w-sm mx-auto">
              We couldn't find an approved listing linked to{' '}
              <span className="text-white/75 font-medium">{user.email}</span>.
            </p>
            <p className="text-white/35 text-xs mb-7 max-w-xs mx-auto">
              Use the same email you signed up with when submitting your vendor. If you already submitted, it may still be under review.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-colors"
              >
                <Store size={16} />
                List My Vendor
              </Link>
              <button
                onClick={fetchSubmission}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                <RefreshCw size={15} />
                Refresh Status
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 text-center">
          <Link to="/profile" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
