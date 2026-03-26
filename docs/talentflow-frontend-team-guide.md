# TalentFlow Learning Platform Frontend Team Guide

## Purpose of this Document

This document is written for the frontend developers working on the TalentFlow Learning Platform. It reflects the current frontend direction after the architecture update from React with Vite to Next.js with the App Router.

The purpose of this guide is to keep the frontend team aligned on:

- project structure
- team collaboration rules
- Next.js App Router usage
- reusable component design
- feature ownership
- GitHub workflow
- migration of the original React code into the new Next.js structure

This guide focuses only on what the frontend team needs to build and maintain the LMS cleanly as a shared production codebase.

## Current Frontend Direction

The frontend stack has been updated.

The original project started as a React.js project with a custom structure. That work is not being thrown away. Instead, the project is now being adapted into a more scalable Next.js codebase so the team can benefit from:

- file-based routing
- server components by default
- better layout handling
- cleaner page organization
- easier long-term scalability for a production LMS

The preferred architecture is now Next.js with the App Router.

## LMS Areas the Frontend Must Support

The frontend architecture must support the core TalentFlow LMS experience:

- Landing page
- Sign in
- Sign up
- Student dashboard
- Instructor dashboard
- Course discovery pages
- Course details pages
- Video learning pages
- Progress tracking
- Assignment experiences
- Notifications
- Discussion and collaboration areas
- User profile
- Admin interface

This means the architecture should support multiple user roles and multiple product areas without becoming hard to maintain.

## Recommended Frontend Stack

The current stack should be:

- Next.js with App Router
- React
- Axios for API communication
- CSS Modules for scoped component styling
- shared `src/features` modules for business logic
- reusable `src/components` folders for UI and layout

Why this stack is recommended:

- Next.js organizes routing more naturally than manual React Router setup.
- App Router makes nested layouts and route-level organization easier.
- Server components reduce unnecessary client-side JavaScript.
- CSS Modules remain beginner-friendly for developers with HTML and CSS experience.
- Shared service and feature layers keep the code easier for multiple developers to work on.

## Project Setup in VS Code

Create or run the project with:

```bash
npm install
npm run dev
```

If a new Next.js project needs to be created from scratch in the future, the recommended command is:

```bash
npx create-next-app@latest talentflow-learning-platform
```

## Recommended Next.js Folder Structure

```text
talentflow-learning-platform/
+-- public/
¦   +-- favicon.ico
¦   +-- images/
+-- src/
¦   +-- app/
¦   ¦   +-- layout.js
¦   ¦   +-- page.js
¦   ¦   +-- globals.css
¦   ¦   +-- (auth)/
¦   ¦   ¦   +-- login/
¦   ¦   ¦   ¦   +-- page.js
¦   ¦   ¦   +-- signup/
¦   ¦   ¦       +-- page.js
¦   ¦   +-- (student)/
¦   ¦   ¦   +-- student/
¦   ¦   ¦       +-- dashboard/
¦   ¦   ¦           +-- page.js
¦   ¦   +-- (instructor)/
¦   ¦   ¦   +-- instructor/
¦   ¦   ¦       +-- dashboard/
¦   ¦   ¦           +-- page.js
¦   ¦   +-- (admin)/
¦   ¦   ¦   +-- admin/
¦   ¦   ¦       +-- page.js
¦   ¦   +-- courses/
¦   ¦   ¦   +-- page.js
¦   ¦   ¦   +-- [courseId]/
¦   ¦   ¦       +-- page.js
¦   ¦   +-- learn/
¦   ¦       +-- [courseId]/
¦   ¦           +-- [lessonId]/
¦   ¦               +-- page.js
¦   +-- assets/
¦   ¦   +-- images/
¦   ¦   +-- icons/
¦   ¦   +-- illustrations/
¦   +-- components/
¦   ¦   +-- ui/
¦   ¦   +-- layout/
¦   ¦   +-- course/
¦   ¦   +-- dashboard/
¦   +-- features/
¦   ¦   +-- auth/
¦   ¦   +-- courses/
¦   ¦   +-- dashboard/
¦   ¦   +-- progress/
¦   ¦   +-- video-learning/
¦   ¦   +-- admin/
¦   +-- hooks/
¦   +-- services/
¦   ¦   +-- api.js
¦   +-- utils/
¦   +-- styles/
+-- .gitignore
+-- jsconfig.json
+-- next.config.mjs
+-- package.json
+-- README.md
```

## What Each Main Folder Is Responsible For

### src/app/

This is the heart of the Next.js application.

It replaces the old React Router structure. Instead of manually wiring routes in a routing file, every route now lives in the file system.

Examples:

- `src/app/page.js` is the home page.
- `src/app/(auth)/login/page.js` is the login page.
- `src/app/courses/[courseId]/page.js` is a dynamic course details page.

Important rule:

Use `src/app` for route entry points, layout files, loading files, and route-level composition.

### Route Groups

Folders like `(auth)`, `(student)`, `(instructor)`, and `(admin)` are route groups.

They help organize pages by role or workflow without changing the URL.

That means:

- `(auth)/login/page.js` becomes `/login`
- `(student)/student/dashboard/page.js` becomes `/student/dashboard`

This is useful in an LMS because the app supports different user experiences for students, instructors, and admins.

### src/components/

This folder holds reusable presentation components.

Recommended subfolders:

- `ui/` for generic reusable UI pieces such as buttons, inputs, badges, modals, loaders, tabs, and cards
- `layout/` for shared page shells such as headers, sidebars, navbars, content shells, and dashboard wrappers
- `course/` for reusable course presentation pieces such as course cards, curriculum blocks, instructor cards, and lesson summaries
- `dashboard/` for reusable dashboard widgets and summaries

These components should stay as reusable as possible.

### src/features/

This folder groups frontend code by business domain.

Examples:

- `features/auth/`
- `features/courses/`
- `features/dashboard/`
- `features/progress/`
- `features/video-learning/`
- `features/admin/`

This layer is where feature logic, API coordination, view models, helpers, and feature-specific reusable pieces can live.

This is important because it separates domain behavior from generic UI.

### src/hooks/

This folder stores reusable hooks.

Examples:

- `useAuth.js`
- `useCourses.js`
- `useProgress.js`
- `useNotifications.js`

Keep hooks small and focused.

### src/services/

This folder contains API communication only.

Examples:

- `api.js` for the shared Axios instance
- `authService.js`
- `courseService.js`
- `progressService.js`
- `adminService.js`

Do not scatter raw API calls across pages and components.

### src/utils/

Use this folder for helpers that are not components and not feature-specific.

Examples:

- constants
- validators
- formatters
- storage helpers
- route helpers

### src/styles/

Use this folder for shared styling resources:

- design variables
- reset styles
- shared utility classes if the team needs them

Global styling should stay limited.

## Naming Conventions

Use the following rules across the team:

- route files in `app/`: `page.js`, `layout.js`, `loading.js`, `error.js`
- reusable components: PascalCase, for example `CourseCard.jsx`
- hooks: camelCase starting with `use`, for example `useAuth.js`
- services: camelCase ending with `Service`, for example `courseService.js`
- CSS Modules: component-based names such as `CourseCard.module.css`
- utility files: camelCase such as `formatters.js`

These conventions help multiple developers navigate the repo quickly.

## Server Components and Client Components

Next.js App Router uses server components by default.

This means the team should follow this rule:

- use server components by default
- use client components only when needed

Use a client component only if the file needs:

- `useState`
- `useEffect`
- browser APIs
- event-heavy interactivity
- client-side form handling
- third-party client-only libraries

If a file needs to be a client component, add:

```js
"use client";
```

at the top of the file.

This rule keeps the app more efficient and encourages cleaner separation of responsibilities.

## How Pages Should Be Built in Next.js

Each route page in `src/app` should stay relatively small.

The route page should:

- fetch or assemble page-level data
- connect the correct layout
- compose feature and UI components

The route page should not become a giant file full of repeated markup.

Example approach:

- `src/app/courses/page.js` should compose course discovery UI
- `src/components/course/CourseCard.jsx` should render a single course card
- `src/features/courses/` should hold course-related logic or composite feature sections

## Suggested Route Map

Recommended TalentFlow routes:

```text
/
/login
/signup
/student/dashboard
/instructor/dashboard
/courses
/courses/[courseId]
/learn/[courseId]/[lessonId]
/admin
```

Additional routes can be added later for:

- assignments
- notifications
- discussions
- profile
- analytics
- admin sub-pages

## How to Split Work Across Multiple Frontend Developers

Recommended ownership for a multi-developer team:

- Developer 1: auth routes, auth feature logic, login, signup
- Developer 2: student dashboard and shared learner layout
- Developer 3: instructor dashboard, course pages, and learning pages
- Developer 4: admin area, progress tracking, and shared platform utilities

Shared ownership:

- `components/ui`
- `components/layout`
- `services/api.js`
- `styles/variables`
- route group conventions

Important rule:

When editing shared files, communicate first.

Shared files that should not be changed casually by multiple developers at the same time include:

- `src/app/layout.js`
- shared layout wrappers
- top-level navigation
- shared UI primitives
- API base configuration

## GitHub Repository Workflow

Use one frontend repository with these long-lived branches:

- `main` for production-ready code
- `staging` for QA and demo validation
- `develop` for team integration

Each developer should work from a feature branch created from `develop`.

### Branch naming examples

- `feature/landing-page`
- `feature/signin-signup`
- `feature/dashboard-layout`
- `feature/course-catalog`
- `feature/course-details`
- `feature/lesson-page`
- `feature/assignment-submission`
- `feature/progress-tracking`
- `feature/discussions`
- `feature/notifications`
- `feature/profile-page`
- `feature/admin-interface`

### Collaboration flow

1. Pull the latest `develop`
2. Create a new feature branch
3. Implement the assigned work
4. Test locally
5. Open a pull request into `develop`
6. Fix review comments
7. Merge after approval
8. Promote stable builds to `staging`
9. Promote release-ready code to `main`

Commands:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/signin-signup
```

## Suggested GitHub Issues and Milestones

Suggested milestones:

- Next.js migration
- Authentication
- Student dashboard
- Instructor dashboard
- Courses
- Video learning
- Progress tracking
- Admin interface
- Integration and polish

Issue examples:

- Migrate shared layout into App Router
- Build login route in Next.js
- Build signup route in Next.js
- Create student dashboard shell
- Build instructor dashboard widgets
- Create course listing page
- Build dynamic course details route
- Build video learning lesson page
- Build admin overview screen
- Extract shared UI primitives for dashboards

## Migration Guidance from the Original React Structure

The previous React structure should not be treated as wasted work.

Instead, the team should migrate it carefully.

Map old ideas into the new structure like this:

- old `src/pages` becomes route files in `src/app`
- old `src/routes` is replaced by file-based routing in `src/app`
- old reusable components stay reusable under `src/components`
- old service files stay useful under `src/services`
- old hooks and utilities can still be reused with minimal change

Migration principle:

Do not try to rewrite everything at once. Move feature by feature.

Recommended migration order:

1. root layout and home page
2. login and signup
3. student dashboard
4. instructor dashboard
5. courses and course details
6. video learning route
7. progress and supporting features
8. admin interface

## Authentication Guidance

For authentication in the new structure:

- route pages live in `src/app/(auth)/`
- shared auth forms live in `src/features/auth/` or `src/components/ui/`
- API calls live in `src/services/authService.js`
- client interactivity should be isolated in form components that use `"use client"`

This gives the team a clean split between route files, UI, and feature logic.

## Dashboard Guidance

### Student Dashboard

Should support:

- active learning summary
- courses in progress
- assignment reminders
- recent notifications
- progress overview

### Instructor Dashboard

Should support:

- course management summaries
- learner progress visibility
- assignment and content management
- performance snapshots

### Admin Interface

Should support:

- role and user management
- platform monitoring
- content oversight
- reporting and administration

Each dashboard should reuse shared dashboard widgets where possible.

## Course and Learning Page Guidance

### Course Pages

Recommended structure:

- course listing route in `src/app/courses/page.js`
- course details route in `src/app/courses/[courseId]/page.js`
- reusable course presentation components in `src/components/course/`
- course business logic in `src/features/courses/`

### Video Learning Pages

Recommended structure:

- route in `src/app/learn/[courseId]/[lessonId]/page.js`
- reusable lesson navigation and lesson display components in `src/features/video-learning/`
- supporting APIs in lesson and progress services

## Styling Guidance

CSS Modules are still a strong choice for this team.

Why they still work well in Next.js:

- familiar for developers coming from HTML and CSS
- scoped by default
- easy to pair with reusable components
- good for multi-developer collaboration

Recommended styling rules:

- keep global styling in `src/app/globals.css` and shared style files
- keep component-specific styling in `.module.css` files
- avoid large monolithic CSS files

## Performance Guidance in Next.js

The team should take advantage of Next.js strengths.

Recommended habits:

- prefer server components by default
- keep client components focused
- avoid unnecessary client-side state
- keep large route pages split into smaller sections
- optimize images and assets
- fetch data at the route or feature level where appropriate

## Beginner-Friendly Working Rules for Interns and Junior Developers

To keep the codebase understandable:

- page route files should stay simple
- business logic should not be hidden inside giant UI files
- components should do one job each
- shared UI belongs in `components/ui`
- feature-specific logic belongs in `features/`
- API calls belong in `services/`

Simple mental model:

- `app/` means route entry
- `components/` means reusable UI
- `features/` means product logic by domain
- `services/` means backend communication
- `utils/` means helpers

## Weekly Team Process

### Monday

- confirm sprint priorities
- assign feature ownership
- confirm branch names and shared-file coordination

### Daily

- share blockers early
- coordinate edits to shared layouts and UI primitives
- keep pull requests small when possible

### Before each merge

- test locally
- verify route behavior
- verify responsive layout
- review component reuse
- request review from a teammate

### End of week

- merge stable work into `develop`
- validate integrated flows in `staging`
- prepare `main` only from release-ready tested work

## Final Recommendations for the Frontend Team

- treat `src/app` as the routing and layout layer
- keep reusable UI outside route folders
- keep business logic grouped by domain in `src/features`
- use server components first and client components only when necessary
- keep API code in `src/services`
- preserve useful parts of the original React project during migration
- optimize for team collaboration, not just speed of initial implementation

If the team follows this updated structure, the TalentFlow frontend will be easier to scale, easier to review, and much better suited for a multi-developer production workflow in Next.js.
