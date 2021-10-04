FROM node:10

WORKDIR /usr/src/app

COPY . /usr/src/app/
COPY ["package.json", "./"]
RUN npm install

RUN ls /usr/src/app

EXPOSE 3000

CMD npm start
