# Stage 1: Build the React App
FROM node:lts-alpine as builder

WORKDIR /app
COPY package*.json ./
# Use npm ci for cleaner installs in CI/CD if package-lock.json exists
RUN npm install 
COPY . .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config (optional but clean)
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
# Assumes your config is in an 'nginx' folder next to your Dockerfile
COPY nginx/default.conf /etc/nginx/conf.d/default.conf 

# Copy built React app files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port nginx is configured to listen on
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
