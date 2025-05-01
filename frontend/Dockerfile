# frontend/Dockerfile

# ===== Stage 1: Build React App =====
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
# If using CRA: output goes to 'build/'
# If using Vite: output goes to 'dist/'
RUN npm run build


# ===== Stage 2: Serve with Nginx =====
FROM nginx:alpine

# Copy build output from builder
# Adjust the source path based on your tool (CRA=build, Vite=dist)
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for HTTP
EXPOSE 80

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
