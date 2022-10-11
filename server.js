// SERVER SCRIPT 
// Se utiliza este script para levantar un servidor en javascript con express.

const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path'); //Para generar las rutas a los archivos que el servidor debe cargar.

const database = require('./database/controller.js');

//# DATABASE ROUTES #//
app.get('/api/countries', async (request,response) => {
    response.json(await database.getCountries());
})

/* /api/cities?countryID=1 */
app.get('/api/cities', async (request,response) => {
    let countryID = request.query.countryID;

    if (countryID == undefined) {
        response.status(404).json({message: 'Falta parametro countryID'});
        return;
    }

    response.json(await database.getCities(countryID));
})

app.get('/api/products', async (request,response) => {
    response.json(await database.getProducts());
})

app.get('/api/reasons', async (request,response) => {
    response.json(await database.getReasons());
})

//# /api/leads?limit=10&since=2022-05-04&until=2022-10-25
app.get('/api/leads', async (request,response) => {
    let rows = request.query.limit ? request.query.limit : 10;

    let dateFilter = {since: ""+request.query.since, until: ""+request.query.until};

    if (dateFilter.since == "undefined" || dateFilter.until == "undefined") {
        response.json(await database.getLeads(rows));
        return;    
    }

    response.json(await database.getLeads(rows, dateFilter));
})

// Establecemos directivas para que express maneje cierto tipo de información,
// que por defecto está desactivada.
app.use(express.json())

app.post('/api/leads', async (request,response) => {
    let data = request.body;
    
    Promise.resolve(await database.newLead(data))
    .then((res) => {
        if (res.isOk) response.status(201).send(res)
        else response.status(500).send(res)
        
        response.end();
    })
});

//# PSEUDO-AUTH ROUTE #//
app.post('/api/login', (request,response) => {
    let credentials = request.body;


    if (credentials.user == 'admin' && credentials.password == 'conectapps') {
        response.status(200).send('OK');
    }
    else
    {
        response.status(501).send('Error al autenticar');
    }
});



/* CLIENT ROUTES */
//Establecemos como accesibles/públicas algunas rutas que contienen archivos estáticos.

app.use(express.static('node_modules'));
app.use(express.static('database'));
app.use(express.static('public'));
app.use(express.static('src'));

// envía toda ruta no especificada, a la home de nuestro desarrollo.
app.get('*', (request, response) =>{
    return response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})


// levanta el servidor, en el puerto solicitado.
app.listen(PORT,()=> console.log('Desarrollo lanzado en: http://127.0.0.1:'+PORT));