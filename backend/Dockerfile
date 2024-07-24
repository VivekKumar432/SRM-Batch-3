# backend/Dockerfile
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Copy the .env file
COPY .env .env

EXPOSE 5050

CMD ["node", "index.js"]
