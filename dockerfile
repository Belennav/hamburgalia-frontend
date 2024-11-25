# Usa una imagen oficial de Node.js como base
FROM node:18 AS build

# Setea el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build --prod

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos generados al contenedor Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose el puerto por donde se servirá la app
EXPOSE 80

# Comando para ejecutar el servidor de Nginx
CMD ["nginx", "-g", "daemon off;"]
