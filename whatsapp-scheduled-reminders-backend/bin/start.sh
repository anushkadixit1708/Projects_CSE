#!/bin/bash


docker rm -f redis || true
docker rm -f virtualization || true
docker run \
    -p 6380:6379 \
    --name redis \
    -d redis

# npm run serve    

# docker run -p 3000:3000 -d --name virtualization rajanand0511/node-web-app
# docker build . -t rajanand0511/node-web-app

docker run -p 49160:8080 -d --name virtualization rajanand0511/node-web-app
docker-compose up --build