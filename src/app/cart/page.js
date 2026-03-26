'use client';

import { useState } from 'react';
import Navbar from '@/landing_page/Navbar';
import Link from 'next/link';
import Footer from '@/landing_page/Footer';

export default function CartPage() {
  const [selectedPayment, setSelectedPayment] = useState('new');
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    message: '',
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    rememberCard: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Payment submitted:', formData);
  }

  return (
    <main className='min-h-screen bg-white flex flex-col'>
      {/* Page Header */}
      <Navbar />
      <div className='text-center py-6 border-b border-gray-100'>
        <h1 className='text-xl font-semibold text-gray-800'>Course</h1>
        <nav className='text-sm text-gray-400 mt-1'>
          <Link
            href='/'
            className='hover:text-blue-600'
          >
            Home
          </Link>
          <span className='mx-2'>/</span>
          <Link
            href='/courses'
            className='hover:text-blue-600'
          >
            Course
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-500'>Figma UI UX Design..</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 max-w-5xl mx-auto w-full px-6 py-10'>
        <div className='flex flex-col lg:flex-row gap-10'>
          {/* ── Left Column ── */}
          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Course</h2>

            {/* Recipient Information */}
            <form onSubmit={handleSubmit}>
              <div className='mb-8'>
                <h3 className='text-base font-semibold text-gray-800 mb-4'>
                  Recipient's Information
                </h3>

                {/* Recipient Name */}
                <div className='mb-4'>
                  <label className='block text-sm text-gray-600 mb-1'>
                    Recipient's Name
                  </label>
                  <input
                    type='text'
                    name='recipientName'
                    placeholder='Full name'
                    value={formData.recipientName}
                    onChange={handleChange}
                    className='w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500'
                  />
                </div>

                {/* Recipient Email */}
                <div className='mb-4'>
                  <label className='block text-sm text-gray-600 mb-1'>
                    Recipient's Email:
                  </label>
                  <input
                    type='email'
                    name='recipientEmail'
                    placeholder='Email Address'
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className='w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500'
                  />
                </div>

                {/* Message */}
                <div className='mb-4'>
                  <label className='block text-sm text-gray-600 mb-1'>
                    Message
                  </label>
                  <textarea
                    name='message'
                    placeholder='Add your personal message here...'
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className='w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none'
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className='text-base font-semibold text-gray-800 mb-4'>
                  Payment Method
                </h3>

                {/* Visa */}
                <div
                  onClick={() => setSelectedPayment('visa')}
                  className={`flex items-center justify-between px-4 py-3 border rounded-md mb-3 cursor-pointer ${
                    selectedPayment === 'visa'
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    {/* Visa Logo */}
                    <div className='w-10 h-6 bg-blue-700 rounded flex items-center justify-center'>
                      <span className='text-white text-xs font-bold italic'>
                        VISA
                      </span>
                    </div>
                    <span className='text-sm text-gray-600'>
                      4855 **** **** ****
                    </span>
                  </div>
                  <div className='flex items-center gap-6 text-sm text-gray-600'>
                    <span>04/24</span>
                    <span>Vako Shvili</span>
                  </div>
                </div>

                {/* Mastercard */}
                <div
                  onClick={() => setSelectedPayment('mastercard')}
                  className={`flex items-center justify-between px-4 py-3 border rounded-md mb-3 cursor-pointer ${
                    selectedPayment === 'mastercard'
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    {/* Mastercard Logo */}
                    <div className='w-10 h-6 flex items-center justify-center'>
                      <div className='relative flex'>
                        <div className='w-5 h-5 rounded-full bg-red-500 opacity-90'></div>
                        <div className='w-5 h-5 rounded-full bg-yellow-400 opacity-90 -ml-2'></div>
                      </div>
                    </div>
                    <span className='text-sm text-gray-600'>
                      5795 **** **** ****
                    </span>
                  </div>
                  <div className='flex items-center gap-6 text-sm text-gray-600'>
                    <span>04/24</span>
                    <span>Vako Shvili</span>
                  </div>
                </div>

                {/* PayPal */}
                <div
                  onClick={() => setSelectedPayment('paypal')}
                  className={`flex items-center gap-3 px-4 py-3 border rounded-md mb-3 cursor-pointer ${
                    selectedPayment === 'paypal'
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                >
                  {/* PayPal Logo */}
                  <div className='w-8 h-6 flex items-center justify-center'>
                    <span className='text-blue-800 font-bold text-sm'>P</span>
                  </div>
                  <span className='text-sm text-gray-500'>
                    You will be redirected to the PayPal site after reviewing
                    your order.
                  </span>
                </div>

                {/* New Payment Card */}
                <div
                  onClick={() => setSelectedPayment('new')}
                  className={`flex items-center gap-3 px-4 py-3 border rounded-md mb-6 cursor-pointer ${
                    selectedPayment === 'new'
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                >
                  {/* Card Icon */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 text-gray-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                    />
                  </svg>
                  <span className='text-sm text-gray-600'>
                    New Payment Cards
                  </span>
                </div>

                {/* New Card Form - shows when New Payment is selected */}
                {selectedPayment === 'new' && (
                  <div>
                    {/* Name on Card */}
                    <div className='mb-4'>
                      <label className='block text-sm text-gray-600 mb-1'>
                        Name
                      </label>
                      <input
                        type='text'
                        name='nameOnCard'
                        placeholder='Name on card'
                        value={formData.nameOnCard}
                        onChange={handleChange}
                        className='w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500'
                      />
                    </div>

                    {/* Card Number */}
                    <div className='mb-4'>
                      <label className='block text-sm text-gray-600 mb-1'>
                        Card Number
                      </label>
                      <div className='relative'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                          />
                        </svg>
                        <input
                          type='text'
                          name='cardNumber'
                          placeholder='Label'
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className='w-full border border-gray-200 rounded-md pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500'
                        />
                      </div>
                    </div>

                    {/* Expiry and CVC */}
                    <div className='flex gap-4 mb-4'>
                      <div className='flex-1'>
                        <label className='block text-sm text-gray-600 mb-1'>
                          MM / YY
                        </label>
                        <input
                          type='text'
                          name='expiry'
                          placeholder='MM / YY'
                          value={formData.expiry}
                          onChange={handleChange}
                          className='w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500'
                        />
                      </div>
                      <div className='flex-1'>
                        <label className='block text-sm text-gray-600 mb-1'>
                          CVC
                        </label>
                        <input
                          type='text'
                          name='cvc'
                          placeholder='Security Code'
                          value={formData.cvc}
                          onChange={handleChange}
                          className='w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500'
                        />
                      </div>
                    </div>

                    {/* Remember Card */}
                    <div className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        name='rememberCard'
                        id='rememberCard'
                        checked={formData.rememberCard}
                        onChange={handleChange}
                        className='w-4 h-4 accent-blue-600'
                      />
                      <label
                        htmlFor='rememberCard'
                        className='text-sm text-gray-600'
                      >
                        Remember this card, save it on my card list
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* ── Right Column ── */}
          <div className='w-full lg:w-80'>
            <div className='border border-gray-200 rounded-lg p-5'>
              {/* Course Info */}
              <h3 className='text-sm font-semibold text-gray-800 mb-4'>
                Course
              </h3>

              <div className='flex items-start gap-3 pb-4 border-b border-gray-100'>
                {/* Course Thumbnail */}
                <div className='w-16 h-16 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden'>
                  <div className='w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>FIG</span>
                  </div>
                </div>

                {/* Course Details */}
                <div>
                  <p className='text-xs text-gray-400 mb-0.5'>
                    Course by:{' '}
                    <span className='text-gray-600'>Courtney Henry</span>
                  </p>
                  <p className='text-sm font-medium text-gray-700'>
                    Figma UI UX Design..
                  </p>
                  <p className='text-sm font-semibold text-orange-500 mt-1'>
                    $19.14
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className='py-4 border-b border-gray-100'>
                <h4 className='text-sm font-semibold text-gray-800 mb-3'>
                  Order Summery
                </h4>
                <div className='flex justify-between text-sm text-gray-500 mb-2'>
                  <span>Subtotal</span>
                  <span>$17.97 USD</span>
                </div>
                <div className='flex justify-between text-sm text-gray-500'>
                  <span>Coupon Discount</span>
                  <span>8%</span>
                </div>
              </div>

              {/* Total */}
              <div className='flex justify-between items-center py-4'>
                <span className='text-sm text-gray-600'>Total:</span>
                <span className='text-lg font-bold text-gray-800'>
                  $21.97 USD
                </span>
              </div>

              {/* Complete Payment Button */}
              <button
                onClick={handleSubmit}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-md transition-colors duration-200'
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
