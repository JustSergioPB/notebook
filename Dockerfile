# Build angular app
FROM node:22.8.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration=production

# Build nginx image
FROM nginx:1.27.1-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/notebook/browser /usr/share/nginx/html
EXPOSE 80