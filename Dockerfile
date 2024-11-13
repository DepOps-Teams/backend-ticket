# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /backend-ticket

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
