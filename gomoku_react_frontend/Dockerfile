FROM node:16-alpine

WORKDIR /gomoku_react_frontend

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./


RUN yarn

COPY . ./


CMD yarn start