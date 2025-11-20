# URL Shortener Backend

A simple URL shortener service built with Node.js and Express. This project lets you create short links from long URLs and track how many times they are clicked.

## Features

- Create short links from long URLs
- Use custom short codes or auto-generate them
- Get all your links with search option
- Delete links
- Track click counts and last clicked time
- Redirect to original URL when short link is accessed
- Health check endpoint

## Prerequisites

Before you start, make sure you have:
- Node.js installed on your computer
- MongoDB database (local or cloud like MongoDB Atlas)
- npm (comes with Node.js)

## Installation

1. Clone or download this project
2. Open terminal in the project folder
3. Install all dependencies:
   ```bash
   npm install
   ```

## Setup

1. Create a `.env` file in the root folder
2. Add these environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
   
   Example for local MongoDB:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/urlshortener
   ```

## Running the Project

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/healthcheck` - Check if server is running

### Create Short Link
- **POST** `/api/links`
  - Body: `{ "targetUrl": "https://example.com", "shortCode": "optional-code" }`
  - Creates a new short link

### Get All Links
- **GET** `/api/links`
  - Query params: `?search=keyword` (optional)
  - Returns all links, optionally filtered by search term

### Get Link by Code
- **GET** `/api/links/:code` or `/code/:code`
  - Returns details of a specific short link

### Delete Link
- **DELETE** `/api/links/:code`
  - Deletes a short link

### Redirect to Original URL
- **GET** `/:code`
  - Redirects to the original URL and tracks the click

## Project Structure

```
src/
  ├── controllers/    # Request handlers
  ├── db/            # Database connection
  ├── middlewares/   # Error handling
  ├── models/        # Database models
  ├── routes/        # API routes
  ├── utils/         # Helper functions
  ├── app.js         # Express app setup
  └── index.js       # Server entry point
```

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS
- dotenv

## Author

Aditya Maurya

