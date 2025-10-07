# Video Curator Platform

A full-stack video curation platform built with Node.js, Express, MongoDB, and React.

## Features

- 🎥 Video upload and management
- 🔍 Advanced search and filtering
- 👍 Voting system (upvote/downvote)
- 📊 View tracking
- 🎨 Modern, responsive UI
- 🔒 Security best practices
- ⚡ Performance optimizations

## Tech Stack

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- Joi for validation
- Helmet for security
- Rate limiting
- CORS configuration

### Frontend

- React 18
- Material-UI (MUI)
- React Router v6
- Axios for API calls
- Notistack for notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
NODE_ENV=development
SERVER_PORT=8082
MONGODB_URL=mongodb://localhost:27017/video-curator
```

4. Start the development server:

```bash
npm run dev
```

The backend will be available at `http://localhost:8082`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```env
REACT_APP_API_ENDPOINT=http://localhost:8082/v1/
REACT_APP_API_BASE_URL=http://localhost:8082
REACT_APP_ENV=development
```

4. Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Videos

- `GET /v1/videos` - Get all videos with optional filters
- `GET /v1/videos/:id` - Get video by ID
- `POST /v1/videos` - Create new video
- `PATCH /v1/videos/:id/votes` - Update video votes
- `PATCH /v1/videos/:id/views` - Update video view count

### Health Check

- `GET /health` - Server health status

## Environment Variables

### Backend

- `NODE_ENV` - Environment (development/production/test)
- `SERVER_PORT` - Server port (default: 8082)
- `MONGODB_URL` - MongoDB connection string

### Frontend

- `REACT_APP_API_ENDPOINT` - Backend API endpoint
- `REACT_APP_API_BASE_URL` - Backend base URL
- `REACT_APP_ENV` - Environment

## Security Features

- Rate limiting (100 requests per 15 minutes)
- Helmet.js for security headers
- CORS configuration
- Input validation with Joi
- MongoDB injection protection
- XSS protection

## Performance Optimizations

- Database indexing for faster queries
- Response compression
- Lazy loading for images
- Memoized API calls
- Optimized React components

## Development

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Frontend Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
