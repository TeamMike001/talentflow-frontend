'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';

import { useState } from 'react';
import { Search, Plus, MoreHorizontal, Send, Edit3, Menu, X, BookOpen, BarChart2, Settings, Bell, LogOut, Home, ArrowLeft } from 'lucide-react';


// ── Data ─────────────────────────────────────────────────────────────────────
const contacts = [
  { id: 1, name: 'Jane Cooper',        avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMsg: 'I only have a small doubt about...',  time: 'just now',  online: true,  unread: false },
  { id: 2, name: 'Jenny Wilson',       avatar: 'https://randomuser.me/api/portraits/women/50.jpg', lastMsg: 'Thank you so much, sir',               time: '08.21',     online: false, unread: true  },
  { id: 3, name: 'Marvin McKinney',    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',   lastMsg: "You're Welcome",                       time: 'Yesterday', online: false, unread: true  },
  { id: 4, name: 'Eleanor Pena',       avatar: 'https://randomuser.me/api/portraits/women/52.jpg', lastMsg: 'Thank you so much, sir',               time: 'Yesterday', online: false, unread: false },
  { id: 5, name: 'Ronald Richards',    avatar: 'https://randomuser.me/api/portraits/men/53.jpg',   lastMsg: "Sorry, I can't help you",              time: 'Monday',    online: false, unread: false },
  { id: 6, name: 'Kathryn Murphy',     avatar: 'https://randomuser.me/api/portraits/women/54.jpg', lastMsg: 'new message',                          time: '2 m',       online: false, unread: false },
  { id: 7, name: 'Jacob Jones',        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',   lastMsg: 'Thank you so much, sir',               time: '6 m',       online: false, unread: false },
  { id: 8, name: 'Cameron Williamson', avatar: 'https://randomuser.me/api/portraits/men/56.jpg',   lastMsg: "It's okay, no problem, I will...",     time: '6 m',       online: false, unread: false },
  { id: 9, name: 'Arlene McCoy',       avatar: 'https://randomuser.me/api/portraits/women/57.jpg', lastMsg: 'Thank you so much, sir',               time: '9 m',       online: false, unread: false },
  { id: 10, name: 'Dianne Russell',    avatar: 'https://randomuser.me/api/portraits/women/58.jpg', lastMsg: "You're Welcome",                       time: '9 m',       online: false, unread: false },
];

const initialMessages = [
  { id: 1, sender: 'student', text: 'Hello, Good Evening.',                                                                                 time: 'Time' },
  { id: 2, sender: 'student', text: "I'm Zafor",                                                                                            time: null  },
  { id: 3, sender: 'student', text: 'I only have a small doubt about your lecture. can you give me some time for this?',                    time: null  },
  { id: 4, sender: 'me',      text: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊", time: 'Time' },
  { id: 5, sender: 'me',      text: 'Yeah sure, tell me zafor',                                                                             time: null  },
];

export default function InstructorMessage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [contactSearch, setContactSearch] = useState('');
  // Mobile: 'list' | 'chat'
  const [mobileView, setMobileView] = useState('list');

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'me', text, time: null }]);
    setInput('');
  };

  const handleSelectContact = (contact) => {
    setActiveContact(contact);
    setMobileView('chat');
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="Message (2)" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-3 sm:p-4 md:p-6">
          {/* Fixed height container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex" style={{ height: 'calc(100vh - 180px)', minHeight: 480 }}>

            {/* ── Contact List ──
                On mobile: full width, hidden when mobileView==='chat'
                On md+: fixed width column, always visible */}
            <div className={`
              flex flex-col border-r border-gray-100
              ${mobileView === 'chat' ? 'hidden md:flex' : 'flex w-full'}
              md:w-72 lg:w-80 md:flex-shrink-0
            `}>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                <h2 className="font-extrabold text-gray-900 text-base">Chat</h2>
                <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 border border-blue-600 rounded-xl px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-all">
                  <Plus size={13} /> Compose
                </button>
              </div>

              {/* Search */}
              <div className="px-4 py-3 border-b border-gray-50">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-700 outline-none focus:border-blue-400 transition-all"
                  />
                </div>
              </div>

              {/* Contacts */}
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleSelectContact(contact)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left ${
                      activeContact.id === contact.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img src={contact.avatar} alt={contact.name} className="w-9 h-9 rounded-full object-cover" />
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-gray-900 text-xs">{contact.name}</span>
                        <span className="text-[10px] text-gray-400">{contact.time}</span>
                      </div>
                      <p className={`text-[11px] truncate ${contact.unread ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                        {contact.lastMsg}
                      </p>
                    </div>
                    {contact.unread && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Chat Window ──
                On mobile: full width, hidden when mobileView==='list'
                On md+: takes remaining space, always visible */}
            <div className={`
              flex-col flex-1 overflow-hidden
              ${mobileView === 'list' ? 'hidden md:flex' : 'flex w-full'}
            `}>
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  {/* Back button on mobile */}
                  <button
                    onClick={() => setMobileView('list')}
                    className="md:hidden text-gray-400 hover:text-blue-600 transition-colors mr-1"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div className="relative">
                    <img src={activeContact.avatar} alt={activeContact.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{activeContact.name}</p>
                    <p className="text-xs text-green-500 font-medium">Active Now</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3">
                <div className="flex justify-center">
                  <span className="bg-gray-100 text-gray-500 text-[11px] font-medium px-3 py-1 rounded-full">Today</span>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.time && (
                      <p className={`text-[10px] text-gray-400 mb-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    )}
                    <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                      {msg.sender === 'student' && (
                        <img src={activeContact.avatar} alt="" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-0.5" />
                      )}
                      <div className={`max-w-[75%] sm:max-w-xs md:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-t border-gray-100 flex-shrink-0">
                <button className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0 hidden sm:block">
                  <Edit3 size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400 min-w-0"
                />
                <button
                  onClick={sendMessage}
                  className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-blue-700 transition-all flex-shrink-0"
                >
                  <span className="hidden sm:inline">Send</span>
                  <Send size={14} />
                </button>
              </div>
            </div>

          </div>
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}