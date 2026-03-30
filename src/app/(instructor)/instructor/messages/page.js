'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const conversations = [
  {
    id: 1,
    name: 'Jane Cooper',
    time: 'just now',
    lastMessage: 'I only have a small doubt about...',
    online: true,
    active: true,
    unread: false,
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    time: '08.21',
    lastMessage: 'Thank you so much, sir',
    online: true,
    active: false,
    unread: true,
  },
  {
    id: 3,
    name: 'Marvin McKinney',
    time: 'Yesterday',
    lastMessage: "You're Welcome",
    online: true,
    active: false,
    unread: true,
  },
  {
    id: 4,
    name: 'Eleanor Pena',
    time: 'Yesterday',
    lastMessage: 'Thank you so much, sir',
    online: false,
    active: false,
    unread: false,
  },
  {
    id: 6,
    name: 'Kathryn Murphy',
    time: '2 m',
    lastMessage: 'new message',
    online: false,
    active: false,
    unread: false,
  },
  {
    id: 7,
    name: 'Jacob Jones',
    time: '6 m',
    lastMessage: 'Thank you so much, sir',
    online: true,
    active: false,
    unread: false,
  },
  {
    id: 9,
    name: 'Arlene McCoy',
    time: '9 m',
    lastMessage: 'Thank you so much, sir',
    online: false,
    active: false,
    unread: false,
  },
  {
    id: 10,
    name: 'Dianne Russell',
    time: '9 m',
    lastMessage: "You're Welcome",
    online: true,
    active: false,
    unread: false,
  },
];

const messages = [
  {
    id: 1,
    sender: 'Jane Cooper',
    content: 'Hello, Good Evening.',
    time: '10:00 AM',
    isMine: false,
  },
  {
    id: 2,
    sender: 'Jane Cooper',
    content: "I'm Zafor",
    time: '10:01 AM',
    isMine: false,
  },
  {
    id: 3,
    sender: 'Jane Cooper',
    content:
      'I only have a small doubt about your lecture. can you give me some time for this?',
    time: '10:02 AM',
    isMine: false,
  },
  {
    id: 4,
    sender: 'Me',
    content:
      "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊",
    time: '10:05 AM',
    isMine: true,
  },
  {
    id: 5,
    sender: 'Me',
    content: 'Yeah sure, tell me zafor',
    time: '10:06 AM',
    isMine: true,
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const avatarColors = [
  'bg-orange-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-yellow-400',
  'bg-red-400',
  'bg-teal-400',
  'bg-indigo-400',
  'bg-cyan-400',
];

export default function InstructorMessagesPage() {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0],
  );
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const [searchChat, setSearchChat] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchChat.toLowerCase()),
  );

  function handleSend() {
    if (!messageInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: chatMessages.length + 1,
        sender: 'Me',
        content: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMine: true,
      },
    ]);
    setMessageInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* ── Sidebar Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left Sidebar ── */}
      <aside
        className={`fixed lg:static z-30 top-0 left-0 h-full w-56 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className='px-5 py-5 border-b border-gray-100'>
          <div className='flex items-center gap-2'>
            <Image
              src='/public/images/LearnX logo.jpg'
              alt='LearnX'
              width={40}
              height={40}
              className='object-contain'
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className='text-lg font-bold'>
              <span className='text-blue-700'>Learn</span>
              <span className='text-orange-400'>X</span>
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className='flex-1 px-3 py-4 flex flex-col gap-1'>
          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors'
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
                strokeWidth={1.8}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            Dashboard
          </Link>

          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors'
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
                strokeWidth={1.8}
                d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Create New Course
          </Link>

          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors'
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
                strokeWidth={1.8}
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
            My Courses
          </Link>

          {/* Message - Active */}
          <Link
            href='#'
            className='flex items-center justify-between px-3 py-2.5 rounded-lg text-sm bg-blue-600 text-white'
          >
            <div className='flex items-center gap-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.8}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              Message
            </div>
            <span className='bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
              3
            </span>
          </Link>

          {/* Tools Section */}
          <p className='text-xs text-gray-400 px-3 pt-4 pb-1 uppercase tracking-wider'>
            Tools
          </p>

          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors'
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
                strokeWidth={1.8}
                d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
            Support
          </Link>

          <Link
            href='#'
            className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors'
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

        {/* Sign Out */}
        <div className='px-3 py-4 border-t border-gray-100'>
          <button className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors w-full'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            Sign-out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        {/* ── Top Header ── */}
        <header className='bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0'>
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
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
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          {/* Greeting */}
          <div className='hidden sm:block'>
            <p className='text-xs text-gray-400'>Good Morning</p>
            <h1 className='text-base font-bold text-gray-800'>Message (2)</h1>
          </div>

          {/* Search */}
          <div className='flex-1 max-w-sm'>
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
                placeholder='Search'
                className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-400'
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className='flex items-center gap-3'>
            {/* Notification Bell */}
            <button className='relative p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors'>
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
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            </button>

            {/* Avatar */}
            <div className='w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex-shrink-0'>
              <div className='w-full h-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold'>
                I
              </div>
            </div>
          </div>
        </header>

        {/* ── Body: Chat List + Conversation ── */}
        <div className='flex-1 flex overflow-hidden'>
          {/* ── Chat List Panel ── */}
          <div className='w-full sm:w-72 lg:w-80 bg-white border-r border-gray-100 flex flex-col flex-shrink-0'>
            {/* Chat Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
              <h2 className='text-base font-bold text-gray-800'>Chat</h2>
              <button className='flex items-center gap-1.5 text-xs text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors'>
                <svg
                  className='w-3.5 h-3.5'
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
                Compose
              </button>
            </div>

            {/* Chat Search */}
            <div className='px-4 py-3 border-b border-gray-50'>
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
                  placeholder='Search'
                  value={searchChat}
                  onChange={(e) => setSearchChat(e.target.value)}
                  className='w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-300'
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className='flex-1 overflow-y-auto'>
              {filteredConversations.map((conv, index) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversation(conv)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 ${
                    activeConversation.id === conv.id
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Avatar */}
                  <div className='relative flex-shrink-0'>
                    <div
                      className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {getInitials(conv.name)}
                    </div>
                    {conv.online && (
                      <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full'></span>
                    )}
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-center mb-0.5'>
                      <span className='text-sm font-medium text-gray-800 truncate'>
                        {conv.name}
                      </span>
                      <span className='text-xs text-gray-400 flex-shrink-0 ml-2'>
                        {conv.time}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-xs text-gray-400 truncate'>
                        {conv.lastMessage}
                      </span>
                      {conv.unread && (
                        <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2'></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Active Conversation Panel ── */}
          <div className='hidden sm:flex flex-1 flex-col bg-gray-50 min-w-0'>
            {/* Conversation Header */}
            <div className='bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between flex-shrink-0'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div
                    className={`w-11 h-11 rounded-full ${avatarColors[0]} flex items-center justify-center text-white text-sm font-bold`}
                  >
                    JC
                  </div>
                  <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-gray-800'>
                    {activeConversation.name}
                  </h3>
                  <p className='text-xs text-green-500'>Active Now</p>
                </div>
              </div>

              {/* Options */}
              <button className='p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z' />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3'>
              {/* Date Divider */}
              <div className='flex justify-center my-2'>
                <span className='bg-gray-200 text-gray-500 text-xs px-4 py-1 rounded-full'>
                  Today
                </span>
              </div>

              {/* Message Bubbles */}
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {/* Avatar for received messages */}
                  {!msg.isMine && (
                    <div className='w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 self-end'>
                      JC
                    </div>
                  )}

                  <div
                    className={`flex flex-col gap-0.5 max-w-xs lg:max-w-sm ${msg.isMine ? 'items-end' : 'items-start'}`}
                  >
                    {!msg.isMine && (
                      <span className='text-xs text-gray-400 ml-1'>
                        {msg.time}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.isMine
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-blue-50 text-gray-700 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.isMine && (
                      <span className='text-xs text-gray-400 mr-1'>
                        {msg.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className='bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0'>
              {/* Edit Icon */}
              <svg
                className='w-5 h-5 text-blue-500 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                />
              </svg>

              <input
                type='text'
                placeholder='Type your message'
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className='flex-1 text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent'
              />

              <button
                onClick={handleSend}
                className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors'
              >
                Send
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
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Footer ── */}
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
