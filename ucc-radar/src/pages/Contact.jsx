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

export default function Contact() {
  const [vendorType, setVendorType] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [form, setForm] = useState({
    vendorName: '',
    ownerName: '',
    phone: '',
    whatsapp: '',
    email: '',
    location: '',
    category: '',
    openHours: '',
    delivery: '',
    description: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVendorTypeChange = (type) => {
    setVendorType(type);
    setForm((f) => ({ ...f, category: '' }));
    setCategoryError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorType) return;
    if (!form.category) {
      setCategoryError('Please select a category before submitting.');
      return;
    }
    setCategoryError('');
    setSendError('');
    setSending(true);

    try {
      await saveVendorAsPending({ ...form, vendorType });
    } catch {
      setSendError('Could not save your request. Please try again.');
      setSending(false);
      return;
    }
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock size={40} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Request Submitted!</h2>
          <p className="text-gray-500 mb-2 leading-relaxed">
            Thank you, <strong>{form.ownerName}</strong>! Your listing request for{' '}
            <strong>{form.vendorName}</strong> has been received.
          </p>
          <p className="text-gray-500 text-sm mb-2 leading-relaxed">
            Our team will <strong>verify your details</strong> before your vendor goes live on UCC Radar. We'll reach out within <strong>48 hours</strong> via phone or WhatsApp once you're approved.
          </p>
          {sendError && (
            <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-4">{sendError}</p>
          )}
          <button
            onClick={() => {
              setSubmitted(false);
              setVendorType('');
              setSendError('');
              setForm({ vendorName: '', ownerName: '', phone: '', whatsapp: '', email: '', location: '', category: '', openHours: '', delivery: '', description: '', message: '' });
            }}
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UtensilsCrossed size={28} className="text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            List Your Vendor
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto leading-relaxed">
            Join the UCCRadar directory and get your food business in front of thousands of UCC students — for free.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-gray-900 mb-5">Why Get Listed?</h2>
              <div className="flex flex-col gap-5">
                {benefits.map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-base mb-2">Have Questions?</h3>
              <p className="text-sm text-emerald-100 mb-4 leading-relaxed">
                Reach out directly and we'll help you get set up as quickly as possible.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=joshuamcclerf@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-200 transition-colors"
              >
                <Mail size={14} />
                joshuamcclerf@gmail.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-6">Vendor Listing Request</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Vendor Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Vendor Type *
                  </label>
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
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-500 hover:border-emerald-300'
                        }`}
                      >
                        <span className={vendorType === value ? 'text-emerald-600' : 'text-gray-400'}>{icon}</span>
                        <span className="font-bold text-sm">{label}</span>
                        <span className="text-xs text-gray-400 leading-snug">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vendor Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Vendor / Business Name *
                    </label>
                    <div className="relative">
                      <Store size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="vendorName"
                        value={form.vendorName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Mama's Kitchen"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="ownerName"
                        value={form.ownerName}
                        onChange={handleChange}
                        required
                        placeholder="Owner's name"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+233 XX XXX XXXX"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      WhatsApp Number *
                    </label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        required
                        placeholder="+233 XX XXX XXXX"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Email Address (optional)
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Vendor Location / Address *
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Near the student hostel, UCC"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Category Picker — shows after vendor type is chosen */}
                {vendorType && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
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
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {categoryError && <p className="text-xs text-red-500 mt-2">{categoryError}</p>}
                  </div>
                )}

                {/* Open Hours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    <Clock size={11} className="inline mr-1" />
                    Opening Hours *
                  </label>
                  <input
                    type="text"
                    name="openHours"
                    value={form.openHours}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Mon–Sat: 7am – 8pm"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Delivery */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    <Truck size={11} className="inline mr-1" />
                    Do You Offer Campus Delivery? *
                  </label>
                  <div className="flex gap-3">
                    {['Yes, I offer delivery', 'No, dine-in only'].map((opt) => (
                      <label
                        key={opt}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 cursor-pointer text-sm font-medium transition-colors ${
                          form.delivery === opt
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value={opt}
                          checked={form.delivery === opt}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Describe Your Vendor *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell students what makes your food special — your signature dishes, what makes you unique, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Additional Message (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any other information you'd like us to know..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                {sendError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                    <AlertCircle size={14} />
                    {sendError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-base rounded-2xl transition-colors shadow-sm mt-2"
                >
                  {sending ? 'Submitting…' : 'Submit Listing Request →'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to allow UCC Radar to display your vendor information on the platform. Listing is free and requires approval.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
