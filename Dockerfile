FROM node:10-alpine

ADD index.js /app/

EXPOSE 3000
CMD node /app/index.js
