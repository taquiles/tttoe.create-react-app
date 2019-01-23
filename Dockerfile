
FROM node:8.10 as LAMBDA_FUNCTION

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

## The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

## install node global packages
RUN npm install && \
    npm install -g serve

## install system packages
RUN apt-get update &&  \
    apt-get install -y xsel &&  \ 
    apt-get install -y net-tools &&  \ 
    rm -rf /var/lib/apt/lists/*        

WORKDIR /app
#ADD . /app

#EXPORT 9229

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
