# Desafío wallmart
[![codecov](https://codecov.io/gh/li0t/modelab-challenge/branch/main/graph/badge.svg?token=6R52ITOUL9)](https://codecov.io/gh/li0t/modelab-challenge)

El desafío fue resuelto con el stack MEVN, con una arquitectura modular tanto para el cliente como para el servidor. 


**Para ver la app en funcionamiento ingresar a:** http://ec2-3-95-210-28.compute-1.amazonaws.com


## Requisitos desarrollo
Para habilitar un ambiente de desarrollo, poder buildear la solución y correr las pruebas es necesario:

* Ubuntu 18+ (Es posible en otros ambientes Linux)
* Node 8+
* NPM 4+
* MongoDB 3.6+
* Redis-Server 4*

## Requisitos producción
Para habilitar un ambiente de producción son necesarios los siguientes pasos:

1. Instalar docker@latest
2. Correr el script _database-up_ provisto en el desafío, o en su defecto cargar una imagen de mongo en el puerto por defecto, con el nombre mongodb-local y cargar los datos de prueba
3. Cargar la imagen de la app (provista por medios externos o creada en un ambiente de desarrollo)
4. Inicializar la imagen con las instrucciones del script _run.sh_ 
5. (Opcional) Redirigir el puerto 49300 al puerto 80

## Ambiente de pruebas
La aplicación fue deployada en AWS en una instancia EC2 con las siguientes características:

* EC2 t.micro
* 1 GiB ram	
* 8gb EBS
* Ubuntu Bionic 18.04 


  