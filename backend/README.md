## Local installation

[] Copy file .env.exampe to .env
[] change value :
        DB_CONNECTION=mysql
        DB_HOST
        DB_PORT
        DB_DATABASE
        DB_USERNAME
        DB_PASSWORD
## docker installation
[] APP_KEY on configuration generate manually
[] Copy file .env.example to .docker/.env.${APP_ENV} or check for staging and production if exists configuration like .env.staging .env.production
[] change value :
        DB_CONNECTION
        DB_HOST
        DB_PORT
        DB_DATABASE
        DB_USERNAME
        DB_PASSWORD
[] APP_ENV from execute docker-compose 
    APP_ENV=local docker-compose up --build -d
[] APP_ENV depend on enviroment (local:local developer, staging: staging server, custom: custom server, production: production server)

## CICD Installation 

