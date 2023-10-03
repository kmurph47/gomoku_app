FROM node:16-alpine

WORKDIR /gomoku_backend

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
ADD ./.env ./
RUN yarn --ignore-scripts

CMD yarn bootstrapdb; yarn dev
