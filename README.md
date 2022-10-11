# Challenge Javascript SSR – Documentación
Este proyecto está destinado a la postulación como Semisenior Javascript  Developer, en conectapps.

Para poder ejecutarlo correctamente, necesitas tener [Node.js](https://nodejs.org) y una conexión a Mysql (como phpMyAdmin o similar), instalado en tu equipo.

## Preparando el lanzamiento

Dentro del repositorio clonado, ejecutar en la terminal:
`npm install`

Con este comando, instalaremos las dependencias que nuestro proyecto necesita.

Para lo siguiente, deberemos configurar nuestra conexión a Mysql. 
Dentro del archivo `database/init.js`, modificar los datos correspondientes a la conexión.

```js
let dataConnection = {
    host: 'localhost',
    user: 'root',
    password: '',
}
```

Una vez guardada la configuración de nuestra conexión, ejecutar los siguientes comandos en la terminal:
```bash
npm run db-setup
npm run dev
```

Deberías recibir una respuesta en la consola informando que la aplicación se lanzó en: http://127.0.0.1:3002

...

## Manual de desarrollo
El core del proyecto está construido en NodeJS utilizando: express, mysql, svelte y rollup.

### Servidor
Desde el archivo `server.js`, se configuran las rutas y puerto de nuestro proyecto, y se despliega el servidor que nos permitirá accederlas.

### MySql
Dentro de la carpeta `database` encontraremos los scripts relacionados a la interacción con la Base de Datos.
`init.js` se utilizará para generar las funciones estándar, que importarán el resto de scripts.
`controller.js` exportará los controladores que utilizará el archivo de servidor para con sus rutas.
`setup.js & unsetup.js` se encargan de dar o quitar la estructura de nuestra base de datos. Sus comandos a ejecutar son `npm db-setup` y `npm db-unsetup`, respectivamente.

### Svelte
Utilizando rollup, el comando `npm run dev`, se encargará de realizar y asociar una build de Svelte, y lanzar nuestro servidor en el puerto que se haya asignado en la configuración.

El archivo raíz del cliente de nuestra aplicación, se encuentra en `main.js` que es importado por `public/index.html`, y `App.svelte` que es gestionado desde `main.js`.

En `App.svelte`, configuraremos el Router cliente, con `svelte-navigator`, donde mostraremos las vistas ` views/Contact.svelte O views/Dashboard.svelte`.

`views/Contact.svelte` importa una serie de componentes a mostrar para, generar en la vista, un formulario de contacto reactivo, y con muestreo condicional de opciones.

Dentro de él, se llama a las rutas `/api/` configuradas en nuestro servidor, para obtener las opciones y enviar los datos de contacto.

`views/Dashboard.svelte` cuenta con una pseudo autenticación de usuario, respaldada por la ruta `/api/login/`, la cual analizará si los datos de acceso coinciden con:
```js
Username: admin
Password: conectapps
```

Además, una vez autenticado, se podrá acceder a la información de Leads, que es importada del componente `LeadsTable.svelte`. Este componente se encarga de filtrar y mostrar la información de Leads que se obtenga desde la API.

### API: Crear leads desde EndPoint
Los leads se pueden crear desde el formulario en el cliente, o también haciendo una petición tipo POST a la ruta: `api/leads`. Se le deberá pasar a través del body, el siguiente JSON:
```js
    "firstname": "Oscar",
    "lastname": "Iuspa",
    "email": "oiuspa@conectapps.com",
    "phone": "01165555946", //OPCIONAL
    "gender": 1, //OPCIONAL
    "country_id": 1,
    "city_id": 1,
    "product_selected_id": 1,
    "reason_id": 1 //OPCIONAL
```
 
