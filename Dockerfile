FROM node:20.12.0-alpine
WORKDIR /app
COPY . /app/
RUN yarn install && yarn build

FROM nginx:1.27
COPY --from=0 /app/dist /app
COPY default.conf /etc/nginx/conf.d/default.conf
