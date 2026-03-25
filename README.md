# SkillForge LMS

## Project Overview

SkillForge LMS is a full-stack MERN Learning Management System built with industry-style architecture. The platform supports three user roles with role-based dashboards and secure API access:

- `Student`: browse courses, enroll, and track progress
- `Instructor`: create/manage courses and upload lessons
- `Admin`: manage users/courses and view analytics reports

The project includes a polished responsive UI with Light/Dark themes, JWT authentication, and MongoDB-backed APIs.

## Core Features

- Role-based authentication and authorization (Admin/Instructor/Student)
- Password hashing with Bcrypt and token-based auth with JWT
- Protected backend routes + protected frontend routes
- Course lifecycle: create, edit, delete, browse, details, lesson upload
- Enrollment flow with student course tracking
- Admin analytics dashboard (users, courses, enrollments, revenue)
- PKR currency formatting in frontend displays
- Registration confirm-password validation
- Seed script for 15 demo courses for quick testing

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Bootstrap / React Bootstrap
- Custom theme system (Light/Dark)

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Dotenv

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  scripts/
  server.js
frontend/
  public/
  src/
    components/
    context/
    pages/
    routes/
    services/
```

## API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Course Management

- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `POST /api/courses/:id/lessons`

### User Management (Admin)

- `GET /api/users`
- `DELETE /api/users/:id`

### Enrollment (Student)

- `POST /api/enrollments/enroll`
- `GET /api/enrollments/my-courses`

### Analytics (Admin)

- `GET /api/analytics/reports`

## Local Setup

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd "Final Project MERN"
```

### 2. Backend Setup

```bash
cd backend
npm install
copy .env.example .env
```

Update `.env` values:

- `MONGO_URI` (MongoDB Atlas URI)
- `JWT_SECRET`
- `PORT`
- `CLIENT_URL`

Run backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
copy .env.example .env
```

Run frontend:

```bash
npm run dev
```

## Test Data Seeding

To insert 15 demo courses automatically:

```bash
cd backend
npm run seed:courses
```

Seed script behavior:

- Creates demo instructor if missing
- Clears old demo courses by title prefix
- Inserts 15 fresh demo courses with lessons

Demo instructor credentials:

- `demo.instructor@skillforge.com`
- `Instructor@123`

## Functional Workflow Summary

1. User registers/logs in and receives JWT.
2. Frontend stores token and sends it with protected requests.
3. Backend validates token + role middleware.
4. Role dashboards expose allowed operations only.
5. Student enrollment and admin analytics update in MongoDB in real time.

## UI/UX Notes

- Full responsive layout for desktop and mobile
- Sticky footer layout across all pages
- Professional role quick-actions in navbar (not hidden in dropdown)
- Theme toggle: Light and Dark mode

