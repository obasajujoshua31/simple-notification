FROM node:alpine

WORKDIR /app

COPY package.json /app

COPY  yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE  5190

CMD  [ "yarn", "start" ]
