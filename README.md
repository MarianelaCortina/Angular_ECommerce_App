La aplicacion fue realoizada en Angular version 16
ng install -g @angular/cli@16.2.0

------------------
Para crear un Mock

npm i -g json-server

---------------
Para crear una fake API:
1) en el package.json -linea 10 - agregamos los siguiente:
	"serverAPI": "json-server --watch server/db.json --port 3000"
Esto nos creará una falsa api en el puerto 3000, que nos permitirá simular un backend

--watch ... este parámetro nos sirve para que la app esté siempre observando este fichero y siempre se esté actualizando automaticamente.

2)ejecutamos, abriendo el proyecto en una nueva terminal, y ejecutando el siguiente comando:
npm run serverAPI
