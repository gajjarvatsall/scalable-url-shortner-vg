# 🔗 Scalable URL Shortener

A production-grade URL shortening service with a beautiful, minimalistic frontend and scalable backend architecture. This full-stack application provides fast URL shortening with Redis caching, user authentication, and modern React interface.

## 🚀 Features

- **Beautiful UI**: Modern, minimalistic React frontend with responsive design
- **Fast URL Shortening**: Generate short URLs using nanoid for collision-resistant identifiers
- **Redis Caching**: Lightning-fast URL resolution with Redis cache layer
- **User Authentication**: Secure JWT-based authentication system
- **MongoDB Storage**: Persistent data storage with MongoDB
- **Containerized**: Docker and Docker Compose ready for both frontend and backend
- **Cloud Ready**: Infrastructure as Code with Terraform for AWS deployment
- **Production Grade**: Built with scalability and performance in mind

## 🛠️ Tech Stack

### Frontend

- **React.js** with modern hooks and context API
- **React Router** for client-side routing
- **Axios** for API communication
- **React Toastify** for notifications
- **CSS3** with custom properties and modern styling
- **Responsive Design** for all device sizes

### Backend

- **Node.js** with Express.js
- **MongoDB** for persistent storage
- **Redis** for caching layer
- **JWT** for authentication
- **bcrypt** for password hashing
- **nanoid** for URL ID generation

### DevOps & Infrastructure

- **Docker** & Docker Compose for containerization
- **Nginx** for frontend serving
- **Terraform** for Infrastructure as Code
- **AWS** for cloud deployment
- **Jenkins** for CI/CD pipeline (planned)

## 📁 Project Structure

```
scalable-url-shortner-vg/
├── frontend/
│   ├── public/
│   │   └── index.html         # Main HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js      # Navigation header
│   │   │   └── URLShortener.js # URL shortening component
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js        # Home page
│   │   │   ├── Login.js       # Login page
│   │   │   └── Register.js    # Registration page
│   │   ├── services/
│   │   │   └── api.js         # API service configuration
│   │   ├── App.js             # Main App component
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Global styles
│   ├── Dockerfile
│   ├── nginx.conf             # Nginx configuration
│   └── package.json
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── url.controller.js  # URL shortening logic
│   ├── middlewares/
│   │   └── auth.middleware.js # JWT authentication middleware
│   ├── models/
│   │   └── url.model.js       # URL data model
│   ├── routes/
│   │   ├── auth.routes.js     # Authentication routes
│   │   └── url.routes.js      # URL shortening routes
│   ├── Dockerfile
│   ├── package.json
│   └── server.js              # Main server file
├── infra/
│   ├── main.tf                # Main Terraform configuration
│   ├── outputs.tf             # Terraform outputs
│   ├── provider.tf            # AWS provider configuration
│   └── variables.tf           # Terraform variables
├── docker-compose.yml
├── .env.example               # Environment variables template
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (or use Docker)
- Redis (or use Docker)

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Server Configuration
PORT=2004
BASE_URL=http://localhost:2004

# Database
MONGODB_URI=mongodb://localhost:27017/url-shortener
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Quick Start with Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/gajjarvatsall/scalable-url-shortner-vg.git
   cd scalable-url-shortner-vg
   ```

2. **Copy environment file**

   ```bash
   cp .env.example .env
   ```

3. **Start the entire application**

   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:2004
   - MongoDB: localhost:27017
   - Redis: localhost:6379

### Local Development

#### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start MongoDB and Redis with Docker**

   ```bash
   docker-compose up -d mongodb redis
   ```

4. **Run the backend**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Docker Deployment

Run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

This will start:

- Frontend application on port 3000
- Backend application on port 2004
- MongoDB on port 27017
- Redis on port 6379

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### URL Shortening Endpoints

#### Shorten URL

```http
POST /api/url
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "originalUrl": "https://www.example.com/very/long/url"
}
```

**Response:**

```json
{
  "shortUrl": "http://localhost:2004/api/url/AbC123"
}
```

#### Resolve Short URL

```http
GET /api/url/:shortId
```

This endpoint redirects to the original URL.

## 🏗️ Architecture

### Caching Strategy

- **Redis** is used as a cache layer for fast URL resolution
- Cache-aside pattern: Check cache first, then database if cache miss
- Automatic cache population on database reads

### Database Design

- **MongoDB** stores URL mappings with the following schema:
  ```javascript
  {
    shortId: String (unique),
    originalUrl: String,
    createdAt: Date,
    userId: ObjectId (optional)
  }
  ```

### Scalability Features

- Stateless application design
- Redis caching for reduced database load
- Docker containerization for easy scaling
- Infrastructure as Code for cloud deployment

## 🚀 Deployment

### AWS Deployment with Terraform

1. **Configure AWS credentials**

   ```bash
   aws configure
   ```

2. **Navigate to infrastructure directory**

   ```bash
   cd infra
   ```

3. **Initialize Terraform**

   ```bash
   terraform init
   ```

4. **Plan deployment**

   ```bash
   terraform plan
   ```

5. **Deploy infrastructure**
   ```bash
   terraform apply
   ```

## 🧪 Testing

### Test the Application

1. **Access the frontend**: Open http://localhost:3000 in your browser
2. **Register a new account** or **login** with existing credentials
3. **Shorten a URL**: Paste a long URL and click "Shorten"
4. **Copy and test**: Copy the generated short URL and test it

### API Testing with cURL

```bash
# Health check
curl http://localhost:2004/api/health

# Register a new user
curl -X POST http://localhost:2004/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:2004/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Shorten URL (replace YOUR_JWT_TOKEN with the token from login)
curl -X POST http://localhost:2004/api/url \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"originalUrl": "https://www.google.com"}'

# Test URL resolution
curl -L http://localhost:2004/api/url/AbC123
```

## 🔧 Configuration

### Performance Tuning

- Adjust Redis TTL for cache entries
- Configure MongoDB connection pool size
- Set appropriate container resource limits

### Security

- Use strong JWT secrets in production
- Implement rate limiting (recommended)
- Enable HTTPS in production
- Restrict CORS origins in production
- Use environment variables for sensitive data
- Regular security updates for dependencies

## 📜 Scripts

The project includes helpful scripts:

```bash
# Quick start (copies .env and starts with Docker)
./start.sh

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up --build -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vatsal Gajjar** ([@gajjarvatsall](https://github.com/gajjarvatsall))

## 🙏 Acknowledgments

- Built with modern Node.js ecosystem
- Inspired by industry-standard URL shortening services
- Designed for production scalability and performance

---

⭐ Star this repository if you find it helpful!
