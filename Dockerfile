
FROM keymetrics/pm2:latest-alpine
WORKDIR /app
VOLUME ["/app/api/data"]
COPY .babelrc .eslintignore .eslintrc.js .postcssrc.js .stylintrc /app/
COPY src /app/src
COPY api /app/api
COPY config /app/config
COPY package.json package-lock.json quasar.conf.js server.js ecosystem.config.js /app/

ENV NPM_CONFIG_LOGLEVEL warn

# Install app dependencies
RUN npm i -g quasar-cli
RUN ls -lt
RUN npm install
RUN quasar build
RUN echo "Done with Client"
RUN cd api && npm install && npm run build

EXPOSE 80
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]