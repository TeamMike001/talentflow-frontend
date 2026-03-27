'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { useState, useRef } from 'react';
import { Upload, Eye, EyeOff, Globe, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

// ── Reusable input ────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ placeholder, defaultValue = '', type = 'text', className = '', ...rest }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-primary transition-all placeholder:text-gray-400 ${className}`}
      {...rest}
    />
  );
}

function SocialInput({ icon: Icon, placeholder, color = 'text-gray-400' }) {
  return (
    <div className="relative">
      <Icon size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${color}`} />
      <TextInput placeholder={placeholder} className="pl-9" />
    </div>
  );
}

// ── Notification items ────────────────────────────────────────────────────────
const notifications = [
  { label: 'I want to know who buy my course.',                  defaultChecked: false },
  { label: 'I want to know who write a review on my course.',    defaultChecked: true  },
  { label: 'I want to know who commented on my lecture.',        defaultChecked: false },
  { label: 'I want to know who download my lecture notes.',      defaultChecked: true  },
  { label: 'I want to know who replied on my comment.',          defaultChecked: true  },
  { label: 'I want to know daily how many people visited my profile.', defaultChecked: false },
  { label: 'I want to know who download my lecture attach file.', defaultChecked: true },
];

function PasswordField({ label, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label}>
      <div className="relative">
        <TextInput type={show ? 'text' : 'password'} placeholder={placeholder} className="pr-10" />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </Field>
  );
}

export default function InstructorSettings() {
  const [bioCount, setBioCount] = useState(0);
  const fileRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState('https://randomuser.me/api/portraits/men/32.jpg');

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />

      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <InstructorNavbar greeting="Good Morning" title="Settings" />

        <main className="flex-1 p-6 space-y-5">

          {/* ── Account Settings ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex gap-8">
              {/* Form fields */}
              <div className="flex-1 space-y-5">
                <h2 className="font-extrabold text-gray-900 text-lg">Account Settings</h2>

                {/* Full name row */}
                <Field label="Full name">
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput placeholder="First name" />
                    <TextInput placeholder="Last name" />
                  </div>
                </Field>

                <Field label="Username">
                  <TextInput placeholder="Enter your username" />
                </Field>

                <Field label="Phone Number">
                  <div className="flex gap-2">
                    <div className="relative w-20">
                      <select className="w-full h-full border border-gray-200 rounded-xl px-2 py-2.5 text-sm text-gray-700 bg-white outline-none focus:border-primary appearance-none pr-5">
                        <option>+1</option>
                        <option>+44</option>
                        <option>+234</option>
                        <option>+91</option>
                      </select>
                      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                    </div>
                    <TextInput placeholder="Your Phone number..." className="flex-1" />
                  </div>
                </Field>

                <Field label="Title">
                  <div className="relative">
                    <TextInput
                      placeholder="Your title, profession or small biography"
                      onChange={(e) => setBioCount(e.target.value.length)}
                      maxLength={50}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{bioCount}/50</span>
                  </div>
                </Field>

                <Field label="Biography">
                  <textarea
                    placeholder="Your title, profession or small biography"
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-primary transition-all placeholder:text-gray-400 resize-none"
                  />
                </Field>

                <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all">
                  Save Changes
                </button>
              </div>

              {/* Photo upload */}
              <div className="w-48 flex-shrink-0">
                <div className="rounded-xl overflow-hidden bg-gray-100 mb-2 aspect-square">
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-semibold py-2 rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Upload size={13} /> Upload Photo
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-center">
                  Image size should be under 1MB and image ratio needs to be 1:1
                </p>
              </div>
            </div>
          </div>

          {/* ── Social Profile ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-extrabold text-gray-900 text-lg">Social Profile</h2>

            <Field label="Personal Website">
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <TextInput placeholder="Personal website or portfolio url..." className="pl-9" />
              </div>
            </Field>

            <div className="grid grid-cols-3 gap-4">
              <Field label="Facebook">
                <SocialInput icon={Facebook} placeholder="Username" color="text-blue-600" />
              </Field>
              <Field label="Instagram">
                <SocialInput icon={Instagram} placeholder="Username" color="text-pink-500" />
              </Field>
              <Field label="Linkedin">
                <SocialInput icon={Linkedin} placeholder="Username" color="text-blue-700" />
              </Field>
              <Field label="Twitter">
                <div className="relative">
                  {/* X icon */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm text-gray-700">𝕏</span>
                  <TextInput placeholder="Username" className="pl-9" />
                </div>
              </Field>
              <Field label="Whatsapp">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">📱</span>
                  <TextInput placeholder="Phone number" className="pl-9" />
                </div>
              </Field>
              <Field label="Youtube">
                <SocialInput icon={Youtube} placeholder="Username" color="text-red-500" />
              </Field>
            </div>

            <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all">
              Save Changes
            </button>
          </div>

          {/* ── Notifications + Change Password ── */}
          <div className="grid grid-cols-2 gap-5">

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-extrabold text-gray-900 text-lg">Notifications</h2>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <label key={n.label} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={n.defaultChecked}
                      className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600 leading-snug">{n.label}</span>
                  </label>
                ))}
              </div>
              <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all mt-2">
                Save Changes
              </button>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-extrabold text-gray-900 text-lg">Change password</h2>
              <PasswordField label="Current Password" placeholder="Password" />
              <PasswordField label="New Password" placeholder="Password" />
              <PasswordField label="Confirm Password" placeholder="Confirm new password" />
              <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all">
                Save Changes
              </button>
            </div>

          </div>
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}