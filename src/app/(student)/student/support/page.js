// src/app/(student)/student/support/page.js
'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { 
  HelpCircle, Mail, Phone, MessageCircle, Search, 
  ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Award,
  BookOpen, User, AlertCircle, FileText, Video, Star,
  ExternalLink, Download, Clock, Headphones, LifeBuoy
} from 'lucide-react';

export default function StudentSupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState(null);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'Go to Settings → Account Security → Change Password. Enter your current password and new password to update.',
      category: 'account',
      helpful: 45
    },
    {
      id: 2,
      question: 'How to access my courses?',
      answer: 'Click on "Courses" in the sidebar menu. You\'ll see all enrolled courses. Click on any course to start learning.',
      category: 'courses',
      helpful: 128
    },
    {
      id: 3,
      question: 'How to download certificates?',
      answer: 'After completing a course, go to "Certifications" section. Click "Download Certificate" next to the completed course.',
      category: 'certificates',
      helpful: 67
    },
    {
      id: 4,
      question: 'How to join live sessions?',
      answer: 'Live sessions appear in "Events" tab. Click "Join Session" 10 minutes before the scheduled time.',
      category: 'events',
      helpful: 89
    },
    {
      id: 5,
      question: 'How to contact an instructor?',
      answer: 'Go to the course page, click on instructor\'s name, and use the "Message Instructor" button.',
      category: 'courses',
      helpful: 34
    },
    {
      id: 6,
      question: 'How to track my learning progress?',
      answer: 'Your progress is shown on the course page and dashboard. Each course has a progress bar showing your completion percentage.',
      category: 'courses',
      helpful: 56
    },
    {
      id: 7,
      question: 'How to request a refund?',
      answer: 'Contact support within 7 days of purchase. Provide order details and reason for refund request.',
      category: 'billing',
      helpful: 23
    },
    {
      id: 8,
      question: 'Can I access courses on mobile?',
      answer: 'Yes! Our platform is fully responsive and works on all devices - mobile, tablet, and desktop.',
      category: 'technical',
      helpful: 78
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRating = (faqId, value) => {
    setRating({ faqId, value });
    setTimeout(() => {
      alert('Thank you for your feedback!');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
            <p className="text-gray-500 mt-1">Find answers to your questions</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <LifeBuoy size={28} className="mb-2" />
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm opacity-90">Always here for you</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
              <Clock size={28} className="mb-2" />
              <h3 className="font-semibold">Quick Response</h3>
              <p className="text-sm opacity-90">Under 24 hours</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <Headphones size={28} className="mb-2" />
              <h3 className="font-semibold">Expert Team</h3>
              <p className="text-sm opacity-90">Dedicated support</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <Star size={28} className="mb-2" />
              <h3 className="font-semibold">98% Satisfaction</h3>
              <p className="text-sm opacity-90">From 10k+ users</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
              <p className="text-blue-100 text-sm mt-1">Quick answers to common questions</p>
            </div>
            
            <div className="p-6">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <HelpCircle size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No matching questions found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        {openFaq === faq.id ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                      </button>
                      {openFaq === faq.id && (
                        <div className="p-4 bg-gray-50 border-t">
                          <p className="text-gray-600 mb-4">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <ThumbsUp size={14} />
                              <span>{faq.helpful} found this helpful</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">Was this helpful?</span>
                              <button 
                                onClick={() => handleRating(faq.id, 'helpful')}
                                className={`p-1 rounded transition-colors ${
                                  rating?.faqId === faq.id && rating?.value === 'helpful'
                                    ? 'text-green-600 bg-green-50'
                                    : 'text-gray-400 hover:text-green-600'
                                }`}
                              >
                                <ThumbsUp size={16} />
                              </button>
                              <button 
                                onClick={() => handleRating(faq.id, 'not-helpful')}
                                className={`p-1 rounded transition-colors ${
                                  rating?.faqId === faq.id && rating?.value === 'not-helpful'
                                    ? 'text-red-600 bg-red-50'
                                    : 'text-gray-400 hover:text-red-600'
                                }`}
                              >
                                <ThumbsDown size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Options */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Still need help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email Support</p>
                  <p className="text-sm text-gray-500">support@talentflow.com</p>
                  <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone Support</p>
                  <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                  <p className="text-xs text-gray-400 mt-1">Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Live Chat</p>
                  <p className="text-sm text-gray-500">Chat with an agent</p>
                  <p className="text-xs text-gray-400 mt-1">Available 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <BookOpen size={16} /> User Guide
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Video size={16} /> Video Tutorials
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Award size={16} /> Certificate Guide
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <ExternalLink size={16} /> Community Forum
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}