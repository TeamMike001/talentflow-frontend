// src/app/(student)/student/certifications/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { certificateService } from '@/services/certificateService';
import { Download, Award, Calendar, User, BookOpen } from 'lucide-react';

export default function StudentCertifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchCertificates();
  }, [router]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const data = await certificateService.getMyCertificates();
      setCertificates(data || []);
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
      setError(err.message || 'Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (courseId, courseTitle) => {
    setDownloading(prev => ({ ...prev, [courseId]: true }));
    try {
      const blob = await certificateService.downloadCertificate(courseId);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate_${courseTitle.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download certificate:', err);
      alert(err.message || 'Failed to download certificate');
    } finally {
      setDownloading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const getCertificateStyle = (courseTitle, index) => {
    const styles = [
      { logo: 'VRT', bg: 'bg-red-500' },
      { logo: 'UI', bg: 'bg-purple-500' },
      { logo: 'WD', bg: 'bg-blue-500' },
      { logo: 'DS', bg: 'bg-green-500' },
      { logo: 'AI', bg: 'bg-indigo-500' },
      { logo: 'PM', bg: 'bg-yellow-500' },
    ];
    return styles[index % styles.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-extrabold text-primary text-xl sm:text-2xl">My Certifications</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Award size={18} />
                <span>{certificates.length} {certificates.length === 1 ? 'Certificate' : 'Certificates'} Earned</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">
                {error}
              </div>
            )}

            {certificates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-gray-400" />
                </div>
                <h2 className="font-bold text-xl text-gray-700 mb-2">No Certificates Yet</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Complete a course with 100% progress to earn a certificate.
                </p>
                <button 
                  onClick={() => router.push('/student/courses')}
                  className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {certificates.map((cert, index) => {
                    const style = getCertificateStyle(cert.courseTitle, index);
                    return (
                      <div
                        key={cert.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 hover:border-primary/30 hover:shadow-md transition-all group"
                      >
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                          <span className="text-white font-extrabold text-sm sm:text-base">{style.logo}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h2 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1 leading-snug">
                            {cert.courseTitle}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              TalentFlow Learning
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Issued: {formatDate(cert.issuedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={12} />
                              Course ID: #{cert.courseId}
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            This certificate is awarded to the recipient for successfully completing the course 
                            and demonstrating proficiency in all required areas.
                          </p>
                          <button
                            onClick={() => handleDownload(cert.courseId, cert.courseTitle)}
                            disabled={downloading[cert.courseId]}
                            className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold hover:underline transition-colors disabled:opacity-50"
                          >
                            {downloading[cert.courseId] ? (
                              <>
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download size={16} />
                                Download Certificate
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{certificates.length}</p>
                      <p className="text-xs text-gray-500">Certificates Earned</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {certificates.filter(c => c.issuedAt).length}
                      </p>
                      <p className="text-xs text-gray-500">Completed Courses</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {new Date().getFullYear()}
                      </p>
                      <p className="text-xs text-gray-500">Year of Achievement</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button 
                    onClick={() => router.push('/student/courses')}
                    className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark transition-all"
                  >
                    Browse More Courses
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}