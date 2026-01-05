# 📚 Interactive Course Viewer (MERN Stack)

An interactive MERN stack application that displays a course syllabus and tracks a student's learning progress in real time.

This project was built as a **technical assessment** to demonstrate:
- Handling **nested data structures** (Course → Module → Lesson)
- **Optimistic UI updates**
- Clean separation between **frontend UI logic** and **backend data handling**

---

## 🚀 Features

- 📦 Nested course structure (Course → Modules → Lessons)
- ✅ Mark lessons as completed
- 📊 Real-time progress bar updates (Optimistic UI)
- 🔒 Sequential lesson locking (Lesson B unlocks only after Lesson A)
- 📂 Accordion-style module view
- 🌱 MongoDB seeded using provided `course_data.json`
- 🧩 Clean and modular React component architecture

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📁 Project Structure

### Backend
backend/
├─ api/
├─ config/
├─ controller/
│ └─ course.js
├─ models/
│ ├─ Course.js
│ ├─ Module.js
│ ├─ Lesson.js
│ └─ LessonProgress.js
├─ routes/
│ └─ course.js
├─ seed/
│ └─ seedCourse.js
├─ course_data.json
├─ index.js
└─ package.json


### Frontend
frontend/
├─ public/
├─ src/
│ ├─ api/
│ │ └─ courseApi.js
│ ├─ components/
│ │ ├─ LessonItem.jsx
│ │ ├─ ModuleAccordion.jsx
│ │ └─ ProgressBar.jsx
│ ├─ pages/
│ │ └─ CoursePage.jsx
│ ├─ styles/
│ │ └─ course.css
│ ├─ App.jsx
│ └─ main.jsx
├─ index.html
└─ package.json


---

## 🌱 Database Seeding

The database is populated using the provided **`course_data.json`** file.

### Run Seed Script
```bash
cd backend
node seed/seedCourse.js
This inserts:

1 Course

Multiple Modules

Multiple Lessons per Module

🔌 API Endpoints
Get Course with User Progress
http

GET /api/course?userId=user123
Returns

Course details

Modules

Lessons

User-specific lesson completion status

Mark Lesson as Completed
http

POST /api/complete
Request Body

json

{
  "userId": "user123",
  "lessonId": "<lesson_id>"
}
🎯 Course ID Handling Strategy
The frontend does not hardcode any courseId.

Why?
Users never know database IDs

Seed data may change across environments

Hardcoding IDs is fragile and not scalable

Solution
The backend decides which course to return (currently the first/active course).

http

GET /api/course?userId=user123
Benefits
✅ Works even if seed data changes

✅ Matches real-world backend-driven architecture

✅ Cleaner frontend logic

✅ Easily extendable for multiple courses

Separation of Concerns

Backend → Data selection

Frontend → UI & user interaction

🔒 Sequential Lesson Locking
Lessons must be completed in order:

Lesson A → unlocked

Lesson B → locked until Lesson A is completed

This is implemented on the frontend by:

Disabling lesson checkboxes

Showing a "Complete previous lesson" message

⚡ Optimistic UI Updates
When a lesson is marked as completed:

UI updates immediately

API request is sent to backend

On failure, UI state is rolled back

This ensures a fast and smooth user experience.

▶️ How to Run the Project
Backend
bash

cd backend
npm install
npm run dev
Server runs on:



http://localhost:4000
Frontend
bash

cd frontend
npm install
npm run dev
App runs on:



http://localhost:5173
🎥 Demo & Deliverables
✅ Full MERN Stack Implementation

✅ Public GitHub Repository

✅ README with setup instructions

✅ UI demonstrating progress tracking & lesson locking

📌 Notes
No authentication is used (userId is hardcoded as user123)

Focus is on logic, structure, and data flow

Styling kept minimal for clarity

👩‍💻 Author
Priya Tanwar
Frontend-focused Full Stack Developer

