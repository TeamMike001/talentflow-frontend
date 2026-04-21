'use client';

import { useState } from 'react';
import Navbar from '@/landing_page/StudentNavbar';
import Footer from '@/landing_page/Footer';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';

const savedCards = [
  { id: 'visa',   type: 'VISA',   number: '4855 **** **** ****',                                                          expiry: '04/24', name: 'Vako Shvili' },
  { id: 'mc',     type: 'MC',     number: '5795 **** **** ****',                                                          expiry: '04/24', name: 'Vako Shvili' },
  { id: 'paypal', type: 'PayPal', number: 'You will be redirected to the PayPal site after reviewing your order.',        expiry: '',      name: ''            },
  { id: 'new',    type: 'New',    number: 'New Payment Card',                                                             expiry: '',      name: ''            },
];

export default function CheckoutPage() {
  const [selectedCard, setSelectedCard] = useState('new');
  const [rememberCard, setRememberCard] = useState(true);
  const [form, setForm] = useState({
    recipientName: '', recipientEmail: '', message: '',
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment submitted! (demo)');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Breadcrumb */}
        <div className="border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-extrabold text-gray-900 text-center mb-1">Course</h1>
            <nav className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Link href="/student/dashboard" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/student/CourseSearch" className="hover:text-primary">Course</Link>
              <span>/</span>
              <span className="text-gray-600">Figma UI UX Design.</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* On mobile: stack vertically (summary on top), on desktop: side by side */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 lg:gap-10">

            {/* ── LEFT – Form ── */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Checkout</h2>

              {/* Recipient's Information */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-4">Recipient&apos;s Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5">Recipient&apos;s Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={form.recipientName}
                      onChange={e => setForm({ ...form, recipientName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5">Recipient&apos;s Email</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.recipientEmail}
                      onChange={e => setForm({ ...form, recipientEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5">Message</label>
                    <textarea
                      placeholder="Add your personal message here..."
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 placeholder-gray-300 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3 mb-5">
                  {savedCards.map(card => (
                    <label
                      key={card.id}
                      className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedCard === card.id ? 'border-primary bg-blue-50/40' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={card.id}
                        checked={selectedCard === card.id}
                        onChange={() => setSelectedCard(card.id)}
                        className="accent-primary flex-shrink-0"
                      />
                      {/* Card logo */}
                      <div className="w-10 flex-shrink-0">
                        {card.type === 'VISA' && (
                          <span className="text-base font-extrabold text-blue-700 italic">VISA</span>
                        )}
                        {card.type === 'MC' && (
                          <div className="flex -space-x-2">
                            <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
                            <div className="w-5 h-5 rounded-full bg-yellow-400 opacity-90" />
                          </div>
                        )}
                        {card.type === 'PayPal' && (
                          <span className="text-xs font-extrabold text-blue-600">Pay<span className="text-blue-800">Pal</span></span>
                        )}
                        {card.type === 'New' && (
                          <CreditCard size={18} className="text-gray-400" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 min-w-0 leading-snug">{card.number}</span>
                      {card.expiry && <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{card.expiry}</span>}
                      {card.name && <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0 hidden sm:inline">{card.name}</span>}
                    </label>
                  ))}
                </div>

                {/* New card form */}
                {selectedCard === 'new' && (
                  <div className="space-y-4 border border-primary/30 rounded-xl p-4 sm:p-5 bg-blue-50/20">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1.5">Name on Card</label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={form.cardName}
                        onChange={e => setForm({ ...form, cardName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-700 placeholder-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1.5">Card Number</label>
                      <div className="relative">
                        <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          value={form.cardNumber}
                          onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-700 placeholder-gray-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1.5">MM / YY</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          maxLength={5}
                          value={form.expiry}
                          onChange={e => setForm({ ...form, expiry: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-700 placeholder-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1.5">CVC</label>
                        <input
                          type="text"
                          placeholder="Security Code"
                          maxLength={4}
                          value={form.cvc}
                          onChange={e => setForm({ ...form, cvc: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-700 placeholder-gray-300"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberCard}
                        onChange={e => setRememberCard(e.target.checked)}
                        className="accent-primary w-4 h-4 flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-gray-600">Remember this card, save it on my card list</span>
                    </label>
                  </div>
                )}

                {/* Mobile submit button — sits below form */}
                <button
                  onClick={handleSubmit}
                  className="lg:hidden w-full mt-6 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm shadow-md"
                >
                  Complete Payment
                </button>
              </div>
            </div>

            {/* ── RIGHT – Order Summary ── */}
            <div>
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm lg:sticky lg:top-24">
                {/* Course info */}
                <div className="p-4 sm:p-5 border-b border-gray-100">
                  <p className="font-bold text-sm text-gray-900 mb-3">Course</p>
                  <div className="flex gap-3 items-start">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&q=80"
                        alt="Course"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Course by: <span className="text-gray-700 font-medium">Courtney Henry</span></p>
                      <p className="text-sm font-semibold text-gray-900">Figma UI UX Design.</p>
                      <p className="text-primary font-bold text-sm mt-1">$19.14</p>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="p-4 sm:p-5">
                  <p className="font-bold text-sm text-gray-900 mb-4">Order Summary</p>
                  <div className="space-y-2.5 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-800 font-medium">$17.97 USD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Coupon Discount</span>
                      <span className="text-gray-800 font-medium">8%</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center mb-5">
                    <span className="font-bold text-gray-900 text-sm">Total:</span>
                    <span className="font-extrabold text-xl text-gray-900">$21.97 USD</span>
                  </div>
                  {/* Desktop-only submit button */}
                  <button
                    onClick={handleSubmit}
                    className="hidden lg:block w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm shadow-md"
                  >
                    Complete Payment
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}