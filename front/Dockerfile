# --- Stage 1: Build the React App ---
# Name this stage 'builder'
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production (output goes to /app/dist)
RUN npm run build

# --- Stage 2: Serve the App with NGINX ---
# Use a lightweight NGINX image
FROM nginx:1.25-alpine

# Copy the build output from the 'builder' stage to NGINX's web root directory
# The source directory is now correctly set to /app/dist
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the NGINX server
EXPOSE 80

# Start NGINX when the container launches
CMD ["nginx", "-g", "daemon off;"]