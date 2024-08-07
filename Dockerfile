FROM node:20.11.1
WORKDIR /empoyee_monitor_be
COPY package.json .
RUN npm install
COPY . .
CMD npm start