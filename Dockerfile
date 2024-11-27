# Use Node.js LTS as the base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
# RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3001

# Start the Next.js app
CMD ["npm", "run", "dev", "--", "-p", "3001"]
