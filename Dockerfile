FROM mmi3docker/symfony-2023:latest

WORKDIR /var/www/ApiPlateform

COPY api/ /var/www/ApiPlateform
COPY api.conf /etc/apache2/sites-available/001-apiPlateform.conf

RUN a2dissite 000-default.conf
RUN a2ensite 001-apiPlateform.conf

# CMD ["a2ensite", "001-apiPlateform.conf"]

RUN composer install

# RUN service apache2 reload
