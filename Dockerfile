FROM node:21-alpine as node21

ENV NODE_ENV production

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "yarn.lock*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=node21 /usr/app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
