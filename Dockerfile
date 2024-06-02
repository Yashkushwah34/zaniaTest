FROM node:20-alpine

WORKDIR /app

COPY package*.json .

COPY tailwind.config.js .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY postcss.config.js .
COPY vite.config.ts .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

