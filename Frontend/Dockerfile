# --------------------------------------------------
# DEV mode: Vite dev server with hot reload
# --------------------------------------------------
# FROM node:20-alpine
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --------------------------------------------------
# PROD mode: build static files, serve with nginx + API proxy
# --------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG VITE_API_URL=/api/
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
