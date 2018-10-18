#Docker file for local development

# use image
FROM node:10

# where the files will live in the container
WORKDIR /app

# Move package.json into container working directory
COPY package*.json ./

RUN npm install

#Copy everything over
COPY . /app

EXPOSE 8000

CMD npm run server
