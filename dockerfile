# FROM alpine:3.7
# RUN apk add --update nginx nodejs

# # Create the directories we will need
# RUN mkdir -p /tmp/nginx/vue-single-page-app
# RUN mkdir -p /var/log/nginx
# RUN mkdir -p /var/www/html

# # Copy the respective nginx configuration files
# COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
# COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# # Set the directory we want to run the next commands for
# WORKDIR /tmp/nginx/vue-single-page-app
# # Copy our source code into the container
# COPY . .
# # Install the dependencies, can be commented out if you're running the same node version
# RUN npm install

# # run webpack and the vue-loader
# RUN npm run build

# # copy the built app to our served directory
# RUN cp -r dist/* /var/www/html

# # make all files belong to the nginx user
# RUN chown nginx:nginx /var/www/html

# EXPOSE 8080

# # start nginx and keep the process from backgrounding and the container from quitting
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:lts-alpine
# RUN npm install -g http-server
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 8080
# CMD [ "http-server", "dist" ]


# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY /nginx_config /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# # build environment
# FROM node:12.2.0-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install --silent
# RUN npm install @vue/cli@3.7.0 -g
# COPY . /app
# RUN npm run build

# # production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]