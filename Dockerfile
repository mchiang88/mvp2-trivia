FROM node

WORKDIR /mvp/trivia

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE 1128

CMD ["npm", "run", "server"]