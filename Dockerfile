FROM nginx:alpine

LABEL maintainer="ROXS"

COPY . /usr/share/nginx/html

EXPOSE 80