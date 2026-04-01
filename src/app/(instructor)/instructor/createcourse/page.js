'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import {
  Search, Bell, X, Plus, Pencil, Trash2, GripVertical,
  ChevronDown, Upload, Image as ImageIcon, Play, FileText,
  Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered,
  Check, AlertCircle
} from 'lucide-react';

/* ── Step indicator ─────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Basic Information', icon: '☰' },
  { id: 2, label: 'Advance Information', icon: '📋' },
  { id: 3, label: 'Curriculum', icon: '📹' },
  { id: 4, label: 'Publish Course', icon: '▶' },
];

/* ── Modal wrapper ──────────────────────────────── */
function Modal({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">{footer}</div>}
      </div>
    </div>
  );
}

/* ── Drag-drop file zone ────────────────────────── */
function DropZone({ label, hint, accept, onFile, file }) {
  const ref = useRef();
  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); onFile?.(e.dataTransfer.files[0]); }}
      className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-blue-50/30 transition-all"
    >
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={e => onFile?.(e.target.files[0])} />
      {file ? (
        <p className="text-sm text-primary font-medium">{file.name}</p>
      ) : (
        <>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-1">
            Drag an drop a file or <span className="text-primary font-medium">browse file</span>
          </p>
        </>
      )}
    </div>
  );
}

/* ── Dynamic list of inputs ─────────────────────── */
function DynamicList({ label, count, items, onChange, onAdd, placeholder }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">{label} ({items.length}/{count})</h3>
        {items.length < count && (
          <button onClick={onAdd} className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            <Plus size={14} /> Add new
          </button>
        )}
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i}>
            <p className="text-xs text-gray-400 mb-1">{String(i + 1).padStart(2, '0')}</p>
            <div className="relative">
              <input
                type="text"
                value={item}
                placeholder={placeholder}
                maxLength={120}
                onChange={e => onChange(i, e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-100 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">
                {item.length}/120
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
export default function CreateCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  /* Step 1 state */
  const [basic, setBasic] = useState({ title: '', subtitle: '', category: '', subcategory: '', topic: '', language: '', level: '', duration: '' });

  /* Step 2 state */
  const [thumbnail, setThumbnail] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [description, setDescription] = useState('');
  const [teaches, setTeaches] = useState(['', '', '', '']);
  const [audience, setAudience] = useState(['', '', '', '']);
  const [requirements, setRequirements] = useState(['', '', '', '']);

  /* Step 3 state */
  const [sections, setSections] = useState([{ id: 1, name: 'Section name', lectures: [{ id: 1, name: 'Lecture name' }, { id: 2, name: 'Lecture name' }] }]);
  const [contentMenu, setContentMenu] = useState(null); // { sectionId, lectureId }
  const [modal, setModal] = useState(null); // 'video'|'notes'|'attach'|'caption'|'description'|'editSection'
  const [modalData, setModalData] = useState({});
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [descText, setDescText] = useState('');
  const [attachFile, setAttachFile] = useState(null);
  const [sectionNameEdit, setSectionNameEdit] = useState('');

  /* Step 4 state */
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [congratsMsg, setCongratsMsg] = useState('');
  const [instructorSearch, setInstructorSearch] = useState('');
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Username', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Username', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
  ]);

  /* ── Helpers ── */
  const goNext = () => setStep(s => Math.min(s + 1, 4));
  const goPrev = () => setStep(s => Math.max(s - 1, 1));

  const addSection = () => setSections(prev => [...prev, { id: Date.now(), name: 'Section name', lectures: [{ id: Date.now() + 1, name: 'Lecture name' }] }]);
  const addLecture = (sectionId) => setSections(prev => prev.map(s => s.id === sectionId ? { ...s, lectures: [...s.lectures, { id: Date.now(), name: 'Lecture name' }] } : s));
  const deleteSection = (sectionId) => setSections(prev => prev.filter(s => s.id !== sectionId));
  const deleteLecture = (sectionId, lectureId) => setSections(prev => prev.map(s => s.id === sectionId ? { ...s, lectures: s.lectures.filter(l => l.id !== lectureId) } : s));
  const removeInstructor = (id) => setInstructors(prev => prev.filter(i => i.id !== id));

  const openModal = (type, data = {}) => { setModal(type); setModalData(data); setContentMenu(null); };
  const closeModal = () => { setModal(null); setUploadedVideo(null); };

  const videoInputRef = useRef();

  /* ── Step Header ── */
  const StepHeader = () => (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
      {STEPS.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => done && setStep(s.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                active ? 'border-primary text-primary' : done ? 'border-green-400 text-green-600 cursor-pointer' : 'border-transparent text-gray-400'
              }`}
            >
              <span>{s.icon}</span>
              {s.label}
              {done && <Check size={14} className="text-green-500" />}
              {active && <span className="text-gray-400 font-normal">7/12</span>}
            </button>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-gray-200 flex-shrink-0" />}
          </div>
        );
      })}
    </div>
  );

  /* ── STEP 1: Basic Information ── */
  const Step1 = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">Basic Information</h2>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Save</button>
          <button className="px-5 py-2 text-primary text-sm font-semibold hover:underline">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tittle</label>
          <div className="relative">
            <input type="text" placeholder="You course tittle" maxLength={80} value={basic.title}
              onChange={e => setBasic(b => ({ ...b, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-100"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">{basic.title.length}/80</span>
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtittle</label>
          <div className="relative">
            <input type="text" placeholder="You course subtittle" maxLength={120} value={basic.subtitle}
              onChange={e => setBasic(b => ({ ...b, subtitle: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-100"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">{basic.subtitle.length}/120</span>
          </div>
        </div>

        {/* Category + Sub-category */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Category</label>
            <div className="relative">
              <select value={basic.category} onChange={e => setBasic(b => ({ ...b, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-primary text-gray-500 bg-white">
                <option value="">Select...</option>
                <option>UI/UX Design</option><option>Frontend Development</option>
                <option>Backend Development</option><option>Data & Analysis</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Sub-category</label>
            <div className="relative">
              <select value={basic.subcategory} onChange={e => setBasic(b => ({ ...b, subcategory: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-primary text-gray-500 bg-white">
                <option value="">Select...</option>
                <option>Figma</option><option>Adobe XD</option><option>React</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Topic</label>
          <input type="text" placeholder="What is primarily taught in your course?" value={basic.topic}
            onChange={e => setBasic(b => ({ ...b, topic: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-100"
          />
        </div>

        {/* Language + Level + Duration */}
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Language</label>
            <div className="relative">
              <select value={basic.language} onChange={e => setBasic(b => ({ ...b, language: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-primary text-gray-500 bg-white">
                <option value="">Select...</option>
                <option>English</option><option>Mandarin</option><option>French</option><option>Spanish</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course level</label>
            <div className="relative">
              <select value={basic.level} onChange={e => setBasic(b => ({ ...b, level: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-primary text-gray-500 bg-white">
                <option value="">Select...</option>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Durations</label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:border-primary">
              <input type="text" placeholder="Course durations" value={basic.duration}
                onChange={e => setBasic(b => ({ ...b, duration: e.target.value }))}
                className="flex-1 px-3 py-3 text-sm focus:outline-none" />
              <div className="flex items-center gap-1 px-3 border-l border-gray-200 text-sm text-gray-500 bg-gray-50 cursor-pointer select-none">
                Day <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── STEP 2: Advance Information ── */
  const Step2 = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">Advance Information</h2>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Save</button>
          <button className="px-5 py-2 text-primary text-sm font-semibold hover:underline">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-7">
        {/* Thumbnail + Trailer */}
        <div className="grid grid-cols-2 gap-8">
          {/* Thumbnail */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Course Thumbnail</h3>
            <div className="flex gap-4 items-start">
              <div className="w-28 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                {thumbnail ? <img src={URL.createObjectURL(thumbnail)} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={28} className="text-gray-300" />}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Upload your course Thumbnail here. <strong>Important guidelines:</strong> 1200x800 pixels or 12:8 Ratio. Supported format: <em>.jpg, .jpeg, or .png</em>
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload size={14} /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={e => setThumbnail(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>

          {/* Trailer */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Course Trailer</h3>
            <div className="flex gap-4 items-start">
              <div className="w-28 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                {trailer ? <video src={URL.createObjectURL(trailer)} className="w-full h-full object-cover" /> : <Play size={28} className="text-gray-300" />}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Students who watch a well-made promo video are 5X more likely to enroll in your course. We've seen that statistic go up to 10X for exceptionally awesome videos.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload size={14} /> Upload Video
                  <input type="file" accept="video/*" className="hidden" onChange={e => setTrailer(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Description with toolbar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Descriptions</label>
          <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter you course descriptions"
              rows={5}
              className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none"
            />
            {/* Formatting toolbar */}
            <div className="flex items-center gap-1 px-4 py-2 border-t border-gray-100 bg-gray-50">
              {[Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered].map((Icon, i) => (
                <button key={i} className="p-1.5 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* What you will teach */}
        <DynamicList
          label="What you will teach in this course"
          count={8}
          items={teaches}
          placeholder="What you will teach in this course..."
          onChange={(i, v) => setTeaches(prev => prev.map((item, idx) => idx === i ? v : item))}
          onAdd={() => teaches.length < 8 && setTeaches(prev => [...prev, ''])}
        />

        {/* Target Audience */}
        <DynamicList
          label="Target Audience"
          count={8}
          items={audience}
          placeholder="Who this course is for..."
          onChange={(i, v) => setAudience(prev => prev.map((item, idx) => idx === i ? v : item))}
          onAdd={() => audience.length < 8 && setAudience(prev => [...prev, ''])}
        />

        {/* Course requirements */}
        <DynamicList
          label="Course requirements"
          count={8}
          items={requirements}
          placeholder="What is you course requirements..."
          onChange={(i, v) => setRequirements(prev => prev.map((item, idx) => idx === i ? v : item))}
          onAdd={() => requirements.length < 8 && setRequirements(prev => [...prev, ''])}
        />
      </div>
    </div>
  );

  /* ── STEP 3: Curriculum ── */
  const Step3 = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">Course Curriculum</h2>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Save</button>
          <button className="px-5 py-2 text-primary text-sm font-semibold hover:underline">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section, si) => (
          <div key={section.id} className="border border-gray-100 rounded-xl overflow-hidden">
            {/* Section header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-gray-300 cursor-grab" />
                <span className="text-sm font-semibold text-gray-700">
                  Sections {String(si + 1).padStart(2, '0')}: &nbsp;
                  <span className="font-normal text-gray-500">{section.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => addLecture(section.id)} className="p-1.5 text-gray-400 hover:text-primary transition-colors"><Plus size={16} /></button>
                <button onClick={() => { setSectionNameEdit(section.name); openModal('editSection', { sectionId: section.id }); }}
                  className="p-1.5 text-gray-400 hover:text-primary transition-colors"><Pencil size={15} /></button>
                <button onClick={() => deleteSection(section.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>

            {/* Lectures */}
            {section.lectures.map(lecture => (
              <div key={lecture.id} className="flex items-center justify-between px-4 py-3 border-t border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                  <GripVertical size={15} className="text-gray-200 cursor-grab" />
                  <span className="text-sm text-gray-600">{lecture.name}</span>
                </div>
                <div className="flex items-center gap-2 relative">
                  {/* Contents dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setContentMenu(contentMenu?.lectureId === lecture.id ? null : { sectionId: section.id, lectureId: lecture.id })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-primary text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Contents <ChevronDown size={13} />
                    </button>
                    {contentMenu?.lectureId === lecture.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 w-40">
                        {[['video', 'Video'], ['attach', 'Attach File'], ['caption', 'Captions'], ['descModal', 'Description'], ['notes', 'Lecture Notes']].map(([type, label]) => (
                          <button key={type} onClick={() => openModal(type)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-primary transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => deleteLecture(section.id, lecture.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Add Sections */}
        <button
          onClick={addSection}
          className="w-full py-3.5 bg-blue-50 border-2 border-dashed border-blue-200 text-primary text-sm font-semibold rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add Sections
        </button>
      </div>

      {/* ── MODALS ── */}

      {/* Video Modal */}
      {modal === 'video' && (
        <Modal title="Lecture Video" onClose={closeModal}
          footer={
            <>
              <button onClick={closeModal} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
              <button className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${uploadedVideo ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-blue-100 text-blue-300 cursor-not-allowed'}`}>
                Upload Video
              </button>
            </>
          }
        >
          {uploadedVideo ? (
            <div className="flex gap-4 items-center">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="thumb" className="w-20 h-14 rounded-lg object-cover" />
              <div>
                <p className="text-green-500 text-xs font-bold mb-1">FILE UPLOADED • 1:55</p>
                <p className="text-sm text-gray-700 font-medium">{uploadedVideo.name}</p>
                <button onClick={() => setUploadedVideo(null)} className="text-primary text-xs font-medium hover:underline mt-1">Replace Video</button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-3 mb-3">
                <input type="text" placeholder="Upload Files" readOnly
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none" />
                <label className="px-5 py-3 bg-gray-700 text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-gray-800 whitespace-nowrap">
                  Upload File
                  <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={e => setUploadedVideo(e.target.files[0])} />
                </label>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <AlertCircle size={12} className="text-gray-400" />
                Note: All files should be at least 720p and less than 4.0 GB.
              </p>
            </>
          )}
        </Modal>
      )}

      {/* Lecture Notes Modal */}
      {modal === 'notes' && (
        <Modal title="Add Lecture Notes" onClose={closeModal}
          footer={
            <>
              <button onClick={closeModal} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-5 py-2 bg-blue-100 text-blue-300 text-sm font-semibold rounded-lg cursor-not-allowed">Add Description</button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Notes</label>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
                placeholder="Write your lecture Notes here..."
                rows={5}
                className="w-full px-4 py-3 border-b border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none"
              />
            </div>
            <DropZone label="Uploads Notes" hint="Drag an drop a file or browse file" onFile={() => {}} />
          </div>
        </Modal>
      )}

      {/* Attach File Modal */}
      {modal === 'attach' && (
        <Modal title="Attach File" onClose={closeModal}
          footer={
            <>
              <button onClick={closeModal} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-5 py-2 bg-blue-100 text-blue-300 text-sm font-semibold rounded-lg cursor-not-allowed">Attach File</button>
            </>
          }
        >
          <DropZone label="Attach File" hint="Drag an drop a file or browse file" onFile={setAttachFile} file={attachFile} />
        </Modal>
      )}

      {/* Caption Modal */}
      {modal === 'caption' && (
        <Modal title="Add Lecture Caption" onClose={closeModal}
          footer={
            <>
              <button onClick={closeModal} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-5 py-2 bg-blue-100 text-blue-300 text-sm font-semibold rounded-lg cursor-not-allowed">Add Caption</button>
            </>
          }
        >
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Caption</label>
            <textarea value={captionText} onChange={e => setCaptionText(e.target.value)}
              placeholder="Write your lecture caption here..."
              rows={6}
              className="w-full px-4 py-3 border-b border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none"
            />
          </div>
        </Modal>
      )}

      {/* Description Modal */}
      {modal === 'descModal' && (
        <Modal title="Add Lecture Description" onClose={closeModal}
          footer={
            <>
              <button onClick={closeModal} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-5 py-2 bg-blue-100 text-blue-300 text-sm font-semibold rounded-lg cursor-not-allowed">Add Description</button>
            </>
          }
        >
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Description</label>
            <textarea value={descText} onChange={e => setDescText(e.target.value)}
              placeholder="Write your lecture description here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none focus:border-primary"
            />
          </div>
        </Modal>
      )}

      {/* Edit Section Name Modal */}
      {modal === 'editSection' && (
        <Modal title="Edit Section Name" onClose={closeModal}
          footer={
            <>
              <button onClick={closeModal} className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
              <button
                onClick={() => {
                  setSections(prev => prev.map(s => s.id === modalData.sectionId ? { ...s, name: sectionNameEdit || s.name } : s));
                  closeModal();
                }}
                className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="bg-blue-50/50 rounded-xl p-4">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Section</label>
            <input
              type="text"
              value={sectionNameEdit}
              onChange={e => setSectionNameEdit(e.target.value)}
              placeholder="Write your section name here.."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </Modal>
      )}
    </div>
  );

  /* ── STEP 4: Publish Course ── */
  const Step4 = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">Publish Course</h2>
        <div className="flex gap-3">
          <button className="px-5 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Save</button>
          <button className="px-5 py-2 text-primary text-sm font-semibold hover:underline">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Message */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Message</h3>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Welcome Message</label>
              <textarea value={welcomeMsg} onChange={e => setWelcomeMsg(e.target.value)}
                placeholder="Enter course starting message here..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Congratulations Message</label>
              <textarea value={congratsMsg} onChange={e => setCongratsMsg(e.target.value)}
                placeholder="Enter your course completed message here..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Add Instructor */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Add Instructor ({String(instructors.length).padStart(2, '0')})</h3>
          <div className="relative mb-4 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by username"
              value={instructorSearch}
              onChange={e => setInstructorSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {instructors.map(ins => (
              <div key={ins.id} className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
                <img src={ins.avatar} alt={ins.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{ins.name}</p>
                  <p className="text-gray-400 text-xs">{ins.role}</p>
                </div>
                <button onClick={() => removeInstructor(ins.id)} className="ml-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />

      <div className="flex-1 lg:ml-56 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div>
            <p className="text-gray-400 text-xs">Good Morning</p>
            <p className="font-extrabold text-gray-900 text-base">Create New Course</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 w-64">
              <Search size={15} className="text-gray-400" />
              <input type="text" placeholder="Search" className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1" />
            </div>
            <button className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
            <StepHeader />

            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}

            {/* Bottom navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button onClick={goPrev} className="px-6 py-3 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  {step === 4 ? 'Prev Step' : 'Previous'}
                </button>
              ) : (
                <button onClick={() => router.push('/instructor/dashboard')} className="px-6 py-3 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              )}

              {step < 4 ? (
                <button onClick={goNext} className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all shadow-md text-sm">
                  Save & Next
                </button>
              ) : (
                <button
                  onClick={() => { alert('Course submitted for review! (demo)'); router.push('/instructor/dashboard'); }}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all shadow-md text-sm"
                >
                  Submit For Review
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => (
              <button key={l} className="hover:text-primary transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
