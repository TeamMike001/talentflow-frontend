// src/app/(instructor)/instructor/instructorcourses/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { 
  ChevronRight, Save, Trash2, Edit, X, Eye, Globe, Users, Star, 
  Clock, BookOpen, UserPlus, Download, Settings, User, Mail, Calendar,
  TrendingUp, Award, Play, AlertCircle, Plus, ChevronDown, Video, FileText
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const mapLectureForEditor = (lecture = {}, lectureIndex = 0) => ({
  id: lecture.id || `lecture-${Date.now()}-${lectureIndex}`,
  name: lecture.name || '',
  videoUrl: lecture.videoUrl || '',
  description: lecture.description || '',
  orderIndex: lecture.orderIndex ?? lectureIndex,
});

const mapSectionForEditor = (section = {}, sectionIndex = 0) => ({
  id: section.id || `section-${Date.now()}-${sectionIndex}`,
  name: section.name || '',
  orderIndex: section.orderIndex ?? sectionIndex,
  lectures: (section.lectures || []).map((lecture, lectureIndex) => mapLectureForEditor(lecture, lectureIndex)),
});

const serializeSectionsForApi = (sections = []) =>
  sections.map((section, sectionIndex) => ({
    ...(typeof section.id === 'number' ? { id: section.id } : {}),
    name: section.name,
    orderIndex: sectionIndex,
    lectures: (section.lectures || []).map((lecture, lectureIndex) => ({
      ...(typeof lecture.id === 'number' ? { id: lecture.id } : {}),
      name: lecture.name,
      videoUrl: lecture.videoUrl,
      description: lecture.description,
      orderIndex: lectureIndex,
    })),
  }));

export default function InstructorCourseDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    category: '',
    level: '',
    language: '',
    duration: '',
    published: false,
    sections: [],
  });

  const uploadLessonVideo = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/upload?folder=course-videos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Video upload failed');
    }

    return response.text();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    if (id) {
      console.log('Course ID:', id);
      fetchCourse();
      fetchAllData();
    } else {
      console.error('No course ID provided');
      setError('Invalid course ID');
      setLoading(false);
    }
  }, [id, router]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchStudentCount(),
      fetchStudents()
    ]);
  };

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching course from:', `${API_BASE_URL}/api/courses/${id}`);
      
      const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Course response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch course: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Course data received:', data);
      const mappedSections = (data.sections || []).map((section, sectionIndex) => mapSectionForEditor(section, sectionIndex));
      setCourse(data);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        thumbnailUrl: data.thumbnailUrl || '',
        category: data.category || '',
        level: data.level || '',
        language: data.language || '',
        duration: data.duration || '',
        published: data.published || false,
        sections: mappedSections,
      });
      setExpandedSections(
        mappedSections.reduce((acc, section, sectionIndex) => ({
          ...acc,
          [section.id]: sectionIndex === 0,
        }), {})
      );
    } catch (err) {
      console.error('Fetch course error:', err);
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/enrollments/course/${id}/count`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const count = await response.json();
        console.log('Student count from API:', count);
        setStudentCount(count);
      } else {
        console.log('Student count endpoint returned:', response.status);
      }
    } catch (err) {
      console.error('Failed to fetch student count:', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching students from:', `${API_BASE_URL}/api/users/courses/${id}/students`);
      
      const response = await fetch(`${API_BASE_URL}/api/users/courses/${id}/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Students response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Students data:', data);
        setStudents(data);
        // Also update student count from the data if the count endpoint fails
        if (data.length > 0 && studentCount === 0) {
          setStudentCount(data.length);
        }
      } else {
        console.log('Students endpoint returned:', response.status);
        setStudents([]);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setStudents([]);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        sections: serializeSectionsForApi(formData.sections),
      };
      const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Failed to update course');
      const updated = await response.json();
      setCourse(updated);
      setFormData({
        title: updated.title || '',
        description: updated.description || '',
        thumbnailUrl: updated.thumbnailUrl || '',
        category: updated.category || '',
        level: updated.level || '',
        language: updated.language || '',
        duration: updated.duration || '',
        published: updated.published || false,
        sections: (updated.sections || []).map((section, sectionIndex) => mapSectionForEditor(section, sectionIndex)),
      });
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to delete course');
      alert('Course deleted successfully');
      router.push('/instructor/instructorcourses');
    } catch (err) {
      alert(err.message || 'Failed to delete course');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async () => {
    const newPublishedStatus = !formData.published;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          published: newPublishedStatus,
          sections: serializeSectionsForApi(formData.sections),
        })
      });
      
      if (!response.ok) throw new Error('Failed to update course status');
      const updated = await response.json();
      setCourse(updated);
      setFormData(prev => ({ ...prev, published: updated.published }));
      alert(`Course ${updated.published ? 'published' : 'unpublished'} successfully!`);
    } catch (err) {
      alert(err.message || 'Failed to update course status');
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    const sectionName = prompt('Enter section name:');
    if (!sectionName?.trim()) return;

    const newSection = {
      id: `section-${Date.now()}`,
      name: sectionName.trim(),
      orderIndex: formData.sections.length,
      lectures: [],
    };

    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setExpandedSections(prev => ({ ...prev, [newSection.id]: true }));
  };

  const deleteSection = (sectionId) => {
    if (!confirm('Delete this section and all its lessons?')) return;

    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
    }));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const addLecture = (sectionId) => {
    const section = formData.sections.find(item => item.id === sectionId);
    setEditingLecture({
      sectionId,
      id: null,
      name: '',
      videoUrl: '',
      description: '',
      orderIndex: section?.lectures?.length || 0,
    });
    setShowLectureModal(true);
  };

  const editLecture = (sectionId, lecture) => {
    setEditingLecture({
      sectionId,
      id: lecture.id,
      name: lecture.name || '',
      videoUrl: lecture.videoUrl || '',
      description: lecture.description || '',
      orderIndex: lecture.orderIndex || 0,
    });
    setShowLectureModal(true);
  };

  const saveLecture = () => {
    if (!editingLecture?.name?.trim()) {
      alert('Lesson title is required.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id !== editingLecture.sectionId) {
          return section;
        }

        if (editingLecture.id) {
          return {
            ...section,
            lectures: section.lectures.map(lecture =>
              lecture.id === editingLecture.id
                ? {
                    ...lecture,
                    name: editingLecture.name.trim(),
                    videoUrl: editingLecture.videoUrl.trim(),
                    description: editingLecture.description,
                  }
                : lecture
            ),
          };
        }

        return {
          ...section,
          lectures: [
            ...section.lectures,
            {
              id: `lecture-${Date.now()}`,
              name: editingLecture.name.trim(),
              videoUrl: editingLecture.videoUrl.trim(),
              description: editingLecture.description,
              orderIndex: section.lectures.length,
            },
          ],
        };
      }),
    }));

    setShowLectureModal(false);
    setEditingLecture(null);
  };

  const deleteLecture = (sectionId, lectureId) => {
    if (!confirm('Delete this lesson?')) return;

    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures
                .filter(lecture => lecture.id !== lectureId)
                .map((lecture, lectureIndex) => ({
                  ...lecture,
                  orderIndex: lectureIndex,
                })),
            }
          : section
      ),
    }));
  };

  const handleLectureVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Only video files are allowed for lesson uploads.');
      return;
    }

    if (file.size > 200 * 1024 * 1024) {
      alert('Lesson video must be less than 200MB.');
      return;
    }

    setUploadingVideo(true);
    try {
      const url = await uploadLessonVideo(file);
      setEditingLecture(prev => ({ ...prev, videoUrl: url }));
    } catch (err) {
      alert(err.message || 'Failed to upload lesson video');
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  const exportStudentsList = () => {
    if (students.length === 0) {
      alert('No students to export');
      return;
    }
    
    const csvContent = [
      ['Student Name', 'Email', 'Enrolled Date', 'Progress (%)'],
      ...students.map(s => [
        s.name,
        s.email,
        new Date(s.enrolledAt).toLocaleDateString(),
        s.progress || 0
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course?.title}_students.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <p className="text-red-600 mb-4 font-medium">{error || 'Course not found'}</p>
          <button onClick={() => router.push('/instructor/instructorcourses')} className="bg-blue-600 text-white px-6 py-2 rounded-xl">
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'content', label: 'Content', icon: Play },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="Course Management" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <button onClick={() => router.push('/instructor/instructorcourses')} className="hover:text-blue-600">
              My Courses
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-700 font-medium">{course.title}</span>
          </nav>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={togglePublished}
              disabled={saving}
              className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 ${
                course.published 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Globe size={18} />
              {course.published ? 'Unpublish Course' : 'Publish Course'}
            </button>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit size={18} /> Edit Course
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
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      title: course.title,
                      description: course.description,
                      thumbnailUrl: course.thumbnailUrl,
                      category: course.category,
                      level: course.level,
                      language: course.language,
                      duration: course.duration,
                      published: course.published,
                      sections: (course.sections || []).map((section, sectionIndex) => mapSectionForEditor(section, sectionIndex)),
                    });
                  }}
                  className="bg-gray-200 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-300 flex items-center gap-2"
                >
                  <X size={18} /> Cancel
                </button>
              </>
            )}

            <button
              onClick={handleDelete}
              disabled={saving}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Trash2 size={18} /> Delete Course
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={course.thumbnailUrl || 'https://via.placeholder.com/600x400?text=Course'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course'; }}
                  />
                </div>

                <div className="flex-1">
                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {course.published ? 'Published' : 'Draft'}
                        </span>
                        {course.category && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {course.category}
                          </span>
                        )}
                        {course.level && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            {course.level}
                          </span>
                        )}
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h1>
                      <p className="text-gray-600 leading-relaxed mb-4">{course.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Users size={14} /> {studentCount} students</span>
                        <span className="flex items-center gap-1"><BookOpen size={14} /> {course.language || 'English'}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {course.duration || 'Self-paced'}</span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                        <input
                          type="text"
                          value={formData.thumbnailUrl}
                          onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                          <select
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                          <select
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Chinese">Chinese</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                          <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="flex flex-col gap-4 border-b bg-gray-50 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Course Materials</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Add lesson videos and reading notes so students can learn inside the course and have their progress update.
                  </p>
                </div>
                {isEditing && (
                  <button
                    onClick={addSection}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus size={18} /> Add Section
                  </button>
                )}
              </div>

              <div className="p-6">
                {formData.sections.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
                    <BookOpen size={42} className="mx-auto mb-4 text-gray-300" />
                    <p className="font-medium text-gray-600">No course materials yet</p>
                    <p className="mt-2 text-sm text-gray-400">
                      Create sections and add lessons with a video URL, notes, or both.
                    </p>
                    {isEditing && (
                      <button
                        onClick={addSection}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        <Plus size={16} /> Add First Section
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.sections.map((section, sectionIndex) => (
                      <div key={section.id} className="overflow-hidden rounded-2xl border">
                        <div className="flex items-center justify-between gap-3 bg-gray-50 px-5 py-4">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="flex flex-1 items-center gap-3 text-left"
                          >
                            {expandedSections[section.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            <div>
                              <p className="font-semibold text-gray-900">
                                Section {sectionIndex + 1}: {section.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {section.lectures.length} lesson{section.lectures.length === 1 ? '' : 's'}
                              </p>
                            </div>
                          </button>

                          {isEditing && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => addLecture(section.id)}
                                className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                title="Add lesson"
                              >
                                <Plus size={16} />
                              </button>
                              <button
                                onClick={() => deleteSection(section.id)}
                                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                title="Delete section"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>

                        {expandedSections[section.id] && (
                          <div className="divide-y">
                            {section.lectures.length === 0 ? (
                              <div className="p-5 text-sm text-gray-400">
                                No lessons in this section yet.
                              </div>
                            ) : (
                              section.lectures.map((lecture, lectureIndex) => (
                                <div key={lecture.id} className="flex items-start justify-between gap-4 p-5">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      {lecture.videoUrl ? (
                                        <Video size={16} className="text-blue-600" />
                                      ) : (
                                        <FileText size={16} className="text-slate-500" />
                                      )}
                                      <p className="font-medium text-gray-900">
                                        Lesson {lectureIndex + 1}: {lecture.name}
                                      </p>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                      <span className={`rounded-full px-2.5 py-1 font-medium ${lecture.videoUrl ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {lecture.videoUrl ? 'Video attached' : 'Reading lesson'}
                                      </span>
                                      <span className={`rounded-full px-2.5 py-1 font-medium ${lecture.description?.trim() ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {lecture.description?.trim() ? 'Notes added' : 'No notes yet'}
                                      </span>
                                    </div>
                                    {lecture.description?.trim() && (
                                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">{lecture.description}</p>
                                    )}
                                  </div>

                                  {isEditing && (
                                    <div className="flex items-center gap-3 text-sm">
                                      <button
                                        onClick={() => editLecture(section.id, lecture)}
                                        className="font-medium text-blue-600 hover:text-blue-700"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => deleteLecture(section.id, lecture.id)}
                                        className="font-medium text-red-600 hover:text-red-700"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Enrolled Students</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {studentCount} student{studentCount !== 1 ? 's' : ''} enrolled in this course
                  </p>
                </div>
                {students.length > 0 && (
                  <button
                    onClick={exportStudentsList}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} /> Export CSV
                  </button>
                )}
              </div>
              
              {students.length === 0 ? (
                <div className="text-center py-20">
                  <UserPlus size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No students enrolled yet</p>
                  <p className="text-sm text-gray-400 mt-1">Share your course link to attract students</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-sm">Student</th>
                        <th className="text-left p-4 font-semibold text-sm">Email</th>
                        <th className="text-left p-4 font-semibold text-sm">Enrolled Date</th>
                        <th className="text-left p-4 font-semibold text-sm">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                {student.name?.charAt(0) || 'S'}
                              </div>
                              <span className="font-medium text-gray-900">{student.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">{student.email}</td>
                          <td className="p-4 text-gray-500">
                            {new Date(student.enrolledAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                                <div 
                                  className={`rounded-full h-2 transition-all ${
                                    student.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${student.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-700">{student.progress || 0}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Course Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Development, Design"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Publish Course (visible to students)</label>
                </div>
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}
        </main>

        {showLectureModal && editingLecture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingLecture.id ? 'Edit Lesson' : 'Add Lesson'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add a video link, lesson notes, or both.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowLectureModal(false);
                    setEditingLecture(null);
                  }}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Lesson Title</label>
                  <input
                    type="text"
                    value={editingLecture.name}
                    onChange={(e) => setEditingLecture({ ...editingLecture, name: e.target.value })}
                    placeholder="Introduction to the course"
                    className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  />
                  </div>

                  <div className="space-y-3 rounded-xl border border-gray-200 p-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Video URL</label>
                      <input
                        type="text"
                        value={editingLecture.videoUrl}
                        onChange={(e) => setEditingLecture({ ...editingLecture, videoUrl: e.target.value })}
                        placeholder="Paste YouTube, Vimeo, or direct video link"
                        className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="edit-lecture-video-upload"
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 font-medium text-white ${
                          uploadingVideo ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <Plus size={16} />
                        {uploadingVideo ? 'Uploading video...' : 'Upload Video File'}
                      </label>
                      <input
                        id="edit-lecture-video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleLectureVideoUpload}
                        className="hidden"
                        disabled={uploadingVideo}
                      />
                      <span className="text-xs text-gray-500">MP4, MOV, WEBM up to 200MB</span>
                    </div>
                    {editingLecture.videoUrl && (
                      <p className="break-all text-xs text-green-600">
                        Video ready: {editingLecture.videoUrl}
                      </p>
                    )}
                  </div>

                  <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Lesson Notes</label>
                  <textarea
                    value={editingLecture.description}
                    onChange={(e) => setEditingLecture({ ...editingLecture, description: e.target.value })}
                    rows={6}
                    placeholder="Add reading material, summary notes, instructions, or links students should use during this lesson."
                    className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowLectureModal(false);
                    setEditingLecture(null);
                  }}
                  className="flex-1 rounded-xl border px-4 py-3 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveLecture}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Save Lesson
                </button>
              </div>
            </div>
          </div>
        )}

        <InstructorFooter />
      </div>
    </div>
  );
}
