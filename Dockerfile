# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:21-alpine AS development

# Set working directory
WORKDIR /usr/app

# Copy package files
COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock

# Install dependencies with yarn
RUN yarn install --frozen-lockfile

COPY . /usr/app

# Set environment variables
ENV PORT=3000

CMD [ "npm", "start" ]

# Separate stage for building
FROM development AS build

RUN yarn build

# Additional stage for development environment setup
FROM development as dev-envs
RUN apk update && \
    apk add --no-cache git

RUN adduser -S vscode \
    && addgroup docker \
    && addgroup vscode docker

# Example of installing Docker tools if needed
# COPY --from=gloursdocker/docker / /

# 2. For Nginx setup
FROM nginx:alpine

# Copy nginx configuration
COPY --from=build /usr/app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built static assets from the build stage
COPY --from=build /usr/app/build .

# Configure nginx to run as a foreground process
ENTRYPOINT ["nginx", "-g", "daemon off;"]
