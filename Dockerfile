
FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn

COPY . . 

EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "5173"]
#--host 0.0.0.0 --port 5173
