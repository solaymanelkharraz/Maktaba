# 1. Use the latest stable PHP version with Apache
FROM php:8.3-apache

# 2. Install system dependencies required by Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# 3. Clean up the package manager to keep the image lightweight
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 4. Install PHP extensions required by Laravel & MySQL
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 5. Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

# 6. Configure Apache DocumentRoot to point directly to Laravel's /public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 7. CRITICAL FOR RENDER: Change Apache to listen on the dynamically injected $PORT
RUN sed -i 's/80/${PORT}/g' /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf

# 8. Grab the latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 9. Set the working directory inside the container
WORKDIR /var/www/html

# 10. Copy your entire backend codebase into the container
COPY . .

# 11. Install Laravel dependencies (Optimized for Production)
RUN composer install --no-dev --optimize-autoloader

# 12. Set strict permissions for the storage and cache directories
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# 13. Start the server
CMD ["apache2-foreground"]