'use client';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
// import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  X, Plus, Pencil, Trash2, GripVertical,
  ChevronDown, Upload, Image as ImageIcon, Play,
  Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered,
  Check, Search, Menu, BookOpen, BarChart2, Settings, Bell, LogOut, Home,
} from 'lucide-react';


// ── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Basic Information', icon: '☰' },
  { id: 2, label: 'Advance Information', icon: '📋' },
  { id: 3, label: 'Curriculum', icon: '📹' },
  { id: 4, label: 'Publish Course', icon: '▶' },
];

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
        {footer && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Drop Zone ─────────────────────────────────────────────────────────────────
function DropZone({ label, accept, onFile, file }) {
  const ref = useRef();
  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); onFile?.(e.dataTransfer.files[0]); }}
      className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
    >
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={e => onFile?.(e.target.files[0])} />
      {file ? (
        <p className="text-sm text-blue-600 font-medium break-all">{file.name}</p>
      ) : (
        <>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-1">Drag & drop or <span className="text-blue-600 font-medium">browse</span></p>
        </>
      )}
    </div>
  );
}

// ── Dynamic List ──────────────────────────────────────────────────────────────
function DynamicList({ label, count, items, onChange, onAdd, placeholder }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">{label} ({items.length}/{count})</h3>
        {items.length < count && (
          <button onClick={onAdd} className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline">
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
                type="text" value={item} placeholder={placeholder} maxLength={120}
                onChange={e => onChange(i, e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">{item.length}/120</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Save Buttons ──────────────────────────────────────────────────────────────
function StepActions() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button className="px-4 sm:px-5 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Save</button>
      <button className="px-4 sm:px-5 py-2 text-blue-600 text-sm font-semibold hover:underline">Save & Preview</button>
    </div>
  );
}

// ── Select field ──────────────────────────────────────────────────────────────
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <select value={value} onChange={onChange}
          className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-blue-400 text-gray-500 bg-white">
          <option value="">Select...</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CreateCoursePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1
  const [basic, setBasic] = useState({ title: '', subtitle: '', category: '', subcategory: '', topic: '', language: '', level: '', duration: '' });

  // Step 2
  const [thumbnail, setThumbnail] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [description, setDescription] = useState('');
  const [teaches, setTeaches] = useState(['', '', '', '']);
  const [audience, setAudience] = useState(['', '', '', '']);
  const [requirements, setRequirements] = useState(['', '', '', '']);

  // Step 3
  const [sections, setSections] = useState([
    { id: 1, name: 'Section name', lectures: [{ id: 1, name: 'Lecture name' }, { id: 2, name: 'Lecture name' }] }
  ]);
  const [contentMenu, setContentMenu] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalData, setModalData] = useState({});
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [descText, setDescText] = useState('');
  const [attachFile, setAttachFile] = useState(null);
  const [sectionNameEdit, setSectionNameEdit] = useState('');

  // Step 4
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [congratsMsg, setCongratsMsg] = useState('');
  const [instructorSearch, setInstructorSearch] = useState('');
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Username', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Username', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
  ]);

  const goNext = () => setStep(s => Math.min(s + 1, 4));
  const goPrev = () => setStep(s => Math.max(s - 1, 1));

  const addSection = () => setSections(prev => [...prev, { id: Date.now(), name: 'Section name', lectures: [{ id: Date.now() + 1, name: 'Lecture name' }] }]);
  const addLecture = id => setSections(prev => prev.map(s => s.id === id ? { ...s, lectures: [...s.lectures, { id: Date.now(), name: 'Lecture name' }] } : s));
  const deleteSection = id => setSections(prev => prev.filter(s => s.id !== id));
  const deleteLecture = (sId, lId) => setSections(prev => prev.map(s => s.id === sId ? { ...s, lectures: s.lectures.filter(l => l.id !== lId) } : s));
  const removeInstructor = id => setInstructors(prev => prev.filter(i => i.id !== id));

  const openModal = (type, data = {}) => { setModal(type); setModalData(data); setContentMenu(null); };
  const closeModal = () => { setModal(null); setUploadedVideo(null); };

  // ── Step Header ─────────────────────────────────────────────────────────────
  const StepHeader = () => (
    <div className="mb-6 sm:mb-8">
      {/* Mobile: compact step indicator */}
      <div className="flex sm:hidden items-center justify-between mb-4">
        <span className="text-xs text-gray-400">Step {step} of {STEPS.length}</span>
        <span className="text-sm font-bold text-blue-600">{STEPS[step - 1].label}</span>
      </div>
      {/* Mobile progress bar */}
      <div className="sm:hidden h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${(step / STEPS.length) * 100}%` }} />
      </div>

      {/* Desktop: full step tabs — scrollable if needed */}
      <div className="hidden sm:flex items-center gap-0 overflow-x-auto pb-1">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-shrink-0">
              <button
                onClick={() => done && setStep(s.id)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  active ? 'border-blue-600 text-blue-600' : done ? 'border-green-400 text-green-600 cursor-pointer' : 'border-transparent text-gray-400'
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden md:inline">{s.label}</span>
                <span className="md:hidden">{s.id}</span>
                {done && <Check size={13} className="text-green-500" />}
                {active && <span className="text-gray-400 font-normal ml-1 hidden lg:inline">7/12</span>}
              </button>
              {i < STEPS.length - 1 && <div className="w-6 md:w-8 h-px bg-gray-200 flex-shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Step 1 ──────────────────────────────────────────────────────────────────
  const Step1 = () => (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Basic Information</h2>
        <StepActions />
      </div>
      <div className="space-y-4 sm:space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <div className="relative">
            <input type="text" placeholder="Your course title" maxLength={80} value={basic.title}
              onChange={e => setBasic(b => ({ ...b, title: e.target.value }))}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">{basic.title.length}/80</span>
          </div>
        </div>
        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
          <div className="relative">
            <input type="text" placeholder="Your course subtitle" maxLength={120} value={basic.subtitle}
              onChange={e => setBasic(b => ({ ...b, subtitle: e.target.value }))}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs">{basic.subtitle.length}/120</span>
          </div>
        </div>
        {/* Category + Sub-category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <SelectField label="Course Category" value={basic.category} onChange={e => setBasic(b => ({ ...b, category: e.target.value }))}
            options={['UI/UX Design', 'Frontend Development', 'Backend Development', 'Data & Analysis']} />
          <SelectField label="Course Sub-category" value={basic.subcategory} onChange={e => setBasic(b => ({ ...b, subcategory: e.target.value }))}
            options={['Figma', 'Adobe XD', 'React']} />
        </div>
        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Topic</label>
          <input type="text" placeholder="What is primarily taught in your course?" value={basic.topic}
            onChange={e => setBasic(b => ({ ...b, topic: e.target.value }))}
            className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>
        {/* Language + Level + Duration — stack on mobile, row on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <SelectField label="Course Language" value={basic.language} onChange={e => setBasic(b => ({ ...b, language: e.target.value }))}
            options={['English', 'Mandarin', 'French', 'Spanish']} />
          <SelectField label="Course level" value={basic.level} onChange={e => setBasic(b => ({ ...b, level: e.target.value }))}
            options={['Beginner', 'Intermediate', 'Advanced']} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-400">
              <input type="text" placeholder="Course duration" value={basic.duration}
                onChange={e => setBasic(b => ({ ...b, duration: e.target.value }))}
                className="flex-1 px-3 py-2.5 sm:py-3 text-sm focus:outline-none min-w-0" />
              <div className="flex items-center gap-1 px-3 border-l border-gray-200 text-sm text-gray-500 bg-gray-50 cursor-pointer select-none whitespace-nowrap">
                Day <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Step 2 ──────────────────────────────────────────────────────────────────
  const Step2 = () => (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Advance Information</h2>
        <StepActions />
      </div>
      <div className="space-y-6 sm:space-y-7">
        {/* Thumbnail + Trailer — stack on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Thumbnail */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Course Thumbnail</h3>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-24 h-16 sm:w-28 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                {thumbnail ? <img src={URL.createObjectURL(thumbnail)} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-gray-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 leading-relaxed mb-3">Upload your course Thumbnail. <strong>Guidelines:</strong> 1200x800px, .jpg, .jpeg, .png</p>
                <label className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-blue-600 text-blue-600 text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload size={13} /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={e => setThumbnail(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
          {/* Trailer */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Course Trailer</h3>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-24 h-16 sm:w-28 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                {trailer ? <video src={URL.createObjectURL(trailer)} className="w-full h-full object-cover" /> : <Play size={24} className="text-gray-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 leading-relaxed mb-3">A well-made promo video increases enrollment. Upload a high-quality trailer.</p>
                <label className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-blue-600 text-blue-600 text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload size={13} /> Upload Video
                  <input type="file" accept="video/*" className="hidden" onChange={e => setTrailer(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
          <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-400">
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Enter your course description" rows={5}
              className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none"
            />
            {/* Toolbar — scrollable on very small screens */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-t border-gray-100 bg-gray-50 overflow-x-auto">
              {[Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered].map((Icon, i) => (
                <button key={i} className="p-1.5 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors flex-shrink-0">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <DynamicList label="What you will teach" count={8} items={teaches} placeholder="What you will teach..."
          onChange={(i, v) => setTeaches(prev => prev.map((item, idx) => idx === i ? v : item))}
          onAdd={() => teaches.length < 8 && setTeaches(prev => [...prev, ''])} />
        <DynamicList label="Target Audience" count={8} items={audience} placeholder="Who this course is for..."
          onChange={(i, v) => setAudience(prev => prev.map((item, idx) => idx === i ? v : item))}
          onAdd={() => audience.length < 8 && setAudience(prev => [...prev, ''])} />
        <DynamicList label="Course requirements" count={8} items={requirements} placeholder="Requirements..."
          onChange={(i, v) => setRequirements(prev => prev.map((item, idx) => idx === i ? v : item))}
          onAdd={() => requirements.length < 8 && setRequirements(prev => [...prev, ''])} />
      </div>
    </div>
  );

  // ── Step 3 ──────────────────────────────────────────────────────────────────
  const Step3 = () => (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Course Curriculum</h2>
        <StepActions />
      </div>
      <div className="space-y-3">
        {sections.map((section, si) => (
          <div key={section.id} className="border border-gray-100 rounded-xl overflow-hidden">
            {/* Section header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-gray-50 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <GripVertical size={15} className="text-gray-300 cursor-grab flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700 truncate">
                  Section {String(si + 1).padStart(2, '0')}: <span className="font-normal text-gray-500">{section.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => addLecture(section.id)} className="p-1.5 text-gray-400 hover:text-blue-600"><Plus size={15} /></button>
                <button onClick={() => { setSectionNameEdit(section.name); openModal('editSection', { sectionId: section.id }); }} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
                <button onClick={() => deleteSection(section.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            {/* Lectures */}
            {section.lectures.map(lecture => (
              <div key={lecture.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-3 border-t border-gray-50 bg-white gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <GripVertical size={14} className="text-gray-200 cursor-grab flex-shrink-0" />
                  <span className="text-sm text-gray-600 truncate">{lecture.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setContentMenu(contentMenu?.lectureId === lecture.id ? null : { sectionId: section.id, lectureId: lecture.id })}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100"
                    >
                      Contents <ChevronDown size={12} />
                    </button>
                    {contentMenu?.lectureId === lecture.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 w-40">
                        {[['video', 'Video'], ['attach', 'Attach File'], ['caption', 'Captions'], ['descModal', 'Description'], ['notes', 'Lecture Notes']].map(([type, label]) => (
                          <button key={type} onClick={() => openModal(type)} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">{label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil size={14} /></button>
                  <button onClick={() => deleteLecture(section.id, lecture.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <button onClick={addSection} className="w-full py-3.5 bg-blue-50 border-2 border-dashed border-blue-200 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2">
          <Plus size={16} /> Add Section
        </button>
      </div>

      {/* Modals */}
      {modal === 'video' && (
        <Modal title="Lecture Video" onClose={closeModal}
          footer={<><button onClick={closeModal} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm">Cancel</button><button className={`px-4 py-2 rounded-lg text-sm ${uploadedVideo ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-300 cursor-not-allowed'}`}>Upload Video</button></>}>
          {uploadedVideo ? <p className="text-sm text-blue-600">Video uploaded: {uploadedVideo.name}</p> : (
            <><div className="flex gap-2"><input placeholder="Upload Files" className="flex-1 px-4 py-2.5 border rounded-lg text-sm min-w-0" /><label className="px-4 py-2.5 bg-gray-700 text-white rounded-lg cursor-pointer text-sm whitespace-nowrap">Upload File<input type="file" accept="video/*" className="hidden" onChange={e => setUploadedVideo(e.target.files[0])} /></label></div><p className="text-xs text-gray-500 mt-2">Note: All files should be at least 720p and less than 4.0 GB.</p></>
          )}
        </Modal>
      )}
      {modal === 'notes' && (
        <Modal title="Add Lecture Notes" onClose={closeModal}
          footer={<><button onClick={closeModal} className="px-4 py-2 border rounded-lg text-sm">Cancel</button><button className="bg-blue-100 text-blue-300 rounded-lg px-4 py-2 cursor-not-allowed text-sm">Add Notes</button></>}>
          <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Write your lecture Notes here..." rows={4} className="w-full px-4 py-3 border-b focus:outline-none text-sm mb-4" />
          <DropZone label="Upload Notes" onFile={() => {}} />
        </Modal>
      )}
      {modal === 'attach' && (
        <Modal title="Attach File" onClose={closeModal}
          footer={<><button onClick={closeModal} className="px-4 py-2 border rounded-lg text-sm">Cancel</button><button className="bg-blue-100 text-blue-300 rounded-lg px-4 py-2 cursor-not-allowed text-sm">Attach File</button></>}>
          <DropZone label="Attach File" onFile={setAttachFile} file={attachFile} />
        </Modal>
      )}
      {modal === 'caption' && (
        <Modal title="Add Lecture Caption" onClose={closeModal}
          footer={<><button onClick={closeModal} className="px-4 py-2 border rounded-lg text-sm">Cancel</button><button className="bg-blue-100 text-blue-300 rounded-lg px-4 py-2 cursor-not-allowed text-sm">Add Caption</button></>}>
          <textarea value={captionText} onChange={e => setCaptionText(e.target.value)} placeholder="Write your lecture caption here..." rows={6} className="w-full px-4 py-3 border-b focus:outline-none text-sm" />
        </Modal>
      )}
      {modal === 'descModal' && (
        <Modal title="Add Lecture Description" onClose={closeModal}
          footer={<><button onClick={closeModal} className="px-4 py-2 border rounded-lg text-sm">Cancel</button><button className="bg-blue-100 text-blue-300 rounded-lg px-4 py-2 cursor-not-allowed text-sm">Add Description</button></>}>
          <textarea value={descText} onChange={e => setDescText(e.target.value)} placeholder="Write your lecture description here..." rows={6} className="w-full px-4 py-3 border rounded-xl focus:border-blue-400 text-sm" />
        </Modal>
      )}
      {modal === 'editSection' && (
        <Modal title="Edit Section Name" onClose={closeModal}
          footer={<><button onClick={closeModal} className="px-4 py-2 border rounded-lg text-sm">Cancel</button><button onClick={() => { setSections(prev => prev.map(s => s.id === modalData.sectionId ? { ...s, name: sectionNameEdit || s.name } : s)); closeModal(); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Changes</button></>}>
          <input type="text" value={sectionNameEdit} onChange={e => setSectionNameEdit(e.target.value)} placeholder="Section name" className="w-full px-4 py-3 border rounded-lg text-sm focus:border-blue-400 focus:outline-none" />
        </Modal>
      )}
    </div>
  );

  // ── Step 4 ──────────────────────────────────────────────────────────────────
  const Step4 = () => (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Publish Course</h2>
        <StepActions />
      </div>
      <div className="space-y-7 sm:space-y-8">
        {/* Messages — stack on mobile, side-by-side on md+ */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Message</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Welcome Message</label>
              <textarea value={welcomeMsg} onChange={e => setWelcomeMsg(e.target.value)}
                placeholder="Enter course starting message here..." rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-blue-400 resize-none focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Congratulations Message</label>
              <textarea value={congratsMsg} onChange={e => setCongratsMsg(e.target.value)}
                placeholder="Enter course completed message here..." rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-blue-400 resize-none focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Instructors */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Add Instructor ({instructors.length})</h3>
          <div className="relative mb-4 max-w-full sm:max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by username" value={instructorSearch}
              onChange={e => setInstructorSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm focus:border-blue-400 focus:outline-none" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {instructors.map(ins => (
              <div key={ins.id} className="flex items-center gap-2 sm:gap-3 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                <img src={ins.avatar} alt={ins.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{ins.name}</p>
                  <p className="text-gray-400 text-xs">{ins.role}</p>
                </div>
                <button onClick={() => removeInstructor(ins.id)} className="ml-1 text-gray-400 hover:text-red-500"><X size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── Root render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300
          ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-0'}
        `}
      >
        {/* <InstructorNavbar title="Create New Course" onMenuClick={() => setSidebarOpen(true)} /> */}

        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <StepHeader />
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}

            {/* Bottom nav */}
            <div className="flex items-center justify-between mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button onClick={goPrev} className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">
                  {step === 4 ? 'Prev Step' : 'Previous'}
                </button>
              ) : (
                <button className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              )}
              {step < 4 ? (
                <button onClick={goNext} className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md text-sm">
                  Save & Next
                </button>
              ) : (
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md text-sm">
                  Submit For Review
                </button>
              )}
            </div>
          </div>
        </main>

        <InstructorFooter />
      </div>
    </div>
  );
}