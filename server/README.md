# Mock Interview Platform - Server

A robust Node.js/Express server for the AI-based mock interview platform.

## Features

- RESTful API design
- Input validation with Joi
- Error handling middleware
- Rate limiting
- CORS configuration
- Environment-based configuration
- Modular architecture

## Project Structure

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   └── index.js        # Application entry point
├── tests/              # Test files
├── .env.example        # Environment variables template
└── package.json        # Dependencies and scripts
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration

4. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Interviews
- `POST /api/interviews` - Start new interview
- `GET /api/interviews/:id/questions` - Get interview questions
- `POST /api/interviews/:id/questions/:questionId/answer` - Submit answer
- `GET /api/interviews/:id/results` - Get interview results
- `GET /api/interviews/history/:userId` - Get user history

### Users
- `POST /api/users` - Create user profile
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Environment Variables

See `.env.example` for all required environment variables.