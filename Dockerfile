FROM nginx:alpine

LABEL maintainer="roxsross"

COPY . /usr/share/nginx/html

EXPOSE 80
