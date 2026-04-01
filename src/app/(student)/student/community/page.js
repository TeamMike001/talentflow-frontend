'use client';

import { useState, useRef, useEffect } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Plus, Smile, Send, Paperclip, FileText } from 'lucide-react';

const initialMessages = [
  { id: 1, sender: 'Oliver Smith', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', time: 'Today 2:20 pm', type: 'file', file: { name: 'UX principles. pdf', size: '1.2 MB' }, self: false },
  { id: 2, sender: 'You', avatar: 'https://randomuser.me/api/portraits/men/30.jpg', time: 'Today 3:50 pm', type: 'file', file: { name: 'Tech design requirement. pdf', size: '5.2 MB' }, self: true },
  { id: 3, sender: 'Janeth Black', avatar: 'https://randomuser.me/api/portraits/women/50.jpg', time: '1 min ago', type: 'text', text: 'Hey favour, can you please review the pdf when you can ?', self: false },
];

const activeMembers = [
  { name: 'Kelvin John', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
  { name: 'Skylar Watt', avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
  { name: 'Great Roy', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Faith Precoius', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
];

const filesShared = [
  { name: 'Tech design review. pdf', size: '5.2 MB', from: 'Precious', time: '1h ago', color: 'text-orange-400' },
  { name: 'UX principles. pdf', size: '1.2 MB', from: 'Oliver', time: '2d ago', color: 'text-gray-400' },
];

const pinnedMessages = [
  { sender: 'Kelvin John', avatar: 'https://randomuser.me/api/portraits/men/42.jpg', text: 'Hey favour, can you please review the pdf when you can ?' },
];

export default function CommunityPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), sender: 'You', avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
      time: 'Just now', type: 'text', text: input.trim(), self: true
    }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <StudentNavbar />

        <div className="flex flex-1 overflow-hidden">
          {/* ── CHAT AREA ── */}
          <div className="flex-1 flex flex-col bg-white border-r border-gray-100">
            {/* Topic banner */}
            <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 text-center">
              <p className="text-sm text-gray-500">Collaborate, share ideas, and ask questions about UI/UX design here.</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.self ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-1.5 ${msg.self ? 'flex-row-reverse' : ''}`}>
                    <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-semibold text-gray-900 text-sm">{msg.sender}</span>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>

                  {msg.type === 'file' ? (
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xs ${msg.self ? 'bg-blue-50' : 'bg-gray-50'} border border-gray-100`}>
                      <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{msg.file.name}</p>
                        <p className="text-xs text-gray-400">{msg.file.size}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`px-4 py-3 rounded-2xl max-w-sm text-sm leading-relaxed ${msg.self ? 'bg-blue-50 text-gray-800' : 'bg-gray-50 text-gray-800'} border border-gray-100`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-5 py-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-primary transition-colors">
                <button className="text-gray-400 hover:text-primary transition-colors flex-shrink-0">
                  <Plus size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="text-gray-400 hover:text-primary transition-colors"><Smile size={18} /></button>
                  <button className="text-gray-400 hover:text-primary transition-colors"><Paperclip size={18} /></button>
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="hidden lg:flex flex-col w-72 bg-white overflow-y-auto p-5 space-y-6">
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

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => <button key={l} className="hover:text-primary">{l}</button>)}
          </div>
        </footer>
      </div>
    </div>
  );
}
