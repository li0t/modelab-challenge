FROM node:10

WORKDIR /usr/src/challenge

COPY package*.json ./
 
RUN npm i --only=production

COPY . .

ENV NODE_ENV=production

EXPOSE 49300

CMD [ "node", "server" ]