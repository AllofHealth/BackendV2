# Stage 1 - Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the application
RUN npm run build

# Stage 2 - Run the application
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose application port (adjust if needed)
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]
