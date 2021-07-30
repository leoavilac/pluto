# Manual Técnico

A continuación se describen los comandos para ejecutar el proyecto de mongodb-redis-sopes1

Crear imagen de docker

```bash
docker build -t mongodb-redis-sopes1 .
```

Desplegar contenedor de docker, con enlace simbólico hacia la carpeta del proyecto

```bash
docker run -v %cd%:/app:ro -v /app/node_modules --env-file ./.env -p 3001:3001 -d --name mongodb-redis-sopes1 mongodb-redis-sopes1
```

Detener y eliminar contenedor

```
docker rm mongodb-redis-sopes1 -f
docker rm mongodb-redis-sopes1 -fv
```

Ver documentos del contenedor

```
docker exec -it mongodb-redis-sopes1 bash
```

Deploy docker-compose configuration
```
docker-compose up -d --build
```

Undeploy docker-compose 
```
docker-compose down
docker-compose down -v
```


Modo de desarrollo
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
docker volume prune
```

Modo de producción, para despliegue
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
```

Acceder a mongodb
```
docker exec -it mongodb-redis-sopes1_mongodb_1 bash
docker exec -it mongodb-redis-sopes1_mongodb_1 bash mongo -u "leoavilac" -p "holamundo"
```