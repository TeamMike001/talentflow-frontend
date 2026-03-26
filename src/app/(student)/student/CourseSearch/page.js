'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, SlidersHorizontal, Star, Users, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from 'lucide-react';

// ── Public Navbar (matches Image 1) ────────────────────────────────────────
function PublicNavbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">TF</span>
            </div>
            <span className="font-extrabold text-gray-900 text-sm">
              Talent<span className="text-primary">Flow</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors font-medium">Home</Link>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors font-medium">
              Courses <ChevronDown size={14} />
            </button>
            <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors font-medium">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-bold text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm font-bold text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary-dark transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

// ── Public Footer ──────────────────────────────────────────────────────────
function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">TF</span>
            </div>
            <span className="font-extrabold text-sm">Talent<span className="text-primary">Flow</span></span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">Top learning experiences that create more talent in the world.</p>
        </div>
        {[
          { title: 'Product', links: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing'] },
          { title: 'Company', links: ['About us', 'Features', 'News'] },
          { title: 'Social', links: ['Twitter', 'LinkedIn', 'GitHub', 'Clickup'] },
          { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Contact'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 text-xs hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-gray-500 text-xs">© 2026 Team Mike – UI/UX. All rights reserved.</p>
        <div className="flex gap-4">
          {['𝕏', 'in', 'f'].map((s) => (
            <Link key={s} href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{s}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const courses = [
  { id: 1, title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science', category: 'DESIGN', rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&q=80' },
  { id: 2, title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...', category: 'DESIGN', rating: 4.5, students: 854, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 3, title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates', category: 'DESIGN', rating: 4.2, students: 2711, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80' },
  { id: 4, title: 'Learn Python Programming Masterclass', category: 'DESIGN', rating: 4.0, students: 211434, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80' },
  { id: 5, title: 'Data Structures & Algorithms Essentials (2021)', category: 'DESIGN', rating: 4.7, students: 451444, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 6, title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click', category: 'DESIGN', rating: 4.1, students: 154817, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 7, title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science', category: 'DESIGN', rating: 4.6, students: 181811, image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&q=80' },
  { id: 8, title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...', category: 'DESIGN', rating: 4.5, students: 854, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 9, title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates', category: 'DESIGN', rating: 4.2, students: 2711, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80' },
];

const suggestions = ['user interface', 'user experience', 'web design', 'interface', 'app'];
const sortOptions = ['Trending', 'Newest', 'Highest Rated', 'Most Popular'];

function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group block">
      <div className="h-44 overflow-hidden bg-gray-100">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{course.category}</span>
        <h3 className="font-bold text-gray-900 text-sm mt-1 mb-3 leading-snug line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-700">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={11} />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const PAGES = 5;

export default function CourseSearch() {
  const [query, setQuery] = useState('UI/UX Design');
  const [sort, setSort] = useState('Trending');
  const [currentPage, setCurrentPage] = useState(2);

  // Category filters
  const [devOpen, setDevOpen] = useState(true);
  const [mobileDevChecked, setMobileDevChecked] = useState(true);
  const [webflowChecked, setWebflowChecked] = useState(true);
  const [monthsChecked, setMonthsChecked] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">

        {/* ── Search Bar Row ── */}
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all">
            <SlidersHorizontal size={15} />
            Filter
            <span className="bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-md">3</span>
          </button>
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Sort by:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-primary"
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Suggestions row */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs text-gray-400">Suggestion:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="text-xs text-primary hover:underline font-medium"
            >
              {s}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">3,684 results find for &quot;ui/ux design&quot;</span>
        </div>

        <div className="flex gap-8 items-start">

          {/* ── Filter Sidebar ── */}
          <aside className="w-52 flex-shrink-0 space-y-6">

            {/* Category */}
            <div>
              <button className="flex items-center justify-between w-full mb-3" onClick={() => setDevOpen(!devOpen)}>
                <span className="font-bold text-gray-800 text-sm uppercase tracking-wide">Category</span>
                {devOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </button>
              {devOpen && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-primary w-3.5 h-3.5" />
                      <span className="text-sm text-gray-700 font-semibold">Development</span>
                    </label>
                    <ChevronUp size={13} className="text-gray-400" />
                  </div>
                  <div className="pl-5 space-y-1.5">
                    {[['Web development', 574], ['Data Science', 568]].map(([name, count]) => (
                      <label key={name} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="accent-primary w-3 h-3" />
                          <span className="text-xs text-gray-600">{name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{count}</span>
                      </label>
                    ))}
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={mobileDevChecked} onChange={(e) => setMobileDevChecked(e.target.checked)} className="accent-primary w-3 h-3" />
                        <span className="text-xs text-primary font-semibold">Mobile Development</span>
                      </div>
                      <span className="text-xs text-gray-400">1345</span>
                    </label>
                    {[['Software Testing', 317], ['No-Code Development', 37]].map(([name, count]) => (
                      <label key={name} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="accent-primary w-3 h-3" />
                          <span className="text-xs text-gray-600">{name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{count}</span>
                      </label>
                    ))}
                  </div>
                  {[['IT & Software'], ['Design'], ['Data Analysis']].map(([name]) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-sm text-gray-700">{name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Tools */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Tools</p>
              <div className="space-y-1.5">
                {[['HTML 5', 1345], ['CSS 3', 12736], ['React', 1345]].map(([name, count]) => (
                  <label key={name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600">{name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{count.toLocaleString()}</span>
                  </label>
                ))}
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={webflowChecked} onChange={(e) => setWebflowChecked(e.target.checked)} className="accent-primary w-3.5 h-3.5" />
                    <span className="text-xs text-primary font-semibold">Webflow</span>
                  </div>
                  <span className="text-xs text-gray-400">1345</span>
                </label>
                {[['Node.js', 1345], ['Wordpress', 1345]].map(([name, count]) => (
                  <label key={name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600">{name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Course Level */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Course Level</p>
              <div className="space-y-1.5">
                {[['All Level', 1345], ['Beginner', 1345], ['Intermediate', 1345], ['Expert', 1345]].map(([name, count]) => (
                  <label key={name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600">{name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Price</p>
              <input type="range" min={0} max={500} defaultValue={200} className="w-full accent-primary mb-2" />
              <div className="flex gap-2">
                <input placeholder="$ min" className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary" />
                <input placeholder="$ min" className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5 mt-2">
                {[['Paid', 1345], ['Free', 1345]].map(([name, count]) => (
                  <label key={name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600">{name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <p className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Duration</p>
              <div className="space-y-1.5">
                {[['6-12 Months', 1345], ['3-6 Months', 1345]].map(([name, count]) => (
                  <label key={name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600">{name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                ))}
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={monthsChecked} onChange={(e) => setMonthsChecked(e.target.checked)} className="accent-primary w-3.5 h-3.5" />
                    <span className="text-xs text-primary font-semibold">1-3 Months</span>
                  </div>
                  <span className="text-xs text-gray-400">1345</span>
                </label>
                {[['1-4 Weeks', 1345], ['1-7 Days', 1345]].map(([name, count]) => (
                  <label key={name} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                      <span className="text-xs text-gray-600">{name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* ── Results Grid ── */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-5">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: PAGES }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentPage === p
                      ? 'bg-primary text-white'
                      : p === 4
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                  }`}
                >
                  {String(p).padStart(2, '0')}
                </button>
              ))}
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <PublicFooter />
    </div>
  );
}