FROM node:13.12.0-alpine as build

COPY package.json ./

COPY package-lock.json ./

RUN npm ci && \
    npm install react-scripts@3.4.1 -g
    
COPY  . ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]