#base image
FROM node:current-alpine3.18

WORKDIR /simpleapp

# Run `npm init` non-interactively to create a package.json
RUN npm init -y

#install dependencies
RUN npm install express

RUN npm install -g nodemon

#copy requried files into image
COPY . .

#expose port of app server
EXPOSE 3001

#command
CMD ["nodemon", "app.js"]