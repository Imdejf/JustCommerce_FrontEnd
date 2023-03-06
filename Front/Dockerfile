
# pull official base image
FROM node:13.12.0-alpine AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY craco.config.js ./
COPY package.json ./
COPY package-lock.json ./
RUN npm install


# add app
COPY . ./
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80



# start app
CMD ["nginx", "-g", "daemon off;"]