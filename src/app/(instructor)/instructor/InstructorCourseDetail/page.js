'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Play, MessageSquare, Users, BookOpen, Globe, Paperclip, Clock, Trophy,
  Star, ChevronRight, Save, Trash2, Menu, X, Home, BarChart2, Bell, Settings, LogOut
} from 'lucide-react';
import { instructorService } from '@/services/instructorService';

export default function InstructorCourseDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    published: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchCourse();
  }, [id, router]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const data = await instructorService.getCourse(id);
      setCourse(data);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        published: data.published || false,
      });
    } catch (err) {
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const updated = await instructorService.updateCourse(id, formData);
      setCourse(updated);
      setIsEditing(false);
      alert('Course updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this course? This cannot be undone.')) return;

    setSaving(true);
    try {
      await instructorService.deleteCourse(id);
      alert('Course deleted successfully');
      router.push('/instructor/instructorcourses');
    } catch (err) {
      alert(err.message || 'Failed to delete course');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading course...</div>;
  if (error || !course) return <div className="min-h-screen flex items-center justify-center text-red-600">{error || 'Course not found'}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <InstructorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="Course Management" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => router.push('/instructor/instructorcourses')} className="hover:text-blue-600">
              My Courses
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-700 font-medium">{course.title}</span>
          </nav>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700"
              >
                Edit Course
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} /> Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </>
            )}

            <button
              onClick={handleDelete}
              disabled={saving}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>

          {/* Course Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64 h-52 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/600x400?text=Course'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h1>
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl text-xl font-bold"
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border rounded-xl"
                    />
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl"
                      placeholder="Thumbnail URL"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      />
                      Published
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* You can keep or remove the stats section as needed */}
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}