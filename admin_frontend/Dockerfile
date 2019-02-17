FROM node:9

RUN mkdir /opt/app
WORKDIR /opt/app
ADD package*.json ./
ADD yarn.lock ./

RUN yarn install

ADD . .
EXPOSE 3000
#RUN yarn build
CMD ["yarn", "start"]