FROM node:20-alphine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . . 

EXPOSE 5000

CMD [ "node","src/server.js" ]