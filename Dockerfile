FROM nginx:alpine

LABEL maintainer="roxsross-full"

COPY . /usr/share/nginx/html

EXPOSE 80
