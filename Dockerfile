FROM node:23.11.0-alpine	
WORKDIR /app

# Install deps & build
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Run
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/app.js"]
