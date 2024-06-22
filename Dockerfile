FROM node:20-slim

WORKDIR /usr/app

COPY package.json /usr/app/

RUN apt update && apt install -y git

RUN npm install

COPY . /usr/app/

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]
