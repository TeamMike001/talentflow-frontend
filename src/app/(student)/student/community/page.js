'use client';

import { useState, useRef, useEffect } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Plus, Smile, Send, Paperclip, FileText, Users, X } from 'lucide-react';

<<<<<<< HEAD
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
=======
const initialMessages = [
  { id: 1, sender: 'Oliver Smith',  avatar: 'https://randomuser.me/api/portraits/men/41.jpg',   time: 'Today 2:20 pm',  type: 'file', file: { name: 'UX principles.pdf',             size: '1.2 MB' }, self: false },
  { id: 2, sender: 'You',           avatar: 'https://randomuser.me/api/portraits/men/30.jpg',   time: 'Today 3:50 pm',  type: 'file', file: { name: 'Tech design requirement.pdf',    size: '5.2 MB' }, self: true  },
  { id: 3, sender: 'Janeth Black',  avatar: 'https://randomuser.me/api/portraits/women/50.jpg', time: '1 min ago',      type: 'text', text: 'Hey favour, can you please review the pdf when you can?', self: false },
];
>>>>>>> parent of 4d42df6 (Complete course)

const activeMembers = [
  { name: 'Kelvin John',   avatar: 'https://randomuser.me/api/portraits/men/42.jpg'   },
  { name: 'Skylar Watt',   avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
  { name: 'Great Roy',     avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Faith Precious',avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
];

const filesShared = [
  { name: 'Tech design review.pdf', size: '5.2 MB', from: 'Precious', time: '1h ago',  color: 'text-orange-400' },
  { name: 'UX principles.pdf',      size: '1.2 MB', from: 'Oliver',   time: '2d ago',  color: 'text-gray-400'   },
];

const pinnedMessages = [
  { sender: 'Kelvin John', avatar: 'https://randomuser.me/api/portraits/men/42.jpg', text: 'Hey favour, can you please review the pdf when you can?' },
];

export default function CommunityPage() {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [panelOpen, setPanelOpen]       = useState(false);
  const [messages, setMessages]         = useState(initialMessages);
  const [input, setInput]               = useState('');
  const bottomRef                       = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), sender: 'You', avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
      time: 'Just now', type: 'text', text: input.trim(), self: true,
    }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0 min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
<<<<<<< HEAD
        
        <div className="flex-1 flex overflow-hidden">
          {/* Users Sidebar */}
          <div className="w-80 bg-white border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-800 mb-3">Messages</h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type a message"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent min-w-0"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Users size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No users found</p>
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const lastMessageTime = conversationLastMessages[user.id];
                  const lastPreview = lastMessagePreview[user.id];
                  return (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                        selectedUser?.id === user.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 ${getUserRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold`}>
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                          {lastMessageTime && (
                            <span className="text-xs text-gray-400 ml-1">
                              {formatLastMessageTime(lastMessageTime)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <p className="text-xs text-blue-600 mt-0.5">{getUserRoleText(user.role)}</p>
                        {lastPreview && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{lastPreview}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <Circle size={8} className="fill-green-500 text-green-500" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
=======
>>>>>>> parent of 4d42df6 (Complete course)

        <div className="flex flex-1 overflow-hidden relative">

          {/* ── CHAT AREA ── */}
          <div className="flex-1 flex flex-col bg-white border-r border-gray-100 min-w-0">

            {/* Topic banner + mobile members button */}
            <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-500 flex-1 text-center">Collaborate, share ideas, and ask questions about UI/UX design here.</p>
              {/* Mobile: show members panel toggle */}
              <button
                onClick={() => setPanelOpen(true)}
                className="lg:hidden flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-lg bg-white flex-shrink-0"
              >
                <Users size={13} /> Members
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-6">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.self ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-1.5 ${msg.self ? 'flex-row-reverse' : ''}`}>
                    <img src={msg.avatar} alt={msg.sender} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm">{msg.sender}</span>
                    <span className="text-gray-400 text-xs hidden sm:inline">{msg.time}</span>
                  </div>

                  {msg.type === 'file' ? (
                    <div className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-2xl max-w-[260px] sm:max-w-xs ${msg.self ? 'bg-blue-50' : 'bg-gray-50'} border border-gray-100`}>
                      <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-orange-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{msg.file.name}</p>
                        <p className="text-xs text-gray-400">{msg.file.size}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`px-3 sm:px-4 py-3 rounded-2xl max-w-[260px] sm:max-w-sm text-sm leading-relaxed ${msg.self ? 'bg-blue-50 text-gray-800' : 'bg-gray-50 text-gray-800'} border border-gray-100`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-3 sm:px-5 py-3 sm:py-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 sm:gap-3 border border-gray-200 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:border-primary transition-colors">
                <button className="text-gray-400 hover:text-primary transition-colors flex-shrink-0">
                  <Plus size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent min-w-0"
                />
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <button className="text-gray-400 hover:text-primary transition-colors hidden sm:block"><Smile size={18} /></button>
                  <button className="text-gray-400 hover:text-primary transition-colors hidden sm:block"><Paperclip size={18} /></button>
                  <button onClick={sendMessage} className="p-1.5 sm:p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — desktop fixed, mobile slide-in ── */}

          {/* Mobile backdrop */}
          <div
            className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${panelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setPanelOpen(false)}
          />

          {/* Panel */}
          <div className={`
            fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-2xl
            transition-transform duration-300 ease-in-out overflow-y-auto p-5 space-y-6
            lg:static lg:translate-x-0 lg:shadow-none lg:z-auto lg:flex lg:flex-col lg:flex-shrink-0 lg:border-l lg:border-gray-100
            ${panelOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>

            {/* Mobile close button */}
            <div className="flex items-center justify-between lg:hidden mb-2">
              <span className="font-extrabold text-gray-900 text-sm">Community Info</span>
              <button onClick={() => setPanelOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {/* Active Members */}
            <div>
              <h3 className="font-extrabold text-gray-900 text-base mb-4">Active Members</h3>
              <div className="space-y-3">
                {activeMembers.map(m => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Files Shared */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-gray-900 text-sm">Files Shared</h3>
                <button className="text-gray-400 text-xs hover:text-primary">View All</button>
              </div>
              <div className="space-y-3">
                {filesShared.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FileText size={16} className={`${f.color} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{f.name}</p>
                      <p className="text-xs text-gray-400">{f.size} · {f.from} · {f.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pinned Messages */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-gray-900 text-sm">Pinned Messages</h3>
                <button className="text-gray-400 text-xs hover:text-primary">View All</button>
              </div>
              <div className="space-y-3">
                {pinnedMessages.map((p, i) => (
                  <div key={i} className="flex gap-2.5">
                    <img src={p.avatar} alt={p.sender} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-xs mb-0.5">{p.sender}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => <button key={l} className="hover:text-primary">{l}</button>)}
          </div>
        </footer>
      </div>
    </div>
  );
}