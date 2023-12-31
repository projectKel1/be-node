FROM node:18-alpine3.17

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "build"]

CMD ["npm", "start"]