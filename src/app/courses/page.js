'use client';

import { useState } from 'react';
import Navbar from '@/landing_page/StudentNavbar';
import Footer from '@/landing_page/Footer';
import Link from 'next/link';
import {
  SlidersHorizontal, Search, ChevronDown, ChevronUp,
  Star, Users, ChevronLeft, ChevronRight, X
} from 'lucide-react';

/* ── Static data ───────────────────────────────────── */
const allCourses = [
  { id: 1,  tag: 'DESIGN', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',            rating: 4.6, students: '181,811', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 2,  tag: 'DESIGN', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',           rating: 4.5, students: '854',     image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 3,  tag: 'DESIGN', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',          rating: 4.2, students: '2,711',   image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80' },
  { id: 4,  tag: 'DESIGN', title: 'Learn Python Programming Masterclass',                                   rating: 4.0, students: '211,434', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 5,  tag: 'DESIGN', title: 'Data Structures & Algorithms Essentials (2021)',                         rating: 4.7, students: '451,444', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 6,  tag: 'DESIGN', title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click',           rating: 4.1, students: '154,817', image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
  { id: 7,  tag: 'DESIGN', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',            rating: 4.6, students: '181,811', image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&q=80' },
  { id: 8,  tag: 'DESIGN', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',           rating: 4.5, students: '854',     image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&q=80' },
  { id: 9,  tag: 'DESIGN', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',          rating: 4.2, students: '2,711',   image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&q=80' },
  { id: 10, tag: 'DESIGN', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',            rating: 4.6, students: '181,811', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 11, tag: 'DESIGN', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',           rating: 4.5, students: '854',     image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 12, tag: 'DESIGN', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',          rating: 4.2, students: '2,711',   image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
];

const categories = [
  { name: 'Development', count: null, children: [
    { name: 'Web development',    count: 574,  checked: false },
    { name: 'Data Science',       count: 648,  checked: false },
    { name: 'Mobile Development', count: 1345, checked: true  },
    { name: 'Software Testing',   count: 317,  checked: false },
    { name: 'No-Code Development',count: 37,   checked: false },
  ]},
  { name: 'IT & Software', count: null, children: [] },
  { name: 'Design',        count: null, children: [] },
  { name: 'Data Analysis', count: null, children: [] },
];

const tools = [
  { name: 'HTML 5',  count: 1345, checked: false },
  { name: 'CSS 3',   count: 12735,checked: false },
  { name: 'React',   count: 1345, checked: false },
  { name: 'Webflow', count: 1345, checked: true  },
  { name: 'Node.js', count: 1345, checked: false },
  { name: 'Wordpress',count: 1345,checked: false },
];

const levels      = ['All level', 'Beginner', 'Intermediate', 'Expert'];
const durations   = ['6-12 Months', '3-6 Months', '1-3 Months', '1-4 Weeks', '1-7 Days'];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-extrabold text-gray-700 uppercase tracking-wider mb-3"
      >
        {title}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && children}
    </div>
  );
}

function CheckItem({ label, count, checked: initChecked }) {
  const [checked, setChecked] = useState(initChecked || false);
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer group">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4 accent-primary rounded"
        />
        <span className={`text-sm transition-colors ${checked ? 'text-primary font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
          {label}
        </span>
      </div>
      {count !== undefined && <span className="text-xs text-gray-400">{count.toLocaleString()}</span>}
    </label>
  );
}

export default function CoursesSearchPage() {
  const [query,     setQuery]     = useState('UI/UX Design');
  const [sortBy,    setSortBy]    = useState('Trending');
  const [page,      setPage]      = useState(2);
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin,  setPriceMin]  = useState(0);
  const [priceMax,  setPriceMax]  = useState(200);
  const [catOpen,   setCatOpen]   = useState(true);
  const pages = [1, 2, 3, 4, 5];

  const suggestions = ['user interface', 'user experience', 'web design', 'interface', 'app'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Search bar */}
        <div className="border-b border-gray-100 bg-white sticky top-16 z-10 px-4 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filter
              <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </button>

            {/* Search input */}
            <div className="flex-1 min-w-48 flex items-center gap-2 border border-blue-300 rounded-xl px-4 py-2.5">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-sm text-gray-700 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary bg-white"
                >
                  <option>Trending</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Most Popular</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Suggestions + result count */}
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Suggestion:</span>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="text-primary text-xs font-medium hover:underline"
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500">3,684 results find for &quot;ui/ux design&quot;</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex gap-6">

            {/* ── FILTER SIDEBAR ── */}
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0`}>

              {/* Category */}
              <FilterSection title="Category">
                {categories.map((cat, ci) => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setCatOpen(!catOpen)}
                      className="flex items-center justify-between w-full py-1.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                          {ci === 0 && <div className="w-2 h-2 bg-primary rounded-sm" />}
                        </div>
                        {cat.name}
                      </div>
                      {ci === 0 && (catOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />)}
                    </button>
                    {ci === 0 && catOpen && cat.children.length > 0 && (
                      <div className="pl-4 mt-1 space-y-0.5">
                        {cat.children.map(child => (
                          <CheckItem key={child.name} label={child.name} count={child.count} checked={child.checked} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </FilterSection>

              {/* Tools */}
              <FilterSection title="Tools">
                <div className="space-y-0.5">
                  {tools.map(t => <CheckItem key={t.name} label={t.name} count={t.count} checked={t.checked} />)}
                </div>
              </FilterSection>

              {/* Course Level */}
              <FilterSection title="Course Level">
                <div className="space-y-0.5">
                  {levels.map(l => <CheckItem key={l} label={l} count={1345} />)}
                </div>
              </FilterSection>

              {/* Price */}
              <FilterSection title="Price">
                <div className="space-y-3">
                  <div className="relative h-4 flex items-center">
                    <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
                    <div
                      className="absolute h-1 bg-primary rounded-full"
                      style={{ left: `${(priceMin/500)*100}%`, right: `${100-(priceMax/500)*100}%` }}
                    />
                    <input type="range" min="0" max="500" value={priceMin}
                      onChange={e => setPriceMin(+e.target.value)}
                      className="absolute w-full appearance-none bg-transparent accent-primary" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 block mb-1">$ min:</label>
                      <input type="number" value={priceMin} onChange={e => setPriceMin(+e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-primary" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 block mb-1">$ max:</label>
                      <input type="number" value={priceMax} onChange={e => setPriceMax(+e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <CheckItem label="Paid" count={1345} />
                    <CheckItem label="Free" count={1345} />
                  </div>
                </div>
              </FilterSection>

              {/* Duration */}
              <FilterSection title="Duration">
                <div className="space-y-0.5">
                  {durations.map((d, i) => <CheckItem key={d} label={d} count={1345} checked={i === 2} />)}
                </div>
              </FilterSection>
            </aside>

            {/* ── COURSE GRID ── */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {allCourses.map(c => (
                  <Link key={c.id} href={`/courses/${c.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-36 overflow-hidden bg-gray-100">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <span className="text-primary text-xs font-bold">{c.tag}</span>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mt-0.5 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-700">{c.rating}</span>
                        <Users size={11} className="ml-1" />
                        <span>{c.students} students</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                  <ChevronLeft size={16} />
                </button>
                {pages.map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-colors ${
                      p === page
                        ? 'bg-primary text-white shadow-md'
                        : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {String(p).padStart(2,'0')}
                  </button>
                ))}
                <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
