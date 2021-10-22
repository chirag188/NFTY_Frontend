FROM node:10

WORKDIR /usr/src/app

COPY . /usr/src/app/
COPY ["package.json", "./"]
RUN npm install

RUN npm install @web3-react/walletconnect-connector@6.2.4

RUN ls /usr/src/app

EXPOSE 3000

CMD npm start
