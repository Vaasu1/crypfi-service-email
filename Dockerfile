FROM node:14.17.6
ENV NODE_ENV=development
WORKDIR /app

COPY [".","package.json",".npmrc","./"]
RUN npm install
RUN rm -f ./.npmrc

CMD [ "npm", "run", "rundev"]