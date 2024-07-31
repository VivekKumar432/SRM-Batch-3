FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

# Update npm to the latest version
RUN npm install -g npm@10.8.2

# Clear npm cache
RUN npm cache clean --force

# Set npm registry to a different one (optional)
# RUN npm set registry https://registry.npmjs.org/

# Retry npm install with increased timeout and retries
RUN npm install --loglevel verbose --fetch-retries=5 --fetch-retry-factor=2 --fetch-retry-mintimeout=5000 --fetch-retry-maxtimeout=60000

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]
