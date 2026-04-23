// src/app/(student)/student/bookmarks/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { bookmarkService } from '@/services/bookmarkService';
import { Bookmark, Trash2 } from 'lucide-react';

export default function StudentBookmarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchBookmarks();
  }, [router]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const data = await bookmarkService.getMyBookmarks();
      setBookmarks(data || []);
    } catch (err) {
      setError('Failed to load your bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (courseId) => {
    setRemoving(prev => ({ ...prev, [courseId]: true }));
    try {
      await bookmarkService.removeBookmark(courseId);
      setBookmarks(prev => prev.filter(b => b.courseId !== courseId));
    } catch (err) {
      setError(err.message || 'Failed to remove bookmark');
    } finally {
      setRemoving(prev => ({ ...prev, [courseId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
              <Bookmark size={28} className="text-primary" />
            </div>
            {error && <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">{error}</div>}
            {bookmarks.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Bookmark size={48} className="mx-auto mb-4 text-gray-300" />
                <h2 className="font-bold text-xl mb-2">No Bookmarks Yet</h2>
                <p className="text-gray-400 mb-6">Browse courses and click the bookmark icon to save them here.</p>
                <Link href="/student/courses" className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-900 flex-1">{bookmark.courseTitle}</h3>
                      <button
                        onClick={() => handleRemoveBookmark(bookmark.courseId)}
                        disabled={removing[bookmark.courseId]}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        {removing[bookmark.courseId] ? (
                          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t">
                      <span className="text-xs text-gray-400">
                        Bookmarked {new Date(bookmark.createdAt).toLocaleDateString()}
                      </span>
                      <Link href={`/student/courses/${bookmark.courseId}`} className="text-primary text-sm font-medium hover:underline">
                        View Course →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}