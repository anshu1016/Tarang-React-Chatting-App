# Use an official Node.js runtime as a parent image for building the app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Use an official Nginx image as the base for serving the build
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]



node_modules
build
Dockerfile
.dockerignore

docker build -t your-frontend-app .


docker run -d -p 80:80 your-frontend-app

docker tag your-frontend-app your-dockerhub-username/your-frontend-app

docker push your-dockerhub-username/your-frontend-app


docker pull your-dockerhub-username/your-frontend-app
docker run -d -p 80:80 your-dockerhub-username/your-frontend-app
