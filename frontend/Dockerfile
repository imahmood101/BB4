# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and workspace configuration
COPY package.json pnpm-lock.yaml ./
COPY ../pnpm-workspace.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the entire frontend code into the container
COPY . .

# Build the frontend
RUN pnpm run build

# Expose the port your frontend runs on
EXPOSE 5173

# Start the frontend
CMD ["pnpm", "run", "preview"] 