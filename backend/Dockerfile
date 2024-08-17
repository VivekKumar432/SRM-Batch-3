# Use a Node.js image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# # Copy the .env file
# COPY backend/.env .env

# Expose the port your app will run on
EXPOSE 5050

# Command to run the app
CMD ["npm", "start"]
