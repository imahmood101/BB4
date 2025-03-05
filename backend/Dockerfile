# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and workspace configuration
COPY package.json pnpm-lock.yaml ./
COPY ../pnpm-workspace.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the entire backend code into the container
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Expose the port that your backend listens on
EXPOSE 3000

# Start the backend
CMD ["pnpm", "run", "dev"] 