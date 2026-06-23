import { useState } from 'react';
import {
  Store,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
  UtensilsCrossed,
  GraduationCap,
  Clock,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { saveVendorAsPending } from '../data/vendors';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80';

const benefits = [
  {
    icon: <Store size={20} />,
    title: 'Free Digital Presence',
    desc: 'Your vendor page, menu, and contact info — completely free to list and maintain.',
  },
  {
    icon: <User size={20} />,
    title: 'Reach More Students',
    desc: 'UCC Radar is used by thousands of students daily. Get discovered without any marketing cost.',
  },
  {
    icon: <MessageSquare size={20} />,
    title: 'Direct WhatsApp Orders',
    desc: 'Students contact you directly on WhatsApp — no third-party platform, no commission cuts.',
  },
  {
    icon: <CheckCircle size={20} />,
    title: 'Easy & Quick Setup',
    desc: "Fill the form and we'll get your vendor listed within 48 hours, ready to receive customers.",
  },
];

const vendorCategories = {
  food: [
    { value: 'local',      label: 'Local Dishes' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'fast_food',  label: 'Fast Food' },
    { value: 'cafe',       label: 'Cafés & Drinks' },
    { value: 'chinese',    label: 'Chinese / Intl' },
  ],
  student: [
    { value: 'printing',  label: 'Printing & Stationery' },
    { value: 'beauty',    label: 'Hair & Beauty' },
    { value: 'tech',      label: 'Tech Services' },
    { value: 'clothing',  label: 'Clothing & Accessories' },
    { value: 'tutoring',  label: 'Tutoring & Academic' },
  ],
};

const labelClass = 'block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2';
const inputBase = 'w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/20 transition-all';
const inputClass = `${inputBase} px-4`;
const inputIconClass = `${inputBase} pl-9 pr-4`;
const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-white/40';

export default function Contact() {
  const [vendorType, setVendorType] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [form, setForm] = useState({
    vendorName: '', ownerName: '', phone: '', whatsapp: '',
    email: '', location: '', category: '', openHours: '',
    delivery: '', description: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleVendorTypeChange = (type) => {
    setVendorType(type);
    setForm((f) => ({ ...f, category: '' }));
    setCategoryError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorType) return;
    if (!form.category) { setCategoryError('Please select a category before submitting.'); return; }
    setCategoryError('');
    setSendError('');
    setSending(true);
    try {
      await saveVendorAsPending({ ...form, vendorType });
    } catch (err) {
      setSendError(`Could not save your request: ${err?.message || 'Unknown error'}. Please try again.`);
      setSending(false);
      return;
    }
    setSending(false);
    setSubmitted(true);
  };

  const bgStyle = { backgroundImage: `url('${BG_IMAGE}')` };

  if (submitted) {
    return (
      <div className="pt-16 relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-cover bg-center" style={bgStyle} />
        <div className="absolute inset-0 bg-[#172554]/85" />
        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-400/40">
            <Clock size={40} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Request Submitted!</h2>
          <p className="text-white/75 mb-2 leading-relaxed">
            Thank you, <strong className="text-white">{form.ownerName}</strong>! Your listing request for{' '}
            <strong className="text-white">{form.vendorName}</strong> has been received.
          </p>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            Our team will <strong className="text-white">verify your details</strong> before your vendor goes live. We'll reach out within <strong className="text-white">48 hours</strong> via phone or WhatsApp.
          </p>
          {sendError && (
            <p className="text-xs text-amber-300 bg-amber-500/20 px-3 py-2 rounded-lg mb-4 border border-amber-400/20">{sendError}</p>
          )}
          <button
            onClick={() => {
              setSubmitted(false); setVendorType(''); setSendError('');
              setForm({ vendorName: '', ownerName: '', phone: '', whatsapp: '', email: '', location: '', category: '', openHours: '', delivery: '', description: '', message: '' });
            }}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={bgStyle} />
      <div className="absolute inset-0 bg-[#172554]/85" />

      <div className="relative z-10">
        {/* Hero */}
        <div className="text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <UtensilsCrossed size={28} className="text-amber-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">List Your Vendor</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Join the UCCRadar directory and get your food business in front of thousands of UCC students — for free.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
                <h2 className="text-lg font-black text-white mb-5">Why Get Listed?</h2>
                <div className="flex flex-col gap-5">
                  {benefits.map(({ icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400 shrink-0 border border-white/10">
                        {icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                        <p className="text-xs text-white/55 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/20 backdrop-blur-md rounded-2xl p-6 border border-amber-400/30">
                <h3 className="font-bold text-white text-base mb-2">Have Questions?</h3>
                <p className="text-sm text-white/65 mb-4 leading-relaxed">
                  Reach out directly and we'll help you get set up as quickly as possible.
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=joshuamcclerf@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Mail size={14} />
                  joshuamcclerf@gmail.com
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15">
                <h2 className="text-xl font-black text-white mb-6">Vendor Listing Request</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Vendor Type */}
                  <div>
                    <label className={labelClass}>Vendor Type *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'food', label: 'Food Vendor', icon: <UtensilsCrossed size={20} />, desc: 'Restaurant, café, fast food, etc.' },
                        { value: 'student', label: 'Student Vendor', icon: <GraduationCap size={20} />, desc: 'Services, products, skills, etc.' },
                      ].map(({ value, label, icon, desc }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleVendorTypeChange(value)}
                          className={`flex flex-col items-center gap-2 py-5 px-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                            vendorType === value
                              ? 'border-amber-400 bg-amber-500/20 text-white'
                              : 'border-white/20 text-white/70 hover:border-white/40'
                          }`}
                        >
                          <span className={vendorType === value ? 'text-amber-400' : 'text-white/50'}>{icon}</span>
                          <span className="font-bold text-sm">{label}</span>
                          <span className="text-xs text-white/40 leading-snug">{desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Vendor / Business Name *</label>
                      <div className="relative">
                        <Store size={15} className={iconClass} />
                        <input type="text" name="vendorName" value={form.vendorName} onChange={handleChange} required placeholder="e.g. Mama's Kitchen" className={inputIconClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Your Full Name *</label>
                      <div className="relative">
                        <User size={15} className={iconClass} />
                        <input type="text" name="ownerName" value={form.ownerName} onChange={handleChange} required placeholder="Owner's name" className={inputIconClass} />
                      </div>
                    </div>
                  </div>

                  {/* Contact numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <div className="relative">
                        <Phone size={15} className={iconClass} />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+233 XX XXX XXXX" className={inputIconClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>WhatsApp Number *</label>
                      <div className="relative">
                        <MessageSquare size={15} className={iconClass} />
                        <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} required placeholder="+233 XX XXX XXXX" className={inputIconClass} />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address (optional)</label>
                    <div className="relative">
                      <Mail size={15} className={iconClass} />
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputIconClass} />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className={labelClass}>Vendor Location / Address *</label>
                    <div className="relative">
                      <MapPin size={15} className={iconClass} />
                      <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Near the student hostel, UCC" className={inputIconClass} />
                    </div>
                  </div>

                  {/* Category */}
                  {vendorType && (
                    <div>
                      <label className={labelClass}>
                        {vendorType === 'food' ? 'Food Category' : 'Service Category'} *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {vendorCategories[vendorType].map(({ value, label }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => { setForm((f) => ({ ...f, category: value })); setCategoryError(''); }}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                              form.category === value
                                ? 'border-amber-400 bg-amber-500/20 text-white'
                                : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      {categoryError && <p className="text-xs text-amber-400 mt-2">{categoryError}</p>}
                    </div>
                  )}

                  {/* Open Hours */}
                  <div>
                    <label className={labelClass}>
                      <Clock size={11} className="inline mr-1" />
                      Opening Hours *
                    </label>
                    <input type="text" name="openHours" value={form.openHours} onChange={handleChange} required placeholder="e.g. Mon–Sat: 7am – 8pm" className={inputClass} />
                  </div>

                  {/* Delivery */}
                  <div>
                    <label className={labelClass}>
                      <Truck size={11} className="inline mr-1" />
                      Do You Offer Campus Delivery? *
                    </label>
                    <div className="flex gap-3">
                      {['Yes, I offer delivery', 'No, dine-in only'].map((opt) => (
                        <label
                          key={opt}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 cursor-pointer text-sm font-medium transition-colors ${
                            form.delivery === opt
                              ? 'border-amber-400 bg-amber-500/20 text-white'
                              : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                          }`}
                        >
                          <input type="radio" name="delivery" value={opt} checked={form.delivery === opt} onChange={handleChange} className="hidden" required />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className={labelClass}>Describe Your Vendor *</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell students what makes your food special — your signature dishes, what makes you unique, etc."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Additional Message (optional)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any other information you'd like us to know..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {sendError && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-xs text-red-300">
                      <AlertCircle size={14} />
                      {sendError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-600/50 text-white font-bold text-base rounded-2xl transition-colors shadow-lg mt-2"
                  >
                    {sending ? 'Submitting…' : 'Submit Listing Request →'}
                  </button>
                  <p className="text-xs text-white/35 text-center">
                    By submitting, you agree to allow UCC Radar to display your vendor information on the platform. Listing is free and requires approval.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
