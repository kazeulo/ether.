# Overview

Bingelog is a web-based media consumption tracker that helps users log, track, and analyze everything they watch, read, or play. It provides personalized stats, reviews, and AI-powered insights to enhance the media consumption experience.

Built with modern web technologies and designed as an exploration project for full-stack development and scalable system design.

---

## Features

### Authentication
- User sign-up and login
- Secure session handling

### Media Tracking
- Log movies, TV shows, anime, books, or games
- Track consumption progress (watched, reading, playing, etc.)

### Analytics Dashboard
- Viewing history insights
- Time spent per category
- Ratings and trends

### Reviews & Ratings
- Personal reviews for each media entry
- Rating system for tracking preferences

### AI Assistant
- Smart recommendations
- Natural language logging
- Insight summaries of user activity

### Social Features (Future)
- User profiles
- Follow other users
- Activity feeds and interactions

---

## Tech Stack

### Frontend
- Next.js (App Router)  
- React  
- Tailwind CSS  

### Backend
- Next.js API Routes
- PostgreSQL

### Database
- PostgreSQL

### AI
- OpenAI API for chatbot and recommendations

---

## Project Structure

```bash
src/
├── app/ # App Router pages
├── components/ # Reusable UI components
├── lib/ # Utilities and helpers
├── services/ # API and external service logic
├── store/ # State management
├── types/ # TypeScript types
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
```bash
http://localhost:3000
```