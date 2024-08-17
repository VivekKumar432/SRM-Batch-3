FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm","start"]