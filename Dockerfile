FROM nodesource/jessie:5

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install postgresql

ENV TZ=Pacific/Auckland
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /srv/www
WORKDIR /srv/www

COPY package.json /srv/www/

COPY . /srv/www/