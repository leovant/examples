FROM php:7.1

RUN apt-get -y update && apt-get -y install supervisor
COPY build/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY . /app
CMD ["/usr/bin/supervisord"]