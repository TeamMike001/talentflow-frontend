'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Footer from '@/landing_page/Footer';
import {
  ArrowLeft, Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Settings, Maximize, Minimize,
  ChevronDown, ChevronUp, Check, Download, MessageCircle,
  FileText, Clock, Menu, X
} from 'lucide-react';

/* ─── Curriculum Data ───────────────────────────────── */
const curriculum = [
  {
    section: 'Getting Started',
    lectures: 4, duration: '51m', progress: '25% finish (1/4)',
    items: [
      { id: 1, title: '1. Introduction to UI/UX Design', duration: '07:31', done: true, playing: false },
      { id: 2, title: '2. Understanding Design Fundamentals', duration: '07:31', done: false, playing: true },
      { id: 3, title: '3. Overview of Tools (Figma, Webflow)', duration: '07:31', done: false, playing: false },
      { id: 4, title: '4. Setting Up Your Workspace', duration: '07:31', done: false, playing: false },
    ],
  },
  { section: 'Figma Essentials', lectures: 52, duration: '5m 49m', items: [] },
  { section: 'Principles of Good design', lectures: 43, duration: '51m', items: [] },
  { section: 'UI Design Practice', lectures: 137, duration: '10h 6m', items: [] },
  { section: 'Web Development (WebFlow)', lectures: 21, duration: '38m', items: [] },
  { section: 'Freelancing & Monetization', lectures: 39, duration: '1h 31m', items: [] },
  { section: 'Advanced Topic', lectures: 7, duration: '1h 17m', items: [] },
];

/* ─── Comments Data ─────────────────────────────────── */
const allComments = [
  {
    id: 1, name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    time: '1 week ago',
    text: 'This lecture made everything so easy to understand. I finally get how layouts work!',
    replies: [
      { id: 11, name: 'Kristin Watson', badge: 'ADMIN', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', time: '1 week ago', text: 'Very practical and beginner-friendly. Loved the step-by-step approach.' },
      { id: 12, name: 'Cody Fisher', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', time: '1 week ago', text: "Thank You so much sir, you're a great mentor. 🔥🔥🔥" },
    ],
  },
  { id: 2, name: 'Guy Hawkins', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', time: '2 weeks ago', text: 'The resources provided really helped me follow along without getting lost.', replies: [] },
  { id: 3, name: 'Esther Howard', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', time: '2 weeks ago', text: 'Clear explanation and smooth flow. Looking forward to the next lecture!! 🔥', replies: [] },
  { id: 4, name: 'Theresa Webb', avatar: 'https://randomuser.me/api/portraits/women/16.jpg', time: '3 weeks ago', text: 'I appreciate how simple and direct everything was explained.', replies: [] },
  { id: 5, name: 'Marvin McKinney', avatar: 'https://randomuser.me/api/portraits/men/17.jpg', time: '3 weeks ago', text: 'Great content! Helped me build my first page confidently.', replies: [] },
  { id: 6, name: 'Darrell Steward', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', time: '1 month ago', text: "Awesome video. Sometimes, we have got to try and push the possibilities of designs and not be bounded by codes. The fact that the design itself is a push from the norm, it is only expected that to code it would require some level of thinking out of the box. That is what differentiates yourself from others who are just building on top of someone else's code.", replies: [] },
];

const tabs = ['Overview', 'Lectures Notes', 'Attach File', 'Comments'];

/* ─── Comments Section Component (MOVED UP) ────────────── */
function CommentsSection({ comments, visibleComments, setVisibleComments, replyText, setReplyText, postReply }) {
  return (
    <div>
      <h2 className="text-base font-extrabold text-gray-900 mb-5">Comments (54)</h2>
      <div className="space-y-5">
        {comments.slice(0, visibleComments).map(comment => (
          <div key={comment.id}>
            <div className="flex gap-3">
              <img src={comment.avatar} alt={comment.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{comment.name}:</span>
                  <span className="text-gray-400 text-xs">• {comment.time}</span>
                </div>
                <p className="text-gray-600 text-sm mb-1.5">{comment.text}</p>
                <button className="text-gray-400 text-xs flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageCircle size={12} /> REPLY
                </button>
              </div>
            </div>

            {/* Nested replies */}
            {comment.replies?.map(reply => (
              <div key={reply.id} className="ml-12 mt-3 flex gap-3">
                <img src={reply.avatar} alt={reply.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">{reply.name}</span>
                    {reply.badge && (
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded font-bold">{reply.badge}</span>
                    )}
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
      <div className="flex gap-3 mt-6 items-center border-t border-gray-100 pt-5">
        <img src="https://randomuser.me/api/portraits/men/30.jpg" alt="You" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
          <MessageCircle size={15} className="text-gray-300 flex-shrink-0" />
          <input
            type="text"
            placeholder="Write your reply"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && postReply()}
            className="flex-1 text-sm text-gray-600 placeholder-gray-300 focus:outline-none bg-transparent"
          />
        </div>
        <button
          onClick={postReply}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors flex-shrink-0"
        >
          Post Reply
        </button>
      </div>

      {/* Load More */}
      {visibleComments < comments.length && (
        <button
          onClick={() => setVisibleComments(v => v + 3)}
          className="mt-5 px-5 py-2.5 border border-blue-200 text-primary text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          Load More
          <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </button>
      )}
    </div>
  );
}

/* ─── Video Player Component ────────────────────────── */
function VideoPlayer() {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const containerRef = useRef(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const bar = progressRef.current;
    if (!bar || !videoRef.current) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    videoRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    setMuted(next);
    videoRef.current.muted = next;
  };

  const skip = (sec) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(Math.max(videoRef.current.currentTime + sec, 0), duration);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div ref={containerRef} className="relative bg-black group" style={{ aspectRatio: '16/9', maxHeight: '490px' }}>
      {/* Actual video — using a public sample video */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        preload="metadata"
      />

      {/* Big play button overlay (shows when paused) */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <Play size={26} className="text-primary fill-primary ml-1" />
          </div>
        </button>
      )}

      {/* Controls bar — always visible on hover or when paused */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={handleSeek}
          className="w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer hover:h-2.5 transition-all"
        >
          <div
            className="h-full bg-white rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => skip(-10)} className="text-white hover:text-gray-200 transition-colors">
              <SkipBack size={17} />
            </button>
            <button onClick={togglePlay} className="text-white hover:text-gray-200 transition-colors">
              {playing ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
            </button>
            <button onClick={() => skip(10)} className="text-white hover:text-gray-200 transition-colors">
              <SkipForward size={17} />
            </button>

            {/* Volume */}
            <div
              className="flex items-center gap-2 relative"
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              <button onClick={toggleMute} className="text-white hover:text-gray-200 transition-colors">
                {muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              {showVolume && (
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-20 accent-white cursor-pointer"
                />
              )}
            </div>

            <span className="text-white text-xs font-mono">
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-white hover:text-gray-200 transition-colors">
              <Settings size={16} />
            </button>
            <button onClick={toggleFullscreen} className="text-white hover:text-gray-200 transition-colors">
              {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────── */
export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openSections, setOpenSections] = useState({ 'Getting Started': true });
  const [replyText, setReplyText] = useState('');
  const [visibleComments, setVisibleComments] = useState(4);
  const [comments, setComments] = useState(allComments);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSection = (section) =>
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  const postReply = () => {
    if (!replyText.trim()) return;
    const newComment = {
      id: Date.now(),
      name: 'Titus Williams',
      avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
      time: 'Just now',
      text: replyText.trim(),
      replies: [],
    };
    setComments(prev => [...prev, newComment]);
    setReplyText('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── TOP NAVBAR (reusable) ── */}
      <StudentNavbar />

      {/* ── COURSE SUB-HEADER ── */}
      <div className="bg-blue-50/60 border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            href="/student/dashboard"
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-primary transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="font-extrabold text-gray-900 text-sm leading-none mb-0.5">Figma UI UX Design..</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="text-orange-400 text-base leading-none">⬡</span> 6 Sections
              </span>
              <span className="flex items-center gap-1"><Clock size={11}/> 202 lectures</span>
              <span className="flex items-center gap-1"><Clock size={11}/> 19h 37m</span>

                <button className="px-4 py-2 border border-primary text-primary text-xs font-semibold rounded-xl hover:bg-blue-50 transition-colors">
            Write A Review
          </button>
          <button className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-colors">
            Next Lecture
          </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-gray-600"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Video + Content ── */}
        <div className="flex-1 overflow-y-auto bg-white">

          {/* Video Player */}
          <VideoPlayer />

          {/* Lecture title + meta */}
          <div className="px-5 lg:px-8 py-5 border-b border-gray-100">
            <h1 className="text-xl font-extrabold text-gray-900 mb-2">2. Sign up in Webflow</h1>
            <div className="flex flex-wrap items-center gap-5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://randomuser.me/api/portraits/${i%2===0?'women':'men'}/${i+10}.jpg`}
                      alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <span className="font-semibold text-gray-700">512</span>
                <span>Students watching</span>
              </div>
              <span>Last updated: March 26, 2026</span>
              <span>Comments 154</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 lg:px-8 border-b border-gray-100 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {tab === 'Attach File' && (
                    <span className="ml-1.5 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">01</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── TAB CONTENT ── */}
          <div className="px-5 lg:px-8 py-7 space-y-10">

            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <>
                {/* Lectures Description */}
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 mb-1">Lectures Description</h2>
                  <p className="text-xs text-gray-400 mb-4">By Ronald Richards</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    This lecture covers everything you need to start building your first website from scratch.
                    From creating your first page to publishing it online, you&apos;ll follow a step-by-step process
                    designed for beginners. You&apos;ll work alongside guided exercises, with downloadable resources
                    provided at each stage so you can compare your progress and stay on track.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We also introduce key concepts in modern web design, including layout structure, basic
                    interactions, and simple functionality to enhance user experience. Don&apos;t worry if you&apos;re
                    new to this — this lecture is designed to be simple, practical, and easy to follow,
                    helping you build confidence as you progress.
                  </p>
                </div>

                {/* Lectures Description (bullets) */}
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 mb-3">Lectures Description</h2>
                  <ul className="space-y-2">
                    {[
                      'Step-by-step walkthrough of building a webpage',
                      'Downloadable resources for practice',
                      'Key UI/UX design principles explained',
                      'Introduction to layout and interaction basics',
                      'Beginner-friendly approach with real examples',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="mt-2 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lecture Notes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-extrabold text-gray-900">Lecture Notes</h2>
                    <button className="flex items-center gap-1.5 text-primary text-sm font-medium hover:underline">
                      <Download size={14} /> Download Notes
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Step-by-step walkthrough of building a webpage',
                      'Downloadable resources for practice',
                      'Key UI/UX design principles explained',
                      'Introduction to layout and interaction basics',
                      'Beginner-friendly approach with real examples',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="mt-2 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attach Files */}
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 mb-4">Attach Files (01)</h2>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
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

                {/* Comments */}
                <CommentsSection
                  comments={comments}
                  visibleComments={visibleComments}
                  setVisibleComments={setVisibleComments}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  postReply={postReply}
                />
              </>
            )}

            {/* LECTURES NOTES TAB */}
            {activeTab === 'Lectures Notes' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-extrabold text-gray-900">Lecture Notes</h2>
                  <button className="flex items-center gap-1.5 text-primary text-sm font-medium hover:underline">
                    <Download size={14} /> Download Notes
                  </button>
                </div>
                <ul className="space-y-2">
                  {['Step-by-step walkthrough of building a webpage','Downloadable resources for practice','Key UI/UX design principles explained','Introduction to layout and interaction basics','Beginner-friendly approach with real examples'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ATTACH FILE TAB */}
            {activeTab === 'Attach File' && (
              <div>
                <h2 className="text-base font-extrabold text-gray-900 mb-4">Attach Files (01)</h2>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
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

            {/* COMMENTS TAB */}
            {activeTab === 'Comments' && (
              <CommentsSection
                comments={comments}
                visibleComments={visibleComments}
                setVisibleComments={setVisibleComments}
                replyText={replyText}
                setReplyText={setReplyText}
                postReply={postReply}
              />
            )}
          </div>
        </div>

        {/* ── RIGHT: Course Contents ── */}
        <div className={`${sidebarOpen ? 'flex' : 'hidden'} lg:flex flex-col w-170 border-l border-gray-100 overflow-y-auto bg-white flex-shrink-0 mr-10`}>
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="font-extrabold text-gray-900 text-sm">Course Contents</h2>
            <span className="text-green-500 text-xs font-bold">15% Completed</span>
          </div>
          {/* Overall progress bar */}
          <div className="px-4 py-2 border-b border-gray-50">
            <div className="h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }} />
            </div>
          </div>

          {/* Sections */}
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
                      {isOpen
                        ? <ChevronUp size={14} className="text-gray-400 flex-shrink-0" />
                        : <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />}
                      <span className="font-semibold text-gray-900 text-xs truncate">{section.section}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs ml-2 flex-shrink-0">
                      <Clock size={11} />
                      <span>{section.lectures} lectures</span>
                      <span>· {section.duration}</span>
                    </div>
                  </button>

                  {section.progress && isOpen && (
                    <p className="px-10 pb-1 text-green-500 text-xs font-medium">
                      ✓ {section.progress}
                    </p>
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
                        {item.playing
                          ? <Pause size={11} className="text-primary" />
                          : <Play size={11} className="text-gray-300" />}
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
      
      {/* ── FOOTER (MOVED OUTSIDE MAIN BODY) ── */}
      <Footer />
    </div>
  );
}