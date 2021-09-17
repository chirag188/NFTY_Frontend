FROM node:10

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

RUN ls /usr/src/app

EXPOSE 3000

CMD npm start
