'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  {
    label: 'Home',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
    ),
  },
  {
    label: 'Profile',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        />
      </svg>
    ),
  },
  {
    label: 'Schedule',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        />
      </svg>
    ),
  },
  {
    label: 'Courses',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        />
      </svg>
    ),
  },
  {
    label: 'Bookmarks',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
        />
      </svg>
    ),
  },
  {
    label: 'Certifications',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
        />
      </svg>
    ),
  },
  {
    label: 'Assignment',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
        />
      </svg>
    ),
  },
  {
    label: 'Events',
    href: '#',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z'
        />
      </svg>
    ),
  },
  {
    label: 'Community',
    href: '#',
    active: true,
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.8}
          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
        />
      </svg>
    ),
  },
];

const activeMembers = [
  { id: 1, name: 'Kelvin John', color: 'bg-amber-500' },
  { id: 2, name: 'Skylar Watt', color: 'bg-rose-400' },
  { id: 3, name: 'Great Roy', color: 'bg-red-600' },
  { id: 4, name: 'Faith Precoius', color: 'bg-purple-400' },
];

const sharedFiles = [
  {
    id: 1,
    name: 'Tech design review. pdf',
    size: '5.2 MB',
    owner: 'Precious',
    time: '1h ago',
    color: 'bg-orange-100 text-orange-500',
  },
  {
    id: 2,
    name: 'UX principles. pdf',
    size: '1.2 MB',
    owner: 'Oliver',
    time: '2d ago',
    color: 'bg-gray-100 text-gray-500',
  },
];

const chatMessages = [
  {
    id: 1,
    sender: 'Oliver Smith',
    time: 'Today 2:20 pm',
    type: 'file',
    fileName: 'UX principles. pdf',
    fileSize: '1.2 MB',
    isMine: false,
    avatarColor: 'bg-rose-300',
  },
  {
    id: 2,
    sender: 'You',
    time: 'Today 3:50 pm',
    type: 'file',
    fileName: 'Tech design requirement. pdf',
    fileSize: '5.2 MB',
    isMine: true,
    avatarColor: 'bg-amber-500',
  },
  {
    id: 3,
    sender: 'Janeth Black',
    time: '1 min ago',
    type: 'text',
    content: 'Hey favour, can you please review the pdf when you can ?',
    isMine: false,
    avatarColor: 'bg-rose-400',
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function CommunityPage() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  function handleSend() {
    if (!messageInput.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: 'You',
        time: 'Just now',
        type: 'text',
        content: messageInput,
        isMine: true,
        avatarColor: 'bg-amber-500',
      },
    ]);
    setMessageInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left Sidebar ── */}
      <aside
        className={`fixed lg:static z-30 top-0 left-0 h-full w-52 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className='px-5 pt-6 pb-4'>
          <div className='flex flex-col items-center'>
            <div className='w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-1'>
              <span className='text-white font-black text-lg'>L</span>
            </div>
            <span className='text-base font-bold'>
              <span className='text-blue-700'>Learn</span>
              <span className='text-orange-400'>X</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 overflow-y-auto'>
          {/* Main Page Label */}
          <p className='text-xs text-gray-400 px-2 mb-2 uppercase tracking-wider'>
            Main Page
          </p>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                link.active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* Tools Label */}
          <p className='text-xs text-gray-400 px-2 mt-4 mb-2 uppercase tracking-wider'>
            Tools
          </p>

          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors mb-0.5'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
            Support
          </Link>

          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            Settings
          </Link>
        </nav>

        {/* User Profile at Bottom */}
        <div className='px-3 py-4 border-t border-gray-100 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0'>
              TW
            </div>
            <div className='min-w-0'>
              <p className='text-xs font-semibold text-gray-800 truncate'>
                Titus Williams
              </p>
              <p className='text-xs text-gray-400 truncate'>UI/UX Designer</p>
            </div>
          </div>
          <button className='text-red-400 hover:text-red-500 transition-colors flex-shrink-0'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        {/* ── Top Header ── */}
        <header className='bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0'>
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 flex-shrink-0'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          {/* Greeting */}
          <div className='hidden sm:block flex-shrink-0'>
            <p className='text-sm font-semibold text-gray-800'>
              Welcome back, <span className='text-blue-600'>Titus!</span>{' '}
              <span>👋</span>
            </p>
            <p className='text-xs text-gray-400'>
              Boost your tech skills now and stand out.
            </p>
          </div>

          {/* Search */}
          <div className='flex-1 max-w-md mx-auto'>
            <div className='relative'>
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='text'
                placeholder='Search...'
                className='w-full bg-gray-50 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-400'
              />
            </div>
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-3 flex-shrink-0'>
            {/* Bell */}
            <button className='relative p-2 text-gray-400 hover:text-gray-600 transition-colors'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            </button>

            {/* User Info */}
            <div className='hidden sm:flex items-center gap-2'>
              <div className='w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0'>
                TW
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-800'>
                  Titus Williams
                </p>
                <p className='text-xs text-gray-400'>UI/UX Designer</p>
              </div>
              <svg
                className='w-4 h-4 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>

            {/* Mobile right panel toggle */}
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className='lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Body ── */}
        <div className='flex-1 flex overflow-hidden'>
          {/* ── Chat Panel ── */}
          <div
            className={`flex-1 flex flex-col min-w-0 ${rightPanelOpen ? 'hidden lg:flex' : 'flex'}`}
          >
            {/* Community Description */}
            <div className='bg-white border-b border-gray-100 px-6 py-3 text-center'>
              <p className='text-sm text-gray-400'>
                Collaborate, share ideas, and ask questions about UI/UX design
                here.
              </p>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto px-4 lg:px-6 py-5 flex flex-col gap-6'>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full ${msg.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {getInitials(msg.sender)}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col gap-1 max-w-md ${msg.isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`flex items-center gap-3 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <span className='text-sm font-semibold text-gray-800'>
                        {msg.sender}
                      </span>
                      <span className='text-xs text-gray-400'>{msg.time}</span>
                    </div>

                    {/* File Message */}
                    {msg.type === 'file' && (
                      <div className='flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 cursor-pointer hover:bg-blue-100 transition-colors'>
                        <div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                          <svg
                            className='w-4 h-4 text-orange-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-700'>
                            {msg.fileName}
                          </p>
                          <p className='text-xs text-gray-400'>
                            {msg.fileSize}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Text Message */}
                    {msg.type === 'text' && (
                      <div className='bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm'>
                        <p className='text-sm text-gray-700 leading-relaxed'>
                          {msg.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className='bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0'>
              <div className='flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5'>
                {/* Plus */}
                <button className='text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                </button>

                {/* Input */}
                <input
                  type='text'
                  placeholder='Type a message'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='flex-1 text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent'
                />

                {/* Emoji */}
                <button className='text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </button>

                {/* Location */}
                <button className='text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                    />
                  </svg>
                </button>

                {/* Send */}
                <button
                  onClick={handleSend}
                  className='w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0'
                >
                  <svg
                    className='w-4 h-4 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div
            className={`w-full lg:w-72 bg-white border-l border-gray-100 flex flex-col overflow-y-auto flex-shrink-0 ${rightPanelOpen ? 'flex' : 'hidden lg:flex'}`}
          >
            <div className='px-5 py-5'>
              {/* Active Members */}
              <h3 className='text-lg font-bold text-gray-800 mb-4'>
                Active Members
              </h3>
              <div className='flex flex-col gap-3 mb-6'>
                {activeMembers.map((member) => (
                  <div
                    key={member.id}
                    className='flex items-center gap-3'
                  >
                    <div className='relative'>
                      <div
                        className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {getInitials(member.name)}
                      </div>
                      <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full'></span>
                    </div>
                    <span className='text-sm font-medium text-gray-700'>
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className='h-px bg-gray-100 mb-5'></div>

              {/* Files Shared */}
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-3'>
                  <h4 className='text-sm font-bold text-gray-800'>
                    Files Shared
                  </h4>
                  <button className='text-xs text-blue-600 hover:underline'>
                    View All
                  </button>
                </div>
                <div className='flex flex-col gap-3'>
                  {sharedFiles.map((file) => (
                    <div
                      key={file.id}
                      className='flex items-center gap-3'
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${file.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-medium text-gray-700 truncate'>
                          {file.name}
                        </p>
                        <p className='text-xs text-gray-400'>
                          {file.size} . {file.owner}
                        </p>
                      </div>
                      <span className='text-xs text-gray-400 flex-shrink-0'>
                        {file.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className='h-px bg-gray-100 mb-5'></div>

              {/* Pinned Messages */}
              <div>
                <div className='flex items-center justify-between mb-3'>
                  <h4 className='text-sm font-bold text-gray-800'>
                    Pinned Messages
                  </h4>
                  <button className='text-xs text-blue-600 hover:underline'>
                    View All
                  </button>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0'>
                    KJ
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-800 mb-0.5'>
                      Kelvin John
                    </p>
                    <p className='text-xs text-gray-500 leading-relaxed'>
                      Hey favour, can you please review the pdf when you can ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className='bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0'>
          <p className='text-xs text-gray-400'>
            © 2026 Team Mike - UI/UX. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <Link
              href='#'
              className='text-xs text-gray-400 hover:text-gray-600 transition-colors'
            >
              FAQs
            </Link>
            <Link
              href='#'
              className='text-xs text-gray-400 hover:text-gray-600 transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-xs text-gray-400 hover:text-gray-600 transition-colors'
            >
              Terms & Condition
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
