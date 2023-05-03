FROM node:18.15.0

WORKDIR /app

ENV DOCGPT_DB_PORT=5431

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]