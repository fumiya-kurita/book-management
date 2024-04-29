FROM node:latest
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json package-lock.json 
RUN npm install

COPY . .

# ポート3000を公開
EXPOSE 3000

# Reactアプリを起動
CMD ["npm", "start"]