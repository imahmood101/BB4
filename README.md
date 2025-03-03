# Sales Dashboard Platform

A modern, full-stack sales dashboard platform built with React, TypeScript, and Express.js.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn UI components
- React Hook Form with Zod
- TanStack Query
- Wouter for routing
- Jotai for state management

### Backend
- Express.js with TypeScript
- Turso DB (PostgreSQL)
- Drizzle ORM
- Passport.js for authentication
- Express-session for session management

## Project Structure

```
├── frontend/           # React frontend application
├── backend/           # Express.js backend server
├── shared/            # Shared types and utilities
└── docs/             # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Turso DB account

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   pnpm install

   # Install backend dependencies
   cd ../backend
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your configuration

4. Start development servers:
   ```bash
   # Start frontend (in frontend directory)
   pnpm dev

   # Start backend (in backend directory)
   pnpm dev
   ```

## Features

- User Authentication & Authorization
- Lead Management
- Analytics & Reporting
- User Management & Administration
- Real-time Collaboration
- Profile Management
- Customizable Notifications

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License