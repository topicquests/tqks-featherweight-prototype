FROM node:8.11.2-alpine

ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME
COPY dist/ dist/
COPY api/ api/
ENV NODE_ENV 'production'
ENV PORT '8080'
RUN npm install --production
CMD ["node", "src/index.js"]

EXPOSE 8080