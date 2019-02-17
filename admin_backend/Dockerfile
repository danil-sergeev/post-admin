FROM node:latest

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json /opt/app/
RUN yarn install
COPY . /opt/app

EXPOSE 8001

CMD ["npm", "run", "start-dev"]
