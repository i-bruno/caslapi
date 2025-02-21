# Usa una imagen oficial de PHP con Apache
FROM php:8.2-apache

# Copia los archivos de tu proyecto al servidor web
COPY . /var/www/html/

# Exponer el puerto 80 para que Render pueda acceder
EXPOSE 80

# Iniciar Apache al ejecutar el contenedor
CMD ["apache2-foreground"]
