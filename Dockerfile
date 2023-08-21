FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY . .

CMD ["npm", "run", "install_start"]