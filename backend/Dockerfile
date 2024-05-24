# Multi-stage builds is best practice for Dockerfile
# Reference: https://docs.docker.com/develop/develop-images/multistage-build/
# Author: @yuchen

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-slim As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node package-lock.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

RUN apk update
RUN apk add --no-cache python3 py3-pip ffmpeg build-base python3-dev py3-cffi libffi-dev openssl-dev

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/.env ./.env

ARG SERVER_VERSION
ENV SERVER_VERSION=${SERVER_VERSION}

# Start the server using the production build
CMD [ "node", "dist/main.js" ]