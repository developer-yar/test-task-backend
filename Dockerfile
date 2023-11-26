FROM node:alpine as builder

WORKDIR /usr/app/back
COPY tsconfig.json ./tsconfig.json
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine

WORKDIR /usr/app/back
COPY tsconfig.json ./tsconfig.json
COPY package*.json ./
ENV PORT=3001
ENV NODE_ENV=Production
RUN npm install
COPY --from=builder /usr/app/back/dist/ ./dist
EXPOSE ${PORT}

CMD ["npm", "run", "start"]