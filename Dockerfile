FROM node:20

WORKDIR /app

COPY server/package*.json ./server/

RUN npm install --prefix server

COPY client/package*.json ./client/

RUN npm install --prefix client

COPY server/. ./server/

COPY client/. ./client/

RUN npm run build --prefix client

EXPOSE 3500

CMD ["node", "server/index.js"]
