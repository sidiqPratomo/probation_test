FROM node:18-alpine as developstage

WORKDIR /app
COPY ./package.json /app/
RUN npm i -g npm serve
RUN npm i
COPY . /app/


FROM developstage as productionstage
ARG VITE_APP_API_BASE_URL
ARG VITE_APP_AUTH_BASE_URL
ARG VITE_APP_API_VERSION
ARG VITE_APP_LIMIT_PAGE=10

#ENV VITE_APP_API_BASE_URL=https://reactnode.xinix.co.id/backend
#ENV VITE_APP_AUTH_BASE_URL=https://reactnode.xinix.co.id/backend
#ENV VITE_APP_API_VERSION=api
#ENV VITE_APP_LIMIT_PAGE=10

RUN npm run build
RUN rm -rf node_modules
CMD [ "sh", "build.sh" ]

