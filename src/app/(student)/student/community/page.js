'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { 
  Smile, Send, Paperclip, FileText, Users, X, 
  MessageCircle, Search, Loader2, Image, Check, Clock, AtSign, BellRing, ChevronLeft
} from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import EmojiPicker from 'emoji-picker-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function CommunityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('community');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [conversations, setConversations] = useState({});
  const [showUserMentions, setShowUserMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionIndex, setMentionIndex] = useState(-1);
  const [unreadCommunity, setUnreadCommunity] = useState(false);
  const [unreadDirect, setUnreadDirect] = useState({});
  const [notification, setNotification] = useState(null);
  const [scrollToMessageId, setScrollToMessageId] = useState(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const messageRefs = useRef({});
  const router = useRouter();

  // Group messages by date for better organization
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateLabel;
      if (date.toDateString() === today.toDateString()) {
        dateLabel = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      }
      
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(message);
    });
    return groups;
  };

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
    fetchCommunityMessages();
    
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchDirectMessages(selectedUser.id);
      setUnreadDirect(prev => ({ ...prev, [selectedUser.id]: false }));
    }
  }, [selectedUser]);

  // Auto-scroll to bottom for new messages
  useEffect(() => {
    if (messagesEndRef.current && !scrollToMessageId) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Scroll to mentioned message
  useEffect(() => {
    if (scrollToMessageId && messageRefs.current[scrollToMessageId]) {
      setHighlightedMessageId(scrollToMessageId);
      messageRefs.current[scrollToMessageId].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedMessageId(null);
      }, 3000);
      setScrollToMessageId(null);
    }
  }, [messages, scrollToMessageId]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const scrollToMessage = (messageId) => {
    setActiveTab('community');
    setSelectedUser(null);
    setScrollToMessageId(messageId);
    // Remove highlight from URL
    window.history.pushState({}, '', window.location.pathname);
  };

  const formatMessageDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((today - msgDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    const lastAtSymbol = value.lastIndexOf('@');
    if (lastAtSymbol !== -1 && lastAtSymbol === value.length - 1) {
      setShowUserMentions(true);
      setMentionSearch('');
      setMentionIndex(-1);
    } else if (showUserMentions) {
      const textAfterAt = value.substring(lastAtSymbol + 1);
      setMentionSearch(textAfterAt);
    } else {
      setShowUserMentions(false);
    }
  };

  const insertMention = (user) => {
    const lastAtSymbol = input.lastIndexOf('@');
    const newInput = input.substring(0, lastAtSymbol) + `@${user.name} `;
    setInput(newInput);
    setShowUserMentions(false);
    setMentionSearch('');
    inputRef.current?.focus();
  };

  const filteredMentions = allUsers.filter(user => 
    user.id !== currentUser?.id &&
    user.role === 'STUDENT' &&
    user.name?.toLowerCase().includes(mentionSearch.toLowerCase())
  ).slice(0, 5);

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
      console.log('✅ WebSocket Connected to Community');
      setConnected(true);

      client.subscribe('/topic/group', (message) => {
        try {
          const msg = JSON.parse(message.body);
          console.log('📨 Received community message:', msg);
          
          const isSelf = msg.senderId === currentUser?.id;
          
          // Show notification for mentions
          if (!isSelf && msg.taggedUsers?.includes(currentUser?.email)) {
            setNotification({
              type: 'mention',
              message: `${msg.senderName} mentioned you: "${msg.content.substring(0, 50)}${msg.content.length > 50 ? '...' : ''}"`,
              messageId: msg.id
            });
          }
          
          if (activeTab !== 'community') {
            setUnreadCommunity(true);
          }
          
          setMessages(prev => {
            const exists = prev.some(m => m.id === msg.id);
            if (exists) return prev;
            
            const timestamp = msg.timestamp;
            const newMessage = {
              id: msg.id,
              senderId: msg.senderId,
              senderName: msg.senderName,
              senderRole: msg.senderRole,
              senderAvatar: msg.senderAvatar || `https://ui-avatars.com/api/?background=${isSelf ? '2563EB' : '16A34A'}&color=fff&name=${msg.senderName?.charAt(0) || 'U'}`,
              content: msg.content,
              fileUrl: msg.fileUrl,
              messageType: msg.messageType || 'text',
              taggedUsers: msg.taggedUsers || [],
              timestamp: timestamp,
              time: formatMessageTime(timestamp),
              dateLabel: formatMessageDate(timestamp),
              fullDate: new Date(timestamp),
              self: isSelf
            };
            
            const updated = [...prev, newMessage];
            updated.sort((a, b) => a.timestamp - b.timestamp);
            return updated;
          });
        } catch (e) {
          console.error('Failed to parse message:', e);
        }
      });

      client.subscribe('/user/queue/private', (message) => {
        try {
          const msg = JSON.parse(message.body);
          console.log('📨 Received private message:', msg);
          
          const senderId = msg.senderId;
          const isSelf = msg.senderId === currentUser?.id;
          
          if (!isSelf && selectedUser?.id !== senderId) {
            setUnreadDirect(prev => ({ ...prev, [senderId]: true }));
          }
          
          if (!isSelf) {
            setConversations(prev => {
              const existingConv = prev[senderId] || [];
              return {
                ...prev,
                [senderId]: [...existingConv, {
                  id: msg.id,
                  senderId: msg.senderId,
                  senderName: msg.senderName,
                  content: msg.content,
                  fileUrl: msg.fileUrl,
                  messageType: msg.messageType || 'text',
                  timestamp: msg.timestamp,
                  time: formatMessageTime(msg.timestamp),
                  dateLabel: formatMessageDate(msg.timestamp),
                  self: false
                }]
              };
            });
            
            if (selectedUser?.id === senderId) {
              setMessages(prev => {
                const timestamp = msg.timestamp;
                const newMessage = {
                  id: msg.id,
                  senderId: msg.senderId,
                  senderName: msg.senderName,
                  senderRole: msg.senderRole,
                  senderAvatar: `https://ui-avatars.com/api/?background=16A34A&color=fff&name=${msg.senderName?.charAt(0) || 'U'}`,
                  content: msg.content,
                  fileUrl: msg.fileUrl,
                  messageType: msg.messageType || 'text',
                  taggedUsers: [],
                  timestamp: timestamp,
                  time: formatMessageTime(timestamp),
                  dateLabel: formatMessageDate(timestamp),
                  fullDate: new Date(timestamp),
                  self: false
                };
                const updated = [...prev, newMessage];
                updated.sort((a, b) => a.timestamp - b.timestamp);
                return updated;
              });
            }
          }
        } catch (e) {
          console.error('Failed to parse private message:', e);
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/messaging`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const users = await response.json();
        setAllUsers(users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/chat/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedMessages = data.map(msg => {
          const isSelf = msg.senderId === currentUser?.id;
          const timestamp = msg.timestamp;
          return {
            id: msg.id,
            senderId: msg.senderId,
            senderName: msg.senderName,
            senderRole: msg.senderRole,
            senderAvatar: msg.senderAvatar || `https://ui-avatars.com/api/?background=${isSelf ? '2563EB' : '16A34A'}&color=fff&name=${msg.senderName?.charAt(0) || 'U'}`,
            content: msg.content,
            fileUrl: msg.fileUrl,
            messageType: msg.messageType || 'text',
            taggedUsers: msg.taggedUsers || [],
            timestamp: timestamp,
            time: formatMessageTime(timestamp),
            dateLabel: formatMessageDate(timestamp),
            fullDate: new Date(timestamp),
            self: isSelf
          };
        });
        formattedMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Failed to fetch community messages:', error);
    }
  };

  const fetchDirectMessages = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/chat/conversation/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedMessages = data.map(msg => {
          const isSelf = msg.senderId === currentUser?.id;
          const timestamp = msg.timestamp;
          return {
            id: msg.id,
            senderId: msg.senderId,
            senderName: msg.senderName,
            senderRole: msg.senderRole,
            senderAvatar: `https://ui-avatars.com/api/?background=${isSelf ? '2563EB' : '16A34A'}&color=fff&name=${msg.senderName?.charAt(0) || 'U'}`,
            content: msg.content,
            fileUrl: msg.fileUrl,
            messageType: msg.messageType || 'text',
            taggedUsers: [],
            timestamp: timestamp,
            time: formatMessageTime(timestamp),
            dateLabel: formatMessageDate(timestamp),
            fullDate: new Date(timestamp),
            self: isSelf
          };
        });
        formattedMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Failed to fetch direct messages:', error);
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

  const extractTaggedUsers = (content) => {
    const mentionRegex = /@(\w+(?:\s+\w+)*)/g;
    const matches = content.match(mentionRegex);
    if (!matches) return [];
    
    const taggedNames = matches.map(m => m.substring(1));
    const taggedUsers = allUsers.filter(user => 
      user.role === 'STUDENT' &&
      taggedNames.some(name => user.name?.toLowerCase().includes(name.toLowerCase()))
    );
    
    return taggedUsers.map(u => u.email);
  };

  const sendCommunityMessage = async () => {
    if ((!input.trim() && !selectedFile) || !connected || sending) return;

    setSending(true);
    let fileUrl = null;
    let messageType = 'text';
    let tempId = Date.now();
    
    try {
      if (selectedFile) {
        setUploading(true);
        fileUrl = await uploadFile(selectedFile);
        messageType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
        setUploading(false);
      }
      
      const messageContent = input.trim();
      const taggedUsers = extractTaggedUsers(messageContent);
      
      const messageData = {
        content: messageContent,
        fileUrl: fileUrl,
        messageType: messageType,
        taggedUsers: taggedUsers
      };
      
      const now = Date.now();
      
      const tempMessage = {
        id: tempId,
        senderId: currentUser?.id,
        senderName: currentUser?.name,
        senderRole: currentUser?.role,
        senderAvatar: `https://ui-avatars.com/api/?background=2563EB&color=fff&name=${currentUser?.name?.charAt(0) || 'U'}`,
        content: messageContent,
        fileUrl: fileUrl,
        messageType: messageType,
        taggedUsers: taggedUsers,
        timestamp: now,
        time: formatMessageTime(now),
        dateLabel: formatMessageDate(now),
        fullDate: new Date(now),
        self: true,
        status: 'sending'
      };
      
      setMessages(prev => {
        const updated = [...prev, tempMessage];
        updated.sort((a, b) => a.timestamp - b.timestamp);
        return updated;
      });
      
      setInput('');
      setSelectedFile(null);
      setFilePreview(null);
      setShowEmojiPicker(false);
      setShowUserMentions(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      stompClientRef.current.publish({
        destination: '/app/group.send',
        body: JSON.stringify(messageData),
      });
      
      setUnreadCommunity(false);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? { ...msg, status: 'sent' } : msg
        ));
      }, 500);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
      setUploading(false);
    }
  };

  const sendDirectMessage = async () => {
    if ((!input.trim() && !selectedFile) || !connected || !selectedUser || sending) return;

    setSending(true);
    let fileUrl = null;
    let messageType = 'text';
    let tempId = Date.now();
    
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
      
      const tempMessage = {
        id: tempId,
        senderId: currentUser?.id,
        senderName: currentUser?.name,
        senderRole: currentUser?.role,
        senderAvatar: `https://ui-avatars.com/api/?background=2563EB&color=fff&name=${currentUser?.name?.charAt(0) || 'U'}`,
        content: messageContent,
        fileUrl: fileUrl,
        messageType: messageType,
        timestamp: now,
        time: formatMessageTime(now),
        dateLabel: formatMessageDate(now),
        fullDate: new Date(now),
        self: true,
        status: 'sending'
      };
      
      setMessages(prev => {
        const updated = [...prev, tempMessage];
        updated.sort((a, b) => a.timestamp - b.timestamp);
        return updated;
      });
      
      setInput('');
      setSelectedFile(null);
      setFilePreview(null);
      setShowEmojiPicker(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      stompClientRef.current.publish({
        destination: '/app/private.send',
        body: JSON.stringify(messageData),
      });
      
      setConversations(prev => {
        const convId = selectedUser.id;
        const existingConv = prev[convId] || [];
        return {
          ...prev,
          [convId]: [...existingConv, { ...tempMessage, self: true }]
        };
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

  const handleSendMessage = () => {
    if (activeTab === 'community') {
      sendCommunityMessage();
    } else {
      sendDirectMessage();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showUserMentions && filteredMentions.length > 0 && mentionIndex >= 0) {
        insertMention(filteredMentions[mentionIndex]);
      } else {
        handleSendMessage();
      }
    } else if (e.key === 'ArrowDown' && showUserMentions) {
      e.preventDefault();
      setMentionIndex(prev => Math.min(prev + 1, filteredMentions.length - 1));
    } else if (e.key === 'ArrowUp' && showUserMentions) {
      e.preventDefault();
      setMentionIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowUserMentions(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const renderMessageContent = (msg) => {
    if (msg.messageType === 'image' && msg.fileUrl) {
      return (
        <img 
          src={msg.fileUrl} 
          alt="Shared" 
          className="max-w-full rounded-lg max-h-60 object-cover cursor-pointer" 
          onClick={() => window.open(msg.fileUrl, '_blank')} 
        />
      );
    }
    
    if (msg.messageType === 'file' && msg.fileUrl) {
      return (
        <a 
          href={msg.fileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <FileText size={16} /> Download File
        </a>
      );
    }
    
    // Process mentions in the content - make them clickable
    let content = msg.content;
    const mentionRegex = /@(\w+(?:\s+\w+)*)/g;
    const mentionMatches = content.match(mentionRegex);
    
    if (mentionMatches && msg.taggedUsers && msg.taggedUsers.length > 0) {
      mentionMatches.forEach(mention => {
        const userName = mention.substring(1);
        const taggedUser = allUsers.find(u => u.name === userName);
        if (taggedUser) {
          const mentionPattern = new RegExp(`@${userName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
          content = content.replace(mentionPattern, 
            `<span class="text-blue-600 font-semibold bg-blue-50 px-1 rounded cursor-pointer hover:bg-blue-100 mention-tag transition-colors" data-message-id="${msg.id}" data-user-id="${taggedUser.id}">@${userName}</span>`
          );
        }
      });
    }
    
    return (
      <div 
        className="text-sm break-words whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={(e) => {
          const target = e.target;
          if (target.classList && target.classList.contains('mention-tag')) {
            e.stopPropagation();
            const messageId = target.getAttribute('data-message-id');
            if (messageId) {
              scrollToMessage(parseInt(messageId));
            }
          }
        }}
      />
    );
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

  const filteredUsers = allUsers.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedMessages = groupMessagesByDate(messages);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0 min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Notification Banner */}
        {notification && (
          <div className="fixed top-20 right-4 z-50 animate-slide-down">
            <div 
              className="bg-blue-600 text-white rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-3 cursor-pointer hover:bg-blue-700 transition-colors"
              onClick={() => scrollToMessage(notification.messageId)}
            >
              <div className="flex-shrink-0">
                <BellRing size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">You were mentioned</p>
                <p className="text-xs text-blue-100">{notification.message}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setNotification(null); }} className="text-blue-200 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden relative">

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-[#efeae2] border-r border-gray-100 min-w-0">
            {/* Back Button for Mobile */}
            <div className="lg:hidden px-4 pt-3">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft size={20} /> Back
              </button>
            </div>
            
            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6">
              <div className="flex gap-6">
                <button
                  onClick={() => {
                    setActiveTab('community');
                    setSelectedUser(null);
                    fetchCommunityMessages();
                    setUnreadCommunity(false);
                  }}
                  className={`py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'community'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Community Chat
                  {unreadCommunity && (
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('direct');
                    setSelectedUser(null);
                    setMessages([]);
                  }}
                  className={`py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'direct'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Direct Messages
                  {Object.values(unreadDirect).some(v => v) && (
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Chat Header */}
            <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-white/50 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-500 flex-1 text-center">
                {activeTab === 'community' 
                  ? 'Collaborate, share ideas, and ask questions with the community here. Type @ to mention a student!'
                  : selectedUser 
                    ? `Chatting with ${selectedUser.name}`
                    : 'Select a user to start messaging'}
              </p>
              <button
                onClick={() => setPanelOpen(true)}
                className="lg:hidden flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-lg bg-white flex-shrink-0"
              >
                <Users size={13} /> Info
              </button>
            </div>

            {/* Messages Area - WhatsApp Style (Sender Right, Receiver Left, No Duplicate) */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
              {activeTab === 'direct' && !selectedUser ? (
                <div className="text-center py-20">
                  <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Select a user from the members list to start a private conversation</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20">
                  <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                Object.entries(groupedMessages).map(([dateLabel, dateMessages]) => (
                  <div key={dateLabel}>
                    <div className="flex justify-center my-4">
                      <span className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        {dateLabel}
                      </span>
                    </div>
                    {dateMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        ref={el => messageRefs.current[msg.id] = el}
                        className={`flex ${msg.self ? 'justify-end' : 'justify-start'} mb-3 transition-all duration-300 ${
                          highlightedMessageId === msg.id ? 'bg-yellow-100 rounded-lg py-2 px-1 -mx-1' : ''
                        }`}
                      >
                        <div className={`max-w-[75%] ${msg.self ? 'items-end' : 'items-start'}`}>
                          {/* Sender name - only for non-self messages */}
                          {!msg.self && (
                            <div className="flex items-center gap-2 mb-1 ml-2">
                              <img 
                                src={msg.senderAvatar} 
                                alt={msg.senderName} 
                                className="w-5 h-5 rounded-full object-cover" 
                              />
                              <p className="text-xs font-medium text-gray-600">
                                {msg.senderName} • <span className="text-gray-400">{getUserRoleText(msg.senderRole)}</span>
                              </p>
                            </div>
                          )}
                          
                          {/* Message bubble - WhatsApp style */}
                          <div className={`relative px-4 py-2 rounded-2xl ${
                            msg.self 
                              ? 'bg-[#dcf8c5] text-gray-800 rounded-br-md' 
                              : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                          }`}>
                            {renderMessageContent(msg)}
                            
                            {/* Timestamp and status */}
                            <div className={`flex items-center justify-end gap-1 mt-1 ${
                              msg.self ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              <span className="text-[10px]">{msg.time}</span>
                              {msg.self && msg.status === 'sent' && <Check size={10} className="text-gray-500" />}
                              {msg.self && msg.status === 'sending' && <Clock size={10} className="text-gray-500" />}
                            </div>
                          </div>
                          
                          {/* Mention indicator */}
                          {msg.taggedUsers && msg.taggedUsers.includes(currentUser?.email) && !msg.self && (
                            <div className="mt-1 ml-2">
                              <span className="text-xs text-blue-600 inline-flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
                                <AtSign size={10} /> You were mentioned - click on your name to jump
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-3 sm:px-5 py-3 sm:py-4 bg-white relative">
              {selectedFile && (
                <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {filePreview ? (
                      <img src={filePreview} alt="Preview" className="w-10 h-10 rounded object-cover" />
                    ) : selectedFile.type.startsWith('image/') ? (
                      <Image size={20} className="text-gray-500" />
                    ) : (
                      <FileText size={20} className="text-gray-500" />
                    )}
                    <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
                  </div>
                  <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              )}
              
              {/* Mentions Dropdown */}
              {showUserMentions && filteredMentions.length > 0 && (
                <div className="absolute bottom-full left-4 mb-2 w-64 bg-white rounded-xl shadow-lg border max-h-48 overflow-y-auto z-50">
                  <div className="px-3 py-2 bg-gray-50 border-b rounded-t-xl">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <AtSign size={12} /> Tag a student
                    </p>
                  </div>
                  {filteredMentions.map((user, idx) => (
                    <button
                      key={user.id}
                      onClick={() => insertMention(user)}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left ${
                        idx === mentionIndex ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 ${getUserRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">Student</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2 sm:gap-3 border border-gray-200 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:border-blue-500 transition-colors bg-white">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  <Smile size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,application/pdf,.doc,.docx,.txt"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={connected ? (activeTab === 'community' ? "Type @ to mention a student..." : "Type a message...") : "Connecting..."}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  disabled={!connected || (activeTab === 'direct' && !selectedUser)}
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent min-w-0"
                />
                <button 
                  onClick={handleSendMessage} 
                  disabled={(!input.trim() && !selectedFile) || !connected || sending || (activeTab === 'direct' && !selectedUser)}
                  className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {sending || uploading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
              
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className={`
            fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-2xl
            transition-transform duration-300 ease-in-out overflow-y-auto p-5 space-y-6
            lg:static lg:translate-x-0 lg:shadow-none lg:z-auto lg:flex lg:flex-col lg:flex-shrink-0 lg:border-l lg:border-gray-100
            ${panelOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className="flex items-center justify-between lg:hidden mb-2">
              <span className="font-extrabold text-gray-900 text-sm">
                {activeTab === 'community' ? 'Community Info' : 'Members'}
              </span>
              <button onClick={() => setPanelOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {activeTab === 'direct' ? (
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">All Members</h3>
                  {filteredUsers.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No users found</p>
                  ) : (
                    filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user);
                          setPanelOpen(false);
                          fetchDirectMessages(user.id);
                          setUnreadDirect(prev => ({ ...prev, [user.id]: false }));
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                          selectedUser?.id === user.id
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-10 h-10 ${getUserRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <p className="text-xs text-blue-600 mt-0.5">
                            {getUserRoleText(user.role)}
                          </p>
                        </div>
                        {unreadDirect[user.id] && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base mb-4">Community Info</h3>
                  <div className="bg-blue-50 rounded-xl p-4 mb-3">
                    <p className="text-2xl font-bold text-blue-600">{allUsers.length}</p>
                    <p className="text-xs text-gray-600">Total Members</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-green-600">
                      {messages.filter(m => !m.self).length}
                    </p>
                    <p className="text-xs text-gray-600">Messages Sent</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-gray-900 text-sm mb-3">Recent Members</h3>
                  <div className="space-y-3">
                    {allUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${getUserRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400">{getUserRoleText(user.role)}</p>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-gray-900 text-sm mb-3">How to Mention Someone</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 mb-2">Type <span className="font-mono bg-gray-200 px-1 rounded">@</span> followed by their name to mention a student.</p>
                    <p className="text-xs text-gray-500">They will receive a notification when mentioned.</p>
                    <p className="text-xs text-gray-500 mt-2">Click on a mentioned name to jump to that message.</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Community Guidelines</h4>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                    <li>Be respectful to all members</li>
                    <li>No spam or self-promotion</li>
                    <li>Keep discussions relevant</li>
                    <li>Help others when you can</li>
                    <li>Use @ mentions appropriately</li>
                    <li>Only tag students (instructors cannot be tagged)</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 TalentFlow. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => <button key={l} className="hover:text-primary">{l}</button>)}
          </div>
        </footer>
      </div>
    </div>
  );
}