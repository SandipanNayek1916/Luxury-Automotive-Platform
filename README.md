# Unique — Full-Stack Luxury Car Rental Platform

A production-grade, venture-backed luxury mobility SaaS platform built with Next.js 14, TypeScript, Prisma, NextAuth, Stripe, and Tailwind CSS.

## Architecture

```
├── prisma/                 # Database schema & seed
├── src/
│   ├── app/               # Next.js 14 App Router
│   │   ├── (auth)/        # Login & Register (grouped layout)
│   │   ├── (main)/        # User-facing pages
│   │   │   ├── cars/      # Fleet listing + detail
│   │   │   ├── dashboard/ # User dashboard
│   │   │   ├── bookings/  # Booking history
│   │   │   └── favorites/ # Saved cars
│   │   ├── admin/         # Admin dashboard (protected)
│   │   │   ├── cars/      # Manage vehicles
│   │   │   ├── bookings/  # Manage reservations
│   │   │   └── users/     # Manage customers
│   │   ├── api/           # REST API routes
│   │   │   ├── auth/      # NextAuth + register
│   │   │   ├── cars/      # CRUD cars
│   │   │   ├── bookings/  # CRUD bookings
│   │   │   ├── favorites/ # Toggle favorites
│   │   │   ├── admin/     # Analytics stats
│   │   │   └── checkout/  # Stripe payment intents
│   │   ├── page.tsx       # Landing page
│   │   └── layout.tsx     # Root layout
│   ├── components/        # Reusable UI
│   ├── lib/              # Utilities, Prisma, Stripe, Auth
│   ├── types/            # TypeScript declarations
│   └── middleware.ts     # Route protection
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js (Credentials + OAuth) |
| Database | SQLite (Prisma) |
| ORM | Prisma |
| State | Zustand + TanStack Query |
| Payments | Stripe |
| Animations | Framer Motion |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your keys

# 3. Initialize database
npx prisma migrate dev --name init
npx prisma db seed

# 4. Run dev server
npm run dev
```

## Demo Credentials

- **Admin**: admin@unique.com / admin123
- **User**: user@unique.com / user123

## Features

- JWT Authentication with role-based access
- Full CRUD for cars, bookings, users
- Real-time availability & pricing
- Stripe payment integration
- Favorites & booking history
- Admin analytics dashboard
- Responsive luxury UI
- Cinematic animations
