FROM node:18
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:dev"]