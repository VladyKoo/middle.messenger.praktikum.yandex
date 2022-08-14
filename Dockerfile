FROM node:16-alpine

ENV HUSKY=0

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts && npm cache clean --force

COPY . .

RUN npm run build

USER node

EXPOSE 3000

CMD ["node", "src/app.js"]