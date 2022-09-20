FROM node:18.0.0 AS build

WORKDIR /gour-store-front

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

CMD [ "npm", "start" ]