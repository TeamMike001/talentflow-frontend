'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2,
  Settings, Maximize, ChevronDown, ChevronUp, Check,
  Download, MessageCircle, Bell, ChevronRight, FileText,
  Users, Clock
} from 'lucide-react';

const curriculum = [
  {
    section: 'Getting Started',
    lectures: 4, duration: '51m', progress: '25% finish (1/4)',
    isOpen: true,
    items: [
      { id: 1, title: '1. Introduction to UI/UX Design', duration: '07:31', done: true, playing: false },
      { id: 2, title: '2. Understanding Design Fundamentals', duration: '07:31', done: false, playing: true },
      { id: 3, title: '3. Overview of Tools (Figma, Webflow)', duration: '07:31', done: false, playing: false },
      { id: 4, title: '4. Setting Up Your Workspace', duration: '07:31', done: false, playing: false },
    ],
  },
  { section: 'Figma Essentials', lectures: 52, duration: '5m 49m', isOpen: false, items: [] },
  { section: 'Principles of Good design', lectures: 43, duration: '51m', isOpen: false, items: [] },
  { section: 'UI Design Practice', lectures: 137, duration: '10h 6m', isOpen: false, items: [] },
  { section: 'Web Development (WebFlow)', lectures: 21, duration: '38m', isOpen: false, items: [] },
  { section: 'Freelancing & Monetization', lectures: 39, duration: '1h 31m', isOpen: false, items: [] },
  { section: 'Advanced Topic', lectures: 7, duration: '1h 17m', isOpen: false, items: [] },
];

const comments = [
  {
    id: 1, name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    time: '1 week ago', text: 'This lecture made everything so easy to understand. I finally get how layouts work!',
    replies: [
      { id: 11, name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', badge: 'ADMIN', time: '1 week ago', text: 'Very practical and beginner-friendly. Loved the step-by-step approach.' },
      { id: 12, name: 'Cody Fisher', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', time: '1 week ago', text: 'Thank You so much sir, you\'re a great mentor. 🔥🔥🔥' },
    ]
  },
  { id: 2, name: 'Guy Hawkins', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', time: '2 weeks ago', text: 'The resources provided really helped me follow along without getting lost.', replies: [] },
  { id: 3, name: 'Esther Howard', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', time: '2 weeks ago', text: 'Clear explanation and smooth flow. Looking forward to the next lecture!! 🔥', replies: [] },
  { id: 4, name: 'Theresa Webb', avatar: 'https://randomuser.me/api/portraits/women/16.jpg', time: '3 weeks ago', text: 'I appreciate how simple and direct everything was explained.', replies: [] },
  { id: 5, name: 'Marvin McKinney', avatar: 'https://randomuser.me/api/portraits/men/17.jpg', time: '3 weeks ago', text: 'Great content! Helped me build my first page confidently.', replies: [] },
  { id: 6, name: 'Darrell Steward', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', time: '1 month ago', text: 'Awesome video. Sometimes, we have got to try and push the possibilities of designs and not be bounded by codes...', replies: [] },
];

const tabs = ['Overview', 'Lectures Notes', 'Attach File', 'Comments'];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openSections, setOpenSections] = useState({ 'Getting Started': true });
  const [isPlaying, setIsPlaying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [visibleComments, setVisibleComments] = useState(4);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── TOP BAR ── */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-extrabold text-gray-900 text-sm">
              Welcome back, <span className="text-primary">Titus!</span> 👋
            </p>
            <p className="text-gray-400 text-xs">Boost your tech skills now and stand out.</p>
          </div>
        </div>
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 w-72">
          <svg width="15" height="15" className="text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search..." className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1" />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl bg-gray-100 text-gray-500">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-2">
            <img src="https://randomuser.me/api/portraits/men/30.jpg" alt="User" className="w-8 h-8 rounded-full object-cover" />
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 text-xs">Titus Williams</p>
              <p className="text-gray-400 text-xs">UI/UX Designer</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* ── COURSE SUB-HEADER ── */}
      <div className="bg-blue-50/50 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/courses/1" className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="font-extrabold text-gray-900 text-sm">Figma UI UX Design..</p>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
              <span className="flex items-center gap-1"><span className="text-orange-400">⬡</span> 6 Sections</span>
              <span className="flex items-center gap-1"><Clock size={11}/> 202 lectures</span>
              <span className="flex items-center gap-1"><Clock size={11}/> 19h 37m</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-primary text-primary text-xs font-semibold rounded-xl hover:bg-blue-50 transition-colors">
            Write A Review
          </button>
          <button className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-colors">
            Next Lecture
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT – Video + Tabs ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Video Player */}
          <div className="relative bg-gray-900 h-64 lg:h-80">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80"
              alt="Video"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Controls overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent">
              {/* Progress bar */}
              <div className="px-4 mb-2">
                <div className="h-1 bg-white/30 rounded-full">
                  <div className="h-full bg-white rounded-full" style={{ width: '22%' }} />
                </div>
              </div>
              {/* Controls */}
              <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-gray-200">
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                  </button>
                  <button className="text-white hover:text-gray-200"><SkipBack size={16} /></button>
                  <button className="text-white hover:text-gray-200"><SkipForward size={16} /></button>
                  <span className="text-white text-xs">1:25 / 9:15</span>
                  <button className="text-white hover:text-gray-200"><Volume2 size={16} /></button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-white hover:text-gray-200"><Settings size={16} /></button>
                  <button className="text-white hover:text-gray-200"><Maximize size={16} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture title */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h1 className="text-xl font-extrabold text-gray-900">2. Sign up in Webflow</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://randomuser.me/api/portraits/${i%2===0?'women':'men'}/${i+10}.jpg`} alt="" className="w-5 h-5 rounded-full border border-white object-cover" />
                  ))}
                </div>
                <span className="font-semibold text-gray-600">512</span>
                <span>Students watching</span>
              </div>
              <span>Last updated: March 26, 2026</span>
              <span>Comments 154</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-gray-100">
            <div className="flex gap-6">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors relative ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {tab === 'Attach File' && (
                    <span className="ml-1 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">01</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-6 py-6">
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-extrabold text-gray-900 mb-2">Lectures Description</h2>
                  <p className="text-xs text-gray-400 mb-3">By Ronald Richards</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    This lecture covers everything you need to start building your first website from scratch. From creating your first page to publishing it online, you&apos;ll follow a step-by-step process designed for beginners...
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We also introduce key concepts in modern web design, including layout structure, basic interactions, and simple functionality to enhance user experience. Don&apos;t worry if you&apos;re new to this — this lecture is designed to be simple, practical, and easy to follow, helping you build confidence as you progress.
                  </p>
                </div>
                <div>
                  <h2 className="font-extrabold text-gray-900 mb-3">Lectures Description</h2>
                  <ul className="space-y-1.5">
                    {['Step-by-step walkthrough of building a webpage','Downloadable resources for practice','Key UI/UX design principles explained','Introduction to layout and interaction basics','Beginner-friendly approach with real examples'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'Lectures Notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-extrabold text-gray-900">Lecture Notes</h2>
                  <button className="flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                    <Download size={15} /> Download Notes
                  </button>
                </div>
                <ul className="space-y-1.5">
                  {['Step-by-step walkthrough of building a webpage','Downloadable resources for practice','Key UI/UX design principles explained','Introduction to layout and interaction basics','Beginner-friendly approach with real examples'].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'Attach File' && (
              <div>
                <h2 className="font-extrabold text-gray-900 mb-4">Attach Files (01)</h2>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Create account on Figma.pdf</p>
                      <p className="text-gray-400 text-xs">12.6 MB</p>
                    </div>
                  </div>
                  <button className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                    Download File
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Comments' && (
              <div>
                <h2 className="font-extrabold text-gray-900 mb-5">Comments (54)</h2>
                <div className="space-y-5">
                  {comments.slice(0, visibleComments).map(comment => (
                    <div key={comment.id}>
                      <div className="flex gap-3">
                        <img src={comment.avatar} alt={comment.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">{comment.name}:</span>
                            <span className="text-gray-400 text-xs">• {comment.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-1.5">{comment.text}</p>
                          <button className="text-gray-400 text-xs flex items-center gap-1 hover:text-primary transition-colors">
                            <MessageCircle size={12} /> REPLY
                          </button>
                        </div>
                      </div>
                      {/* Replies */}
                      {comment.replies?.map(reply => (
                        <div key={reply.id} className="ml-12 mt-3 flex gap-3">
                          <img src={reply.avatar} alt={reply.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900">{reply.name}</span>
                              {reply.badge && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded font-bold">{reply.badge}</span>}
                              <span className="text-gray-400 text-xs">• {reply.time}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-1.5">{reply.text}</p>
                            <button className="text-gray-400 text-xs flex items-center gap-1 hover:text-primary transition-colors">
                              <MessageCircle size={12} /> REPLY
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Reply input */}
                <div className="flex gap-3 mt-6 items-center border-t border-gray-100 pt-4">
                  <MessageCircle size={18} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Write your reply"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    className="flex-1 py-2.5 text-sm text-gray-600 placeholder-gray-300 focus:outline-none border-b border-gray-200 focus:border-primary transition-colors"
                  />
                  <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                    Post Reply
                  </button>
                </div>

                {visibleComments < comments.length && (
                  <button
                    onClick={() => setVisibleComments(v => v + 3)}
                    className="mt-5 px-5 py-2 border border-blue-200 text-primary text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    Load More
                    <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT – Course Contents ── */}
        <div className="hidden lg:flex flex-col w-80 border-l border-gray-100 overflow-y-auto bg-white">
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="font-extrabold text-gray-900 text-sm">Course Contents</h2>
            <span className="text-green-500 text-xs font-bold">15% Completed</span>
          </div>
          {/* Progress bar */}
          <div className="px-4 py-2 border-b border-gray-50">
            <div className="h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {curriculum.map((section) => {
              const isOpen = openSections[section.section];
              return (
                <div key={section.section} className="border-b border-gray-50">
                  <button
                    onClick={() => toggleSection(section.section)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {isOpen ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                      <span className="font-semibold text-gray-900 text-xs truncate">{section.section}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs ml-2 flex-shrink-0">
                      <span>{section.lectures} lectures</span>
                      <span>·</span>
                      <span>{section.duration}</span>
                    </div>
                  </button>
                  {section.progress && isOpen && (
                    <p className="px-10 pb-1 text-green-500 text-xs font-medium">{section.progress}</p>
                  )}
                  {isOpen && section.items.map(item => (
                    <button
                      key={item.id}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                        item.playing ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {item.done ? (
                          <div className="w-4 h-4 bg-primary rounded flex items-center justify-center flex-shrink-0">
                            <Check size={10} className="text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className={`w-4 h-4 border-2 rounded flex-shrink-0 ${item.playing ? 'border-primary' : 'border-gray-300'}`} />
                        )}
                        <span className={`text-xs truncate ${item.playing ? 'text-primary font-semibold' : 'text-gray-600'}`}>
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                        {item.playing ? (
                          <Pause size={12} className="text-primary" />
                        ) : (
                          <Play size={12} className="text-gray-300" />
                        )}
                        <span className="text-gray-400 text-xs">{item.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
