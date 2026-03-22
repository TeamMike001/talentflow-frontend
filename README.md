# TalentFlow Learning Platform Frontend

This project is being migrated from a custom React + Vite scaffold to Next.js using the App Router.

## Current architecture

- `src/app`: route entry points and layouts for Next.js
- `src/components`: reusable UI, layout, dashboard, and course components
- `src/features`: business-focused feature modules such as auth, courses, dashboard, progress, video learning, and admin
- `src/hooks`: shared hooks
- `src/services`: API layer
- `src/utils`: helpers and constants
- `src/styles`: shared styling tokens and global styles

## Team workflow

- Build route pages in `src/app`
- Keep reusable UI in `src/components`
- Keep business logic grouped in `src/features`
- Prefer server components by default
- Add `"use client"` only when hooks, browser APIs, or interactive state are required

## Migration note

The old Vite entry files remain temporarily as reference while the team finishes migrating into the Next.js App Router structure.

## Next steps

1. Run `npm install`
2. Start the app with `npm run dev`
3. Move feature-by-feature from the legacy scaffold into `src/app` and the shared Next.js structure
