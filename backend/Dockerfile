# Base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package files first (for layer caching)
COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev

# Copy backend code into the container
COPY . .
# Expose port
EXPOSE 2004

# Start the app
CMD ["node", "server.js"]
