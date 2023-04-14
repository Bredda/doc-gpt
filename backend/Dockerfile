FROM node:18.15.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV PORT=3000
ENV POSTGRES_HOST=db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=docgpt
ENV MOTOHEAD_URL=http://motorhead:8081
ENV OPENAPI_KEY=

FROM node:18.15.0-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build
EXPOSE ${PORT}
CMD ["npm", "start"]