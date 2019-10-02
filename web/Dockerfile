# build
FROM node:8.6-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

# production
CMD ["npm", "run", "start"]
