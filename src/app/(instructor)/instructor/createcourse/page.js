// src/app/(instructor)/instructor/createcourse/page.js
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { instructorService } from '@/services/instructorService';
import { Upload, X, Plus, Trash2, ChevronDown, ChevronRight, Video, FileText, Check } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

const STEPS = [
  { id: 1, label: 'Basic Information' },
  { id: 2, label: 'Course Content' },
  { id: 3, label: 'Curriculum' },
  { id: 4, label: 'Publish Course' },
];

const categories = [
  'Development', 'Business', 'Design', 'Marketing', 
  'IT & Software', 'Personal Development', 'Photography', 'Music'
];

const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic'];

export default function CreateCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Basic Information
  const [basic, setBasic] = useState({
    title: '', 
    subtitle: '', 
    category: '', 
    subcategory: '', 
    topic: '',
    language: 'English', 
    level: 'Beginner', 
    duration: ''
  });
  
  // Description and Messages
  const [description, setDescription] = useState('');
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [congratsMsg, setCongratsMsg] = useState('');
  
  // Thumbnail
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  
  // Course Sections and Lectures
  const [sections, setSections] = useState([]);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // What You'll Learn, Audience, Requirements
  const [teaches, setTeaches] = useState([]);
  const [newTeach, setNewTeach] = useState('');
  const [audience, setAudience] = useState([]);
  const [newAudience, setNewAudience] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');

  // Upload thumbnail to server - FIXED ENDPOINT
  const uploadThumbnail = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    
    // Use the correct endpoint from your backend
    const response = await fetch(`${API_BASE_URL}/api/upload?folder=thumbnails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Upload failed');
    }
    const url = await response.text(); // Backend returns URL as string
    return url;
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Thumbnail must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      
      setThumbnail(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      
      // Upload immediately
      setUploading(true);
      setError('');
      try {
        const url = await uploadThumbnail(file);
        setThumbnailUrl(url);
        console.log('Upload successful:', url);
      } catch (err) {
        console.error('Upload error:', err);
        setError('Failed to upload thumbnail: ' + err.message);
        // Remove preview if upload failed
        setThumbnailPreview('');
        setThumbnail(null);
      } finally {
        setUploading(false);
      }
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview('');
    setThumbnailUrl('');
    if (thumbnail) {
      URL.revokeObjectURL(thumbnailPreview);
    }
  };

  // Section Management
  const addSection = () => {
    const sectionName = prompt('Enter section name:');
    if (sectionName) {
      setSections([
        ...sections,
        {
          id: Date.now(),
          name: sectionName,
          lectures: [],
          orderIndex: sections.length
        }
      ]);
    }
  };

  const deleteSection = (sectionId) => {
    if (confirm('Delete this section and all its lectures?')) {
      setSections(sections.filter(s => s.id !== sectionId));
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Lecture Management
  const addLecture = (sectionId) => {
    setEditingLecture({
      sectionId,
      id: null,
      name: '',
      videoUrl: '',
      description: '',
      orderIndex: 0
    });
    setShowLectureModal(true);
  };

  const editLecture = (sectionId, lecture) => {
    setEditingLecture({
      sectionId,
      id: lecture.id,
      name: lecture.name,
      videoUrl: lecture.videoUrl,
      description: lecture.description,
      orderIndex: lecture.orderIndex
    });
    setShowLectureModal(true);
  };

  const saveLecture = () => {
    if (!editingLecture.name.trim()) {
      setError('Lecture name is required');
      return;
    }
    
    const updatedSections = sections.map(section => {
      if (section.id === editingLecture.sectionId) {
        let updatedLectures;
        if (editingLecture.id) {
          updatedLectures = section.lectures.map(lecture =>
            lecture.id === editingLecture.id
              ? { ...lecture, ...editingLecture }
              : lecture
          );
        } else {
          updatedLectures = [
            ...section.lectures,
            {
              id: Date.now(),
              ...editingLecture,
              orderIndex: section.lectures.length
            }
          ];
        }
        return { ...section, lectures: updatedLectures };
      }
      return section;
    });
    
    setSections(updatedSections);
    setShowLectureModal(false);
    setEditingLecture(null);
  };

  const deleteLecture = (sectionId, lectureId) => {
    if (confirm('Delete this lecture?')) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
          };
        }
        return section;
      });
      setSections(updatedSections);
    }
  };

  // Add list items
  const addTeach = () => {
    if (newTeach.trim()) {
      setTeaches([...teaches, newTeach.trim()]);
      setNewTeach('');
    }
  };

  const removeTeach = (index) => {
    setTeaches(teaches.filter((_, i) => i !== index));
  };

  const addAudience = () => {
    if (newAudience.trim()) {
      setAudience([...audience, newAudience.trim()]);
      setNewAudience('');
    }
  };

  const removeAudience = (index) => {
    setAudience(audience.filter((_, i) => i !== index));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const goNext = () => setStep(s => Math.min(s + 1, 4));
  const goPrev = () => setStep(s => Math.max(s - 1, 1));

  const prepareCourseData = () => ({
    title: basic.title.trim(),
    subtitle: basic.subtitle,
    category: basic.category,
    subcategory: basic.subcategory,
    topic: basic.topic,
    language: basic.language,
    level: basic.level,
    duration: parseInt(basic.duration) || 0,
    description: description,
    teaches: teaches,
    audience: audience,
    requirements: requirements,
    sections: sections.map((section, idx) => ({
      name: section.name,
      orderIndex: idx,
      lectures: section.lectures.map((lecture, lIdx) => ({
        name: lecture.name,
        videoUrl: lecture.videoUrl,
        description: lecture.description,
        orderIndex: lIdx
      }))
    })),
    thumbnailUrl: thumbnailUrl,
    welcomeMessage: welcomeMsg,
    congratsMessage: congratsMsg,
    published: false
  });

  const validateStep = () => {
    if (step === 1) {
      if (!basic.title.trim()) {
        setError('Course title is required');
        return false;
      }
      if (!basic.category) {
        setError('Please select a category');
        return false;
      }
    }
    if (step === 2) {
      if (!description.trim()) {
        setError('Course description is required');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const courseData = prepareCourseData();
      const response = await instructorService.createCourse(courseData);
      
      setSuccess('Course created successfully!');
      
      // Redirect to Instructor My Courses page
      setTimeout(() => {
        router.push('/instructor/InstructorMyCourses');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create course. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-8">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-between">
              {STEPS.map((s) => (
                <div key={s.id} className="flex-1 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${
                    step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.id}
                  </div>
                  <p className={`text-sm mt-2 ${step >= s.id ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded-full"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 max-w-4xl mx-auto shadow-sm border">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6 border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl mb-6 border border-green-200">
                {success}
              </div>
            )}

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                  <input
                    type="text"
                    value={basic.title}
                    onChange={(e) => setBasic(prev => ({...prev, title: e.target.value}))}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    className="w-full p-4 border rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={basic.subtitle}
                    onChange={(e) => setBasic(prev => ({...prev, subtitle: e.target.value}))}
                    placeholder="A brief description of what students will learn"
                    className="w-full p-4 border rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={basic.category}
                      onChange={(e) => setBasic(prev => ({...prev, category: e.target.value}))}
                      className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={basic.level}
                      onChange={(e) => setBasic(prev => ({...prev, level: e.target.value}))}
                      className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={basic.language}
                      onChange={(e) => setBasic(prev => ({...prev, language: e.target.value}))}
                      className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <input
                      type="number"
                      value={basic.duration}
                      onChange={(e) => setBasic(prev => ({...prev, duration: e.target.value}))}
                      placeholder="e.g., 10"
                      className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory/Topic</label>
                  <input
                    type="text"
                    value={basic.topic}
                    onChange={(e) => setBasic(prev => ({...prev, topic: e.target.value}))}
                    placeholder="e.g., Frontend Development"
                    className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Course Content */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Course Content</h2>
                
                {/* Thumbnail Upload - FIXED */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Thumbnail</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                    {thumbnailPreview ? (
                      <div className="relative inline-block">
                        <img src={thumbnailPreview} alt="Thumbnail" className="max-h-48 rounded-lg mx-auto" />
                        <button
                          onClick={removeThumbnail}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="thumbnail"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                          disabled={uploading}
                        />
                        <label htmlFor="thumbnail" className="cursor-pointer block">
                          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                          <p className="text-gray-500">
                            {uploading ? 'Uploading...' : 'Click to upload thumbnail'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </label>
                      </>
                    )}
                  </div>
                  {thumbnailUrl && (
                    <p className="text-xs text-green-600 mt-2">✓ Thumbnail uploaded successfully</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Write a detailed description of your course..."
                    className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                  />
                </div>

                {/* What You'll Learn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What Students Will Learn</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTeach}
                      onChange={(e) => setNewTeach(e.target.value)}
                      placeholder="e.g., Build responsive websites"
                      className="flex-1 p-3 border rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && addTeach()}
                    />
                    <button onClick={addTeach} className="px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {teaches.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Check size={16} className="text-green-500" />
                        <span className="flex-1 text-sm">{item}</span>
                        <button onClick={() => removeTeach(idx)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                      placeholder="e.g., Beginner developers"
                      className="flex-1 p-3 border rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && addAudience()}
                    />
                    <button onClick={addAudience} className="px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {audience.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Check size={16} className="text-green-500" />
                        <span className="flex-1 text-sm">{item}</span>
                        <button onClick={() => removeAudience(idx)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements/Prerequisites</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="e.g., Basic HTML knowledge"
                      className="flex-1 p-3 border rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                    />
                    <button onClick={addRequirement} className="px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {requirements.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Check size={16} className="text-green-500" />
                        <span className="flex-1 text-sm">{item}</span>
                        <button onClick={() => removeRequirement(idx)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Curriculum */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Course Curriculum</h2>
                  <button
                    onClick={addSection}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    <Plus size={18} /> Add Section
                  </button>
                </div>

                {sections.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-2xl">
                    <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>No sections yet. Click "Add Section" to start building your course.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sections.map((section, idx) => (
                      <div key={section.id} className="border rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-gray-50">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center gap-2 flex-1 text-left"
                          >
                            {expandedSections[section.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            <span className="font-semibold">Section {idx + 1}: {section.name}</span>
                            <span className="text-xs text-gray-500">({section.lectures.length} lectures)</span>
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addLecture(section.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Add Lecture"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => deleteSection(section.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {expandedSections[section.id] && (
                          <div className="divide-y">
                            {section.lectures.length === 0 ? (
                              <div className="p-4 text-center text-gray-400 text-sm">
                                No lectures yet. Click + to add a lecture.
                              </div>
                            ) : (
                              section.lectures.map((lecture, lIdx) => (
                                <div key={lecture.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                                  <div className="flex items-center gap-3">
                                    <Video size={16} className="text-blue-500" />
                                    <span className="text-sm">Lecture {lIdx + 1}: {lecture.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => editLecture(section.id, lecture)}
                                      className="text-gray-500 hover:text-blue-600 text-sm"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => deleteLecture(section.id, lecture.id)}
                                      className="text-gray-500 hover:text-red-600 text-sm"
                                    >
                                      Delete
                                    </button>
                                  </div>
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
            )}

            {/* Step 4: Publish Course */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Publish Course</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                  <textarea
                    value={welcomeMsg}
                    onChange={(e) => setWelcomeMsg(e.target.value)}
                    placeholder="A warm welcome message for students who enroll..."
                    rows={3}
                    className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Congratulations Message</label>
                  <textarea
                    value={congratsMsg}
                    onChange={(e) => setCongratsMsg(e.target.value)}
                    placeholder="Message shown when students complete the course..."
                    rows={3}
                    className="w-full p-4 border rounded-2xl focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Course Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {basic.title || 'Not set'}</p>
                    <p><strong>Category:</strong> {basic.category || 'Not set'}</p>
                    <p><strong>Level:</strong> {basic.level}</p>
                    <p><strong>Sections:</strong> {sections.length}</p>
                    <p><strong>Total Lectures:</strong> {sections.reduce((sum, s) => sum + s.lectures.length, 0)}</p>
                    <p><strong>Thumbnail:</strong> {thumbnailUrl ? '✓ Uploaded' : '❌ Not uploaded'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t">
              {step > 1 && (
                <button 
                  onClick={goPrev} 
                  className="px-8 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button 
                  onClick={() => {
                    if (validateStep()) goNext();
                  }} 
                  className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors ml-auto"
                >
                  Save & Next
                </button>
              ) : (
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors ml-auto"
                >
                  {loading ? 'Creating Course...' : 'Create & Publish Course'}
                </button>
              )}
            </div>
          </div>

          {/* Lecture Modal */}
          {showLectureModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">
                  {editingLecture?.id ? 'Edit Lecture' : 'Add Lecture'}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingLecture?.name || ''}
                    onChange={(e) => setEditingLecture({...editingLecture, name: e.target.value})}
                    placeholder="Lecture Name"
                    className="w-full p-3 border rounded-xl"
                  />
                  <input
                    type="text"
                    value={editingLecture?.videoUrl || ''}
                    onChange={(e) => setEditingLecture({...editingLecture, videoUrl: e.target.value})}
                    placeholder="Video URL (YouTube, Vimeo, or direct link)"
                    className="w-full p-3 border rounded-xl"
                  />
                  <textarea
                    value={editingLecture?.description || ''}
                    onChange={(e) => setEditingLecture({...editingLecture, description: e.target.value})}
                    placeholder="Lecture description (optional)"
                    rows={3}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowLectureModal(false)}
                    className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveLecture}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        <InstructorFooter />
      </div>
    </div>
  );
}