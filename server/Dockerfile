FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json separately
# This is done to leverage Docker layer caching for faster builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the NODE_ENV environment variable to production
ENV NODE_ENV=production

# Expose the port on which your application will run
EXPOSE 8080

# Set other environment variables if needed
# ENV PORT=8080
# ENV HOST=0.0.0.0

# Start the application
CMD ["npm", "start"]
