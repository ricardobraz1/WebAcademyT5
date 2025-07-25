FROM ubuntu:latest

RUN apt-get update && apt-get install -y nginx

EXPOSE 7000

CMD ["nginx", "-g", "daemon off;"]

# Comando para construir a imagem:
# docker build -t meu_nginx_image .
