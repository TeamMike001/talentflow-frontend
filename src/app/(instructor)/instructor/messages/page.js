// src/app/(instructor)/instructor/messages/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { Send, Search, Users, Paperclip, Image, X, Check, Clock, MessageCircle, Circle, RefreshCw, Menu } from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://talentflow-backend-9hue.onrender.com';

export default function InstructorMessages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileUsersOpen, setMobileUsersOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [conversationLastMessages, setConversationLastMessages] = useState({});
  const [lastMessagePreview, setLastMessagePreview] = useState({});

  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
    
    fetchAllUsers();
    connectWebSocket();
    
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchConversation(selectedUser.id);
      if (window.innerWidth < 768) {
        setMobileUsersOpen(false);
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const updateUserLastMessage = (userId, timestamp, messageContent, isFromMe = false) => {
    setConversationLastMessages(prev => ({
      ...prev,
      [userId]: timestamp
    }));
    
    const preview = messageContent ? 
      (isFromMe ? `You: ${messageContent.substring(0, 30)}${messageContent.length > 30 ? '...' : ''}` : 
      `${messageContent.substring(0, 30)}${messageContent.length > 30 ? '...' : ''}`) : 
      'Sent a file';
    
    setLastMessagePreview(prev => ({
      ...prev,
      [userId]: preview
    }));
    
    setAllUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      return updatedUsers.sort((a, b) => {
        const timeA = (userId === a.id ? timestamp : conversationLastMessages[a.id]) || 0;
        const timeB = (userId === b.id ? timestamp : conversationLastMessages[b.id]) || 0;
        return timeB - timeA;
      });
    });
  };

  const connectWebSocket = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('✅ WebSocket Connected');
      setConnected(true);

      client.subscribe('/user/queue/private', (message) => {
        try {
          const msg = JSON.parse(message.body);
          console.log('📨 Received private message:', msg);
          
          const senderId = msg.senderId;
          const timestamp = new Date(msg.timestamp).getTime();
          
          updateUserLastMessage(senderId, timestamp, msg.content, false);
          
          setMessages(prev => {
            const exists = prev.some(m => m.id === msg.id);
            if (exists) return prev;
            
            const newMsg = {
              id: msg.id,
              text: msg.content,
              senderId: msg.senderId,
              senderName: msg.senderName,
              senderRole: msg.senderRole,
              fileUrl: msg.fileUrl,
              messageType: msg.messageType || 'text',
              time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              timestamp: timestamp,
              self: msg.senderId === currentUser?.id,
            };
            
            return [...prev, newMsg];
          });
        } catch (e) {
          console.error('Failed to parse message:', e);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message'] || frame.body);
      setConnected(false);
    };

    client.activate();
    stompClientRef.current = client;
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/users/messaging`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const users = await response.json();
        
        const lastMessageTimes = {};
        const messagePreviews = {};
        
        for (const user of users) {
          try {
            const convResponse = await fetch(`${API_BASE_URL}/api/chat/conversation/${user.id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (convResponse.ok) {
              const convData = await convResponse.json();
              if (convData.length > 0) {
                const lastMessage = convData[convData.length - 1];
                lastMessageTimes[user.id] = new Date(lastMessage.timestamp).getTime();
                
                const isFromMe = lastMessage.senderId === currentUser?.id;
                const preview = lastMessage.content ? 
                  (isFromMe ? `You: ${lastMessage.content.substring(0, 30)}${lastMessage.content.length > 30 ? '...' : ''}` : 
                  `${lastMessage.content.substring(0, 30)}${lastMessage.content.length > 30 ? '...' : ''}`) : 
                  'Sent a file';
                messagePreviews[user.id] = preview;
              }
            }
          } catch (err) {
            console.error('Failed to fetch conversation for user:', user.id);
          }
        }
        setConversationLastMessages(lastMessageTimes);
        setLastMessagePreview(messagePreviews);
        setAllUsers(users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshConversation = async () => {
    if (!selectedUser) return;
    
    setRefreshing(true);
    try {
      await fetchConversation(selectedUser.id);
      await fetchAllUsers();
    } catch (error) {
      console.error('Failed to refresh conversation:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchConversation = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/chat/conversation/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          text: msg.content,
          senderId: msg.senderId,
          senderName: msg.senderName,
          senderRole: msg.senderRole,
          fileUrl: msg.fileUrl,
          messageType: msg.messageType || 'text',
          time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date(msg.timestamp).getTime(),
          self: msg.senderId === currentUser?.id,
        }));
        setMessages(formattedMessages);
        
        if (formattedMessages.length > 0) {
          const lastMsg = formattedMessages[formattedMessages.length - 1];
          updateUserLastMessage(userId, lastMsg.timestamp, lastMsg.text, lastMsg.self);
        }
      }
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/chat/upload`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url;
  };

  const sendMessage = async () => {
    if ((!input.trim() && !selectedFile) || !connected || !selectedUser || sending) return;

    setSending(true);
    let fileUrl = null;
    let messageType = 'text';
    
    try {
      if (selectedFile) {
        setUploading(true);
        fileUrl = await uploadFile(selectedFile);
        messageType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
        setUploading(false);
      }
      
      const messageContent = input.trim();
      const messageData = {
        content: messageContent,
        recipientId: selectedUser.id,
        fileUrl: fileUrl,
        messageType: messageType
      };
      
      const now = Date.now();
      
      const tempId = Date.now();
      const tempMessage = {
        id: tempId,
        text: messageContent,
        fileUrl: fileUrl,
        messageType: messageType,
        senderId: currentUser?.id,
        senderName: currentUser?.name,
        senderRole: currentUser?.role,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: now,
        self: true,
        status: 'sending'
      };
      
      setMessages(prev => [...prev, tempMessage]);
      updateUserLastMessage(selectedUser.id, now, messageContent, true);
      
      setInput('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      stompClientRef.current.publish({
        destination: '/app/private.send',
        body: JSON.stringify(messageData),
      });
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? { ...msg, status: 'sent' } : msg
        ));
      }, 500);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setSending(false);
      setUploading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getUserRoleColor = (role) => {
    if (role === 'INSTRUCTOR') return 'bg-blue-600';
    if (role === 'STUDENT') return 'bg-green-600';
    return 'bg-gray-600';
  };

  const getUserRoleText = (role) => {
    if (role === 'INSTRUCTOR') return 'Instructor';
    if (role === 'STUDENT') return 'Student';
    return role;
  };

  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return 'Never';
    return lastSeen;
  };

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const sortedUsers = [...allUsers].sort((a, b) => {
    const timeA = conversationLastMessages[a.id] || 0;
    const timeB = conversationLastMessages[b.id] || 0;
    return timeB - timeA;
  });
  
  const filteredUsers = sortedUsers.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title="Messages" />
        
        {/* Mobile Users Toggle Button */}
        <div className="md:hidden p-3 bg-white border-b">
          <button
            onClick={() => setMobileUsersOpen(!mobileUsersOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
          >
            <Users size={16} />
            {selectedUser ? `Chatting with ${selectedUser.name}` : 'Select a user'}
          </button>
        </div>
        
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
          
          {/* Users Sidebar */}
          <div className={`
            ${mobileUsersOpen ? 'fixed inset-0 z-50 bg-white w-full' : 'hidden'}
            md:relative md:block md:w-80 md:flex-shrink-0 bg-white border-r flex flex-col h-full
          `}>
            <div className="p-4 border-b flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">Messages</h2>
                <button 
                  onClick={() => setMobileUsersOpen(false)}
                  className="md:hidden p-2 text-gray-500"
                >
                  ✕
                </button>
              </div>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      onClick={() => {
                        setSelectedUser(user);
                        setMobileUsersOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                        selectedUser?.id === user.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 ${getUserRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                          {lastMessageTime && (
                            <span className="text-xs text-gray-400 ml-1 flex-shrink-0">
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

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-[#efeae2] h-full">
            {!selectedUser ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Select a user to start messaging</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 bg-white border-b flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 ${getUserRoleColor(selectedUser.role)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {selectedUser.name?.charAt(0) || selectedUser.email?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-gray-900 truncate">{selectedUser.name || 'User'}</h2>
                      <p className="text-xs text-gray-500 truncate">{selectedUser.email}</p>
                      <p className="text-xs text-blue-600 mt-0.5">{getUserRoleText(selectedUser.role)}</p>
                      <p className="text-xs text-gray-400">Last seen: {formatLastSeen(selectedUser.lastSeen)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={refreshConversation}
                      disabled={refreshing}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                      title="Refresh messages"
                    >
                      <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    </button>
                    <div className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">
                      You: {currentUser?.name}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      <MessageCircle size={40} className="mx-auto mb-3 opacity-50" />
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] sm:max-w-[70%] ${msg.self ? 'items-end' : 'items-start'}`}>
                          {!msg.self && (
                            <p className="text-xs font-semibold text-gray-600 mb-1 ml-2">
                              {msg.senderName}
                            </p>
                          )}
                          <div className={`relative px-4 py-2 ${
                            msg.self 
                              ? 'bg-blue-600 text-white rounded-2xl rounded-br-md' 
                              : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm'
                          }`}>
                            {msg.messageType === 'image' && msg.fileUrl ? (
                              <img src={msg.fileUrl} alt="Shared" className="max-w-full rounded-lg max-h-60 object-cover cursor-pointer" onClick={() => window.open(msg.fileUrl, '_blank')} />
                            ) : msg.messageType === 'file' && msg.fileUrl ? (
                              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                                <Paperclip size={14} /> Download File
                              </a>
                            ) : (
                              <p className="break-words whitespace-pre-wrap text-sm">{msg.text}</p>
                            )}
                            <div className={`flex items-center justify-end gap-1 mt-1 ${
                              msg.self ? 'text-blue-200' : 'text-gray-400'
                            }`}>
                              <span className="text-[10px]">{msg.time}</span>
                              {msg.self && msg.status === 'sent' && <Check size={10} className="text-blue-200" />}
                              {msg.self && msg.status === 'sending' && <Clock size={10} className="text-blue-200" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t flex-shrink-0">
                  {selectedFile && (
                    <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {selectedFile.type.startsWith('image/') ? <Image size={16} /> : <Paperclip size={16} />}
                        <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
                      </div>
                      <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,application/pdf,.doc,.docx,.txt" />
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0" disabled={!connected || sending}>
                      <Paperclip size={20} />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={connected ? `Type a message...` : "Connecting..."}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!connected || sending}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!connected || (!input.trim() && !selectedFile) || sending || uploading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex-shrink-0"
                    >
                      {sending || uploading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : <Send size={18} />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <InstructorFooter />
      </div>
    </div>
  );
}