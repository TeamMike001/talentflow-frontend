# TalentFlow Learning Platform Frontend Team Guide

## Purpose of this Document

This document is written for the frontend developers working on the TalentFlow Learning Platform. It explains only the parts the frontend team needs in order to build the LMS in a clean, scalable, and collaborative way using React.js, VS Code, and GitHub.

The goal is not just to build screens. The goal is to help four developers work as one organized frontend team. That means:

- structuring the codebase clearly
- splitting work safely
- converting UI designs into reusable React components
- using GitHub without stepping on each other's code
- keeping the project maintainable as more LMS pages are added

## Core Pages the Frontend Must Support

The current LMS screens from the UI/UX team are:

- Landing Page
- Sign Up
- Sign In
- Dashboard (Learner)
- Course Catalog (Explore Courses)
- Course Details
- Lesson / Content Page
- Assignment Submission
- Progress Tracking
- Collaboration / Discussion
- Notifications
- User Profile

These pages are enough to define the first frontend architecture. Minor pages can be added later, but the structure should be built around these core screens from the beginning.

## Recommended Frontend Stack

The frontend team already knows HTML, CSS, and JavaScript. To make the move into React smooth, the recommended stack is:

- React with Vite
- React Router for navigation
- Axios for API requests
- CSS Modules for component-level styling
- Context API for shared state such as authentication

Why this stack is recommended:

- Vite is fast and simple to set up.
- React Router gives the LMS clean page-based navigation.
- Axios keeps API requests organized.
- CSS Modules are easier for HTML/CSS developers than more advanced styling systems.
- Context API is enough for the first version of shared application state.

## Project Setup in VS Code

Create the project with the following commands:

```bash
npm create vite@latest talentflow-learning-platform -- --template react
cd talentflow-learning-platform
npm install
npm install react-router-dom axios
npm run dev
```

After setup, open the folder in VS Code and create the internal structure described below.

## Recommended Folder Structure

```text
talentflow-learning-platform/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── illustrations/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Card/
│   │   │   ├── Loader/
│   │   │   ├── Badge/
│   │   │   ├── Avatar/
│   │   │   └── EmptyState/
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── DashboardLayout/
│   │   └── features/
│   │       ├── landing/
│   │       ├── auth/
│   │       ├── dashboard/
│   │       ├── courses/
│   │       ├── lessons/
│   │       ├── assignments/
│   │       ├── progress/
│   │       ├── discussions/
│   │       ├── notifications/
│   │       └── profile/
│   ├── pages/
│   │   ├── Landing/
│   │   │   └── LandingPage.jsx
│   │   ├── Auth/
│   │   │   ├── SignInPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.jsx
│   │   ├── Courses/
│   │   │   ├── CourseCatalogPage.jsx
│   │   │   └── CourseDetailsPage.jsx
│   │   ├── Lessons/
│   │   │   └── LessonPage.jsx
│   │   ├── Assignments/
│   │   │   └── AssignmentSubmissionPage.jsx
│   │   ├── Progress/
│   │   │   └── ProgressTrackingPage.jsx
│   │   ├── Discussions/
│   │   │   └── DiscussionPage.jsx
│   │   ├── Notifications/
│   │   │   └── NotificationsPage.jsx
│   │   ├── Profile/
│   │   │   └── UserProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   ├── AppRouter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── courseService.js
│   │   ├── lessonService.js
│   │   ├── assignmentService.js
│   │   ├── progressService.js
│   │   ├── discussionService.js
│   │   ├── notificationService.js
│   │   └── profileService.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCourses.js
│   │   ├── useAssignments.js
│   │   └── useNotifications.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── storage.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── reset.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## What Each Main Folder Is Responsible For

### public/

This folder contains files that should be served directly by the browser without React processing. Examples include the favicon and static images that do not need to be imported into components.

### src/assets/

This folder stores design assets used inside the React app. It should contain images, icons, and illustrations that components import directly.

Use `src/assets` when the file belongs to the application and is part of the component or page code.

### src/components/

This is where reusable UI pieces live.

#### components/common/

Use this folder for generic building blocks that can appear on many pages. Examples:

- Button
- Input
- Modal
- Loader
- Card
- Badge

These should not contain page-specific logic. A `Button` component should be reusable on Sign In, Profile, and Assignment pages without changing its core purpose.

#### components/layout/

Use this folder for the shared page shell. Examples:

- Navbar
- Sidebar
- Header
- Footer
- DashboardLayout

These components help keep the LMS layout consistent across pages. For example, the learner dashboard, course catalog, lesson page, and profile page may all use the same sidebar and header structure.

#### components/features/

Use this folder for components that belong to one product area only. Examples:

- course cards and filters under `features/courses`
- lesson navigation inside `features/lessons`
- assignment upload widgets inside `features/assignments`

This helps separate reusable global components from feature-specific ones.

### src/pages/

This folder contains route-level pages. Each file here represents a full screen that matches a UI/UX design page.

Examples:

- `LandingPage.jsx` for the public homepage
- `CourseCatalogPage.jsx` for the list of available courses
- `UserProfilePage.jsx` for learner profile management

Each page should compose smaller components instead of becoming very large.

### src/routes/

This folder controls navigation.

- `AppRouter.jsx` defines all routes.
- `ProtectedRoute.jsx` blocks unauthorized users from private pages.
- `PublicRoute.jsx` helps manage public screens such as Sign In and Sign Up.

This separation prevents routing logic from being mixed into page files.

### src/services/

This folder holds API communication logic only.

Examples:

- `authService.js` for login and signup endpoints
- `courseService.js` for fetching courses
- `assignmentService.js` for submitting assignments

Why this matters:

- page files stay focused on UI
- API logic stays reusable and easy to update
- backend endpoint changes can be fixed in one place

### src/context/

This folder contains global shared state. It should be used when many parts of the app need access to the same information.

Examples:

- logged-in user
- auth token
- notification counts

Do not put every piece of state here. Only put state here if multiple pages or many components need it.

### src/hooks/

This folder stores reusable custom React hooks.

Examples:

- `useAuth.js`
- `useCourses.js`
- `useNotifications.js`

These help extract repeated logic and keep components smaller.

### src/utils/

This folder stores helper logic that does not belong to a component.

Examples:

- input validation helpers
- formatting dates
- storing data in local storage
- constants for route names or status labels

### src/styles/

Use this folder only for app-wide styles:

- reset styles
- design variables
- body and typography defaults

Avoid putting page-specific styles here. Those should stay close to the relevant component.

## Naming Conventions

To keep the codebase consistent, the team should use the same naming rules.

- Components: PascalCase, for example `CourseCard.jsx`
- Pages: PascalCase ending with `Page`, for example `DashboardPage.jsx`
- Hooks: camelCase starting with `use`, for example `useAuth.js`
- Services: camelCase ending with `Service`, for example `courseService.js`
- CSS Modules: same component name, for example `Button.module.css`
- Constants and helper files: camelCase, for example `validators.js`

Why this matters:

- developers can guess file purpose quickly
- imports become easier to read
- review becomes faster

## How to Split Work Across 4 Developers

A four-person team should divide the project by feature ownership, while keeping shared components coordinated.

Recommended ownership:

- Developer 1: Landing, Sign Up, Sign In, auth flow, protected routes
- Developer 2: Dashboard, Navbar, Sidebar, Header, shared layout system
- Developer 3: Course Catalog, Course Details, Lesson Page
- Developer 4: Assignment Submission, Progress Tracking, Discussions, Notifications, User Profile

Shared ownership:

- `components/common`
- `styles/variables.css`
- route registration review

Important working rule:

Only one developer should make major structural changes to shared files at a time. Shared files include:

- `AppRouter.jsx`
- `AuthContext.jsx`
- `DashboardLayout.jsx`
- global style files

When more than one person needs those files, coordinate before coding.

## GitHub Repository Workflow

Use one frontend repository with these long-lived branches:

- `main` for production-ready code
- `staging` for QA and demo validation
- `develop` for team integration

Each developer should work from a feature branch.

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

### Commit naming examples

- `feat: build sign in page UI`
- `feat: add course catalog filter bar`
- `fix: correct mobile sidebar overlap`
- `refactor: extract assignment upload card`
- `style: improve dashboard spacing`

### Pull request expectations

Each pull request should:

- focus on one feature or one small unit of work
- include screenshots if the change affects UI
- explain what was built
- explain anything still missing
- be reviewed by at least one teammate

### Safe collaboration flow

Use this workflow every time:

1. Pull the latest `develop`
2. Create a new feature branch
3. Build the assigned work
4. Test locally
5. Open a pull request into `develop`
6. Fix review comments
7. Merge after approval

Commands:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/course-catalog
git add .
git commit -m "feat: build course catalog page structure"
git push origin feature/course-catalog
```

## Suggested GitHub Issues and Milestones

Create milestones around product sections:

- Project Setup
- Authentication
- Dashboard
- Courses
- Lessons
- Assignments
- Progress Tracking
- Discussions
- Notifications
- Profile
- Integration and Polish

Issue examples:

- Setup React folder structure
- Create dashboard layout shell
- Build sign in form and validation
- Create reusable course card component
- Build course details page
- Create lesson content layout
- Create assignment upload UI
- Build progress summary section
- Implement notifications panel UI
- Build profile update form

This makes it easier to assign, track, and review work.

## React Implementation Guide

The frontend team is moving from HTML, CSS, and JavaScript into React. The correct way to do that is not to copy full HTML pages into one giant component. Instead, break every design into smaller pieces.

### Step 1: Start from a route page

Each design screen should first become a page component in `src/pages/`.

Example:

- UI/UX Sign In screen becomes `SignInPage.jsx`
- UI/UX Course Catalog screen becomes `CourseCatalogPage.jsx`

### Step 2: Convert static HTML into JSX

When moving HTML into React:

- change `class` to `className`
- close self-closing tags like `img`, `input`, and `br`
- use `{}` for dynamic values
- replace repeated HTML blocks with components

### Step 3: Extract repeated UI

If the same markup appears more than once, make it a reusable component.

Examples:

- form fields
- course cards
- progress summary boxes
- notifications list items
- section titles

### Step 4: Add props

Props let one component work with different data.

For example, a `CourseCard` can receive:

- course title
- instructor name
- progress percentage
- course thumbnail

Instead of building many separate card files, use one flexible component.

### Step 5: Add state only where needed

Use local component state for:

- form values
- modal visibility
- tab switching
- dropdown open state

Use shared state for:

- current authenticated user
- global notification count
- app-wide preferences if needed

## Page-to-Component Breakdown

### Landing Page

Suggested structure:

- HeroSection
- FeaturesSection
- CoursePreviewSection
- TestimonialsSection
- CallToActionSection
- Footer

This page is mostly public and marketing-focused. It should remain separate from the logged-in learner layout.

### Sign In and Sign Up

Suggested structure:

- AuthLayout
- AuthHeader
- SignInForm or SignUpForm
- FormField
- PasswordInput
- SubmitButton
- AuthIllustration

These pages should reuse the same layout and form components where possible.

### Dashboard

Suggested structure:

- DashboardLayout
- WelcomeBanner
- LearningStats
- ContinueLearningSection
- UpcomingAssignments
- RecentNotifications

This page should focus on summary information and quick actions.

### Course Catalog

Suggested structure:

- PageHeader
- SearchBar
- FilterPanel
- CourseGrid
- CourseCard
- Pagination

This page should be built with reusable cards and filters, because the same patterns may be reused elsewhere.

### Course Details

Suggested structure:

- CourseHero
- CourseOverview
- InstructorInfo
- CourseCurriculum
- EnrollButton or ContinueButton

This page provides deeper information about one course.

### Lesson / Content Page

Suggested structure:

- LessonHeader
- LessonVideo or LessonContent
- LessonResources
- LessonNavigation
- MarkCompleteButton

This page should be designed to hold multiple content types later such as video, notes, PDFs, or embedded resources.

### Assignment Submission

Suggested structure:

- AssignmentHeader
- AssignmentInstructions
- SubmissionForm
- FileUpload
- SubmissionStatus

Keep upload UI isolated in its own component because file handling is usually more complex than normal forms.

### Progress Tracking

Suggested structure:

- ProgressSummary
- CompletedCourses
- InProgressCourses
- AchievementBadges
- PerformanceChart placeholder

Even if charts are added later, the page structure should allow them from the start.

### Collaboration / Discussion

Suggested structure:

- DiscussionHeader
- DiscussionList
- DiscussionThread
- CommentForm
- ParticipantList

Keep comment item components small and reusable.

### Notifications

Suggested structure:

- NotificationsHeader
- NotificationList
- NotificationItem
- EmptyState

This feature can later connect to live updates, so keep it modular.

### User Profile

Suggested structure:

- ProfileHeader
- ProfileAvatar
- ProfileDetailsForm
- PasswordUpdateForm
- LearningPreferences

This page often combines display and edit states, so keep sections separate.

## Routing Structure

Recommended routes:

```text
/
/signup
/signin
/dashboard
/courses
/courses/:courseId
/lessons/:lessonId
/assignments/:assignmentId
/progress
/discussions
/notifications
/profile
```

Why this route structure works:

- it mirrors the UI/UX page list clearly
- it keeps LMS navigation predictable
- it supports dynamic pages such as specific courses and lessons

## State Management Guidance

The project does not need a complex global store at the start.

Use `useState` and `useEffect` for page-level state.

Use Context API for:

- authentication state
- current user data
- notification count if shared globally

Avoid storing everything globally. Too much global state makes the app harder to debug and maintain.

## API Integration Structure

The frontend should isolate backend requests inside service files.

Example responsibilities:

- `authService.js` handles login, signup, logout
- `courseService.js` handles course listing and course details
- `lessonService.js` handles lesson content retrieval
- `assignmentService.js` handles assignment submission
- `profileService.js` handles profile updates

This means page components do not call raw endpoints directly. They call service functions.

That pattern keeps code cleaner and easier to test.

## Styling Guidance

The best styling choice for this team is CSS Modules.

Why:

- easier for developers coming from plain CSS
- styles stay close to components
- avoids class name collision
- keeps large projects more maintainable than one global stylesheet

Recommended rule:

- use `globals.css` only for reset, fonts, body defaults, and utility variables
- keep all page or component styling inside `.module.css` files

## Performance Tips

Even early in development, the team should follow performance-friendly habits.

- Lazy load route pages when the app grows
- Keep components focused and small
- Do not duplicate large blocks of UI code
- Optimize images before adding them
- Avoid unnecessary global state
- Reuse layout and feature components

## HTML to React Migration Tips

When converting old HTML/CSS pages:

1. Copy the page into a React component file
2. Fix HTML to JSX syntax
3. Split large sections into smaller components
4. Move styles into CSS Modules
5. Add props where data will change
6. Connect API data after the UI structure is stable

Avoid this mistake:

Do not move an entire full HTML page into one React file and leave it there. That only recreates static development inside React and defeats the purpose of component-based architecture.

## Weekly Team Process

To keep four developers aligned, use a simple weekly workflow.

### Monday

- confirm priorities
- assign issues
- confirm branch ownership

### Daily

- each developer shares progress
- blockers are raised early
- shared files are coordinated before edits

### Before each merge

- test locally
- check responsiveness
- review design consistency
- request teammate review

### End of week

- merge stable work into `develop`
- validate in `staging`
- review progress against milestones

## Final Recommendations for the Frontend Team

- Keep page files small by extracting components early
- Keep API logic out of page components
- Keep styles close to components
- Use GitHub branches and PRs carefully
- Build from shared layouts and reusable components first
- Match UI/UX designs, but build them in a way that supports growth

If the team follows this structure from the start, the LMS frontend will be easier to scale, easier to review, and safer for four developers to build together.
