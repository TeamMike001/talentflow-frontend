# TalentFlow – Next.js Frontend

A pixel-perfect implementation of the TalentFlow e-learning platform based on the Figma design.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
talentflow/
├── app/                        # Next.js App Router pages
│   ├── layout.js               # Root layout (fonts, metadata)
│   ├── globals.css             # Global styles + Tailwind
│   ├── page.js                 # Home page (/)
│   ├── about/
│   │   └── page.js             # About page (/about)
│   ├── contact/
│   │   └── page.js             # Contact page (/contact)
│   ├── courses/
│   │   ├── page.js             # All courses listing (/courses)
│   │   └── [id]/
│   │       └── page.js         # Single course detail (/courses/[id])
│   ├── signin/
│   │   └── page.js             # Sign In page (/signin)
│   └── signup/
│       └── page.js             # Sign Up page (/signup)
│
├── components/                 # Reusable UI components
│   ├── Navbar.jsx              # Top navigation + mega dropdown
│   ├── Hero.jsx                # Hero section with image collage
│   ├── Stats.jsx               # Blue stats bar (50+ tutors, etc.)
│   ├── Features.jsx            # Feature cards (interactive)
│   ├── PopularCourses.jsx      # Course cards with pagination
│   ├── Tutors.jsx              # Tutor grid section
│   ├── Testimonials.jsx        # Student testimonials carousel
│   ├── Blog.jsx                # Recent blog posts
│   ├── CTA.jsx                 # Blue CTA banner
│   └── Footer.jsx              # Footer with links + newsletter
│
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind + custom colors
├── next.config.mjs             # Next.js config
└── package.json
```

---

## 🎨 Design System

### Colors
| Name           | Hex       | Usage                              |
|----------------|-----------|------------------------------------|
| `primary`      | `#2563EB` | Buttons, links, accents            |
| `primary-dark` | `#1D4ED8` | Button hover states                |
| `primary-darker`| `#1E3A8A`| Dark sections (feature card, hero) |
| `orange`       | `#F59E0B` | Brand accent ("Flow" in logo, highlights) |
| Gray scale     | Tailwind  | Body text, borders, backgrounds    |

### Typography
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Spacing & Border Radius
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Sections: `py-20` (80px vertical padding)

---

## 📄 Pages Overview

### `/` – Home Page
Assembles all homepage sections in order:
1. **Navbar** – sticky header with mega dropdown
2. **Hero** – headline + CTA buttons + image collage
3. **Stats** – blue bar with 50+ tutors / 20+ courses / 500+ students
4. **Features** – interactive feature cards (click to activate)
5. **Popular Courses** – paginated course cards
6. **Tutors** – instructor grid
7. **Testimonials** – carousel with prev/next controls
8. **Blog** – recent blog posts (paginated)
9. **CTA** – full-width blue call to action
10. **Footer** – links, newsletter, social icons

### `/courses` – All Courses
- Filter tabs (All, Design, Development, Data)
- Grid of 9 course cards
- Each card: image, category, title, description, rating, instructor, price

### `/courses/[id]` – Course Detail
- Hero banner with course info + enrollment card
- "What You'll Learn" checklist
- Curriculum accordion
- Instructor sidebar card

### `/about` – About Page
- Brand hero section
- Stats bar
- Our Story section
- Core Values grid
- Full team grid

### `/contact` – Contact Page
- Contact info cards (email, phone, location, hours)
- Contact form (with success message)
- Map placeholder + quick support panel

### `/signin` – Sign In
- Split layout: blue branding panel + form
- Email/password with show/hide toggle
- Google & Facebook social login buttons
- Forgot password link

### `/signup` – Sign Up
- Split layout: dark blue panel with benefits list + form
- Full name, email, password fields
- Terms agreement checkbox
- Social login buttons

---

## 🔧 How to Customize

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#2563EB',       // Change to your brand blue
  'primary-dark': '#1D4ED8',
  orange: '#F59E0B',        // Change accent color
}
```

### Update Course Data
Each page has a local `courses` or `allCourses` array at the top of the file. Replace with API calls when backend is ready.

### Add a New Page
1. Create `app/your-page/page.js`
2. Import `Navbar` and `Footer`
3. Build your content between them

### Connect to a Backend
Replace the static data arrays with `fetch()` calls inside Server Components (pages are Server Components by default in Next.js App Router). For client-side fetching, use `'use client'` + `useEffect`.

---

## 📦 Dependencies

| Package       | Version  | Purpose                  |
|---------------|----------|--------------------------|
| `next`        | 14.2.3   | React framework           |
| `react`       | ^18      | UI library                |
| `lucide-react`| ^0.383.0 | Icon library              |
| `tailwindcss` | ^3.4.1   | Utility CSS framework     |
| `autoprefixer`| ^10      | CSS vendor prefixes       |
| `postcss`     | ^8       | CSS processing            |

---

## ✅ Features Implemented

- [x] Responsive design (mobile, tablet, desktop)
- [x] Sticky navbar with mega dropdown
- [x] Mobile hamburger menu
- [x] Interactive feature card tabs
- [x] Course card pagination
- [x] Testimonials carousel
- [x] Blog pagination
- [x] Working contact form with validation
- [x] Sign in / Sign up with show/hide password
- [x] Course detail page with curriculum
- [x] Footer newsletter subscription
- [x] Consistent color system and typography
- [x] All sections matching the Figma design

---

## 🔜 Next Steps (when you send more pages)

When you send more Figma screenshots, here's what can be added:
- Dashboard / Student portal
- Course player / video page
- User profile page
- Checkout / payment page
- Blog post detail page
- Admin panel

---

*Built with ❤️ for TalentFlow – © 2026 Team Mike – UI/UX*
