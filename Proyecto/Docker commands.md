Desarrollo
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

Producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build


docker-compose down