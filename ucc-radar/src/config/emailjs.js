// ── EmailJS Credentials ─────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add a service → connect your Gmail account → copy the Service ID below
// 3. Create a template → copy the Template ID below
//    Template variables to include in your template body:
//      {{vendor_name}}, {{owner_name}}, {{vendor_type}}, {{category}},
//      {{phone}}, {{whatsapp}}, {{email}}, {{location}},
//      {{open_hours}}, {{delivery}}, {{description}}, {{message}}
// 4. Account → API Keys → copy the Public Key below

export const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_5xhkm9o';
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_1jdggjp';
export const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'u1wOXc1k5AxVH6eG8';
