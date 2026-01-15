FROM nginx:alpine

LABEL maintainer="roxsross-fulfl"

COPY . /usr/share/nginx/html

EXPOSE 80
