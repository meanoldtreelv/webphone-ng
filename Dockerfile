FROM node:lts-bullseye AS appbuild
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install react react-dom --force
RUN npm run build

FROM node:lts-bullseye-slim
WORKDIR  /usr/src/app
COPY --chown=node:node --from=appbuild /usr/src/app/ ./
EXPOSE 3000
USER node
CMD npm start
