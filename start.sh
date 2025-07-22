#!/bin/bash

# URL Shortener Quick Start Script

echo "🔗 Setting up URL Shortener..."

# Check if .env exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Please update .env file with your configuration"
fi

# Start the application with Docker Compose
echo "🚀 Starting application with Docker Compose..."
docker-compose up -d

echo ""
echo "✅ Application is starting up!"
echo ""
echo "📍 Access points:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:2004"
echo "   API Health: http://localhost:2004/api/health"
echo ""
echo "🔍 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
echo ""
echo "⏳ Please wait a moment for all services to start..."
