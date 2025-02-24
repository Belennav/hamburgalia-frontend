FROM node:current-alpine as build
RUN apk add --no-cache chromium
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npx ng test --karma-config=karma.conf.ci.js
RUN npx ng build
# test
FROM nginx:alpine as front
COPY --from=build /app/dist/salardich-app/browser /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
