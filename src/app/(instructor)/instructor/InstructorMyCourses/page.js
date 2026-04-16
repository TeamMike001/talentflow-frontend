// src/app/(instructor)/instructor/instructorcourses/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { Search, Star, Users, BookOpen, Eye, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { instructorService } from '@/services/instructorService';

const API_BASE_URL = 'http://localhost:8080';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} className="fill-yellow-400 text-yellow-400" />
      <span className="text-xs font-bold text-gray-700">{rating ? rating.toFixed(1) : '—'}</span>
    </div>
  );
}

function CourseCard({ course, onManage, onDelete, token }) {
  const [studentCount, setStudentCount] = useState(course.studentsCount || course.enrolledCount || 0);
  
  useEffect(() => {
    // Fetch actual student count for this course
    const fetchStudentCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/enrollments/course/${course.id}/count`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const count = await response.json();
          setStudentCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch student count:', err);
      }
    };
    fetchStudentCount();
  }, [course.id, token]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-300 transition-all group">
      <div className="h-36 sm:h-44 overflow-hidden bg-gray-100 relative">
        <img
          src={course.thumbnailUrl || course.thumbnail || 'https://via.placeholder.com/600x400?text=Course'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course'; }}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onManage(course.id);
            }}
            className="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            title="Manage Course"
          >
            <Edit size={14} className="text-blue-600" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(course.id);
            }}
            className="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            title="Delete Course"
          >
            <Trash2 size={14} className="text-red-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">
          {course.category || 'GENERAL'}
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <StarRating rating={course.averageRating || course.rating} />
          <div className="flex items-center gap-1">
            <Users size={11} />
            <span>{studentCount} student{studentCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 text-[10px] font-medium rounded-full ${
            course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {course.published ? 'Published' : 'Draft'}
          </span>
          <button 
            onClick={() => onManage(course.id)}
            className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1"
          >
            Manage <Eye size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InstructorMyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      router.push('/signin');
      return;
    }
    setToken(authToken);
    fetchMyCourses();
  }, [router]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const authToken = localStorage.getItem('token');
      if (!authToken) {
        router.push('/signin');
        return;
      }

      const courses = await instructorService.getMyCourses();
      setMyCourses(courses || []);
      setFilteredCourses(courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message || "Failed to load your courses. Please try again.");
      
      if (err.message?.includes('401') || err.message?.includes('unauthorized')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setMyCourses(prev => prev.filter(c => c.id !== courseId));
          alert('Course deleted successfully');
        } else {
          throw new Error('Failed to delete course');
        }
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  useEffect(() => {
    let result = [...myCourses];

    if (search) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    setFilteredCourses(result);
  }, [myCourses, search, sort]);

  const handleManageCourse = (courseId) => {
    router.push(`/instructor/instructorcourses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar 
          greeting={`Good ${new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}`}
          title="My Courses" 
        />

        <main className="flex-1 p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-500 mt-1">Manage all your created courses</p>
            </div>
            <Link 
              href="/instructor/createcourse" 
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} /> Create New Course
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search in your courses..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Sort by</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500"
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{myCourses.length}</p>
              <p className="text-xs text-gray-500">Total Courses</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{myCourses.filter(c => c.published).length}</p>
              <p className="text-xs text-gray-500">Published</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{myCourses.filter(c => !c.published).length}</p>
              <p className="text-xs text-gray-500">Drafts</p>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onManage={handleManageCourse}
                  onDelete={handleDeleteCourse}
                  token={token}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <BookOpen size={64} className="mx-auto mb-6 text-gray-300" />
              <p className="text-xl font-medium text-gray-700 mb-2">No courses yet</p>
              <p className="text-gray-500 mb-8">You haven't created any courses yet.</p>
              <Link 
                href="/instructor/createcourse"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} /> Create Your First Course
              </Link>
            </div>
          )}
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}