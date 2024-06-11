FROM node:21-alpine

ENV NODE_ENV production

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "yarn.lock*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
