# next-13-event-manager

An event manager app with authentication and database with Neon

## Getting started

### Prerequisites

1. PHP - v8.2.8 (v8.1 should also work)
2. Node - v18

### Setting up

1. Add environment variables (filename: `.env`)

   - On the frontend, `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`
   - On the backend, `FRONTEND_URL=http://localhost:3000`

2. Install Dependencies

   - On the frontend run the command, `npm install`
   - On the backend run the command, `composer install`

### Starting Project

1. Start the api with the command, `php artisan serve`
2. Start the frontend with the command, `npm run dev`
