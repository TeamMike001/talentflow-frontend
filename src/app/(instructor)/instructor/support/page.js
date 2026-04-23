// src/app/(instructor)/instructor/support/page.js
'use client';

import { useState } from 'react';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { 
  HelpCircle, Mail, Phone, MessageCircle, Search, 
  ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Award,
  BookOpen, User, AlertCircle, FileText, Video, Star,
  ExternalLink, Download, Clock, Headphones, LifeBuoy,
  DollarSign, Users, BarChart
} from 'lucide-react';

export default function InstructorSupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState(null);

  // FAQ Data for Instructors
  const faqs = [
    {
      id: 1,
      question: 'How do I create a new course?',
      answer: 'Go to "Create Course" from the sidebar. Fill in course details, upload content, and publish when ready.',
      category: 'courses',
      helpful: 89
    },
    {
      id: 2,
      question: 'How to manage student enrollments?',
      answer: 'Go to "My Courses" → Select a course → "Students" tab to view all enrolled students and their progress.',
      category: 'students',
      helpful: 67
    },
    {
      id: 3,
      question: 'How to add lectures and sections?',
      answer: 'In course creation/editing, use the Curriculum tab to add sections and lectures. You can upload videos, add descriptions, and set order.',
      category: 'courses',
      helpful: 123
    },
    {
      id: 4,
      question: 'How do I get paid for my courses?',
      answer: 'Payments are processed monthly. Go to "Analytics" → "Earnings" to view your revenue and payment history.',
      category: 'payments',
      helpful: 56
    },
    {
      id: 5,
      question: 'How to respond to student questions?',
      answer: 'Use the Messages section to communicate with students. You\'ll receive notifications for new messages.',
      category: 'communication',
      helpful: 78
    },
    {
      id: 6,
      question: 'How to track student progress?',
      answer: 'Each course has analytics showing student progress, completion rates, and engagement metrics.',
      category: 'analytics',
      helpful: 92
    },
    {
      id: 7,
      question: 'How to issue certificates?',
      answer: 'Certificates are automatically generated when students complete courses with 100% progress.',
      category: 'certificates',
      helpful: 45
    },
    {
      id: 8,
      question: 'How to promote my courses?',
      answer: 'Share your course link on social media, use email marketing, and encourage student reviews.',
      category: 'marketing',
      helpful: 67
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
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title="Help & Support" />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Instructor Help Center</h1>
            <p className="text-gray-500 mt-1">Resources and support for course creators</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <LifeBuoy size={28} className="mb-2" />
              <h3 className="font-semibold">Priority Support</h3>
              <p className="text-sm opacity-90">For instructors</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
              <Clock size={28} className="mb-2" />
              <h3 className="font-semibold">Fast Response</h3>
              <p className="text-sm opacity-90">Within 12 hours</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <Headphones size={28} className="mb-2" />
              <h3 className="font-semibold">Dedicated Team</h3>
              <p className="text-sm opacity-90">Instructor support</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <Star size={28} className="mb-2" />
              <h3 className="font-semibold">95% Satisfaction</h3>
              <p className="text-sm opacity-90">From 2k+ instructors</p>
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

          {/* FAQ Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors">
              <BookOpen className="mx-auto mb-1 text-blue-600" size={20} />
              <p className="text-xs font-medium text-blue-700">Courses</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center cursor-pointer hover:bg-green-100 transition-colors">
              <Users className="mx-auto mb-1 text-green-600" size={20} />
              <p className="text-xs font-medium text-green-700">Students</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center cursor-pointer hover:bg-purple-100 transition-colors">
              <DollarSign className="mx-auto mb-1 text-purple-600" size={20} />
              <p className="text-xs font-medium text-purple-700">Payments</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center cursor-pointer hover:bg-orange-100 transition-colors">
              <BarChart className="mx-auto mb-1 text-orange-600" size={20} />
              <p className="text-xs font-medium text-orange-700">Analytics</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
              <p className="text-blue-100 text-sm mt-1">Quick answers for instructors</p>
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
                              <span>{faq.helpful} instructors found this helpful</span>
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
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Need instructor support?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email Support</p>
                  <p className="text-sm text-gray-500">instructors@talentflow.com</p>
                  <p className="text-xs text-gray-400 mt-1">Response within 12 hours</p>
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
                  <p className="text-sm text-gray-500">Chat with instructor support</p>
                  <p className="text-xs text-gray-400 mt-1">Available 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Resources */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Instructor Resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <BookOpen size={16} /> Course Creation Guide
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Video size={16} /> Video Best Practices
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <DollarSign size={16} /> Payout Information
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <BarChart size={16} /> Analytics Guide
              </a>
            </div>
          </div>
        </main>
        
        <InstructorFooter />
      </div>
    </div>
  );
}