La aplicacion fue realizada en Angular.

![image](https://github.com/MarianelaCortina/Angular_ECommerce_App/assets/73797352/fc2c789a-7016-4c40-be9f-67356b1e72c9)

Para instalar Angular CLI:
ng install -g @angular/cli

------------------
Para crear un Mock

npm i -g json-server

---------------
Para crear una fake API:
1) en el package.json -linea 10 - agregamos los siguiente:
	"serverAPI": "json-server --watch server/db.json --port 3000"
Esto nos creará una falsa api en el puerto 3000, que nos permitirá simular un backend

--watch ... este parámetro nos sirve para que la app esté siempre observando este fichero y siempre se esté actualizando automaticamente.

Dentro del proyecto hay una carpeta Server, que contiene un archivo db.json, que utilicé como una base de datos

------------------

PARA CORRER EL PROYECTO:
1- Debemos ejecutar el backend: localhost en el puerto 3000:
 a) Abrir el proyecto en una terminal (cmd) 
 b) Escribir el siguiente comando: npm run serverAPI
 c) Abrimos el link que no aparace en la terminal

2-Luego podemos ejecutar el frontend de manera local:
 a) Abrimos el proyecto en Visual Studio Code => Terminal => New terminal
 b) Dentro del proyecto escribimos el siguiente comando: ng serve y nos brindará un link para abrir la aplicación de manera local

PARA PODER AGREGAR UN PRODUCTOS O VARIOS, DEBEMOS INICIAR SESIÓN:
1- Credenciales de algunos usuarios del db.json:
 a) Email: juanperez@gmail.com
    Contraseña: Juan1234
    (es un usuario vip)
 b) Email: tomiarmani@gmail.com
    Contraseña: Tomi1234
    (no es un usuario vip)
 

