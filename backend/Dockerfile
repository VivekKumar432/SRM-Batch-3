FROM node:20.11.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5050
CMD ["npm","start"]