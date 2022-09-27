FROM node:16

WORKDIR /gour-store-front

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

CMD [ "npm", "start" ]