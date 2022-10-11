// DATABASE CONTROLLER
// Se utiliza este script para exportar funciones estandarizadas
// así poder leer y escribir información desde el sistema de rutas.

const util = require('util');
const database = require('./init.js');

let connection = database.startConnection();
// Generamos una nueva función query, para realizar consultas asíncronas con el módulo util.
const query = util.promisify(connection.query).bind(connection);


async function getReasons(){
    return await query('SELECT id, reason as name FROM reasons');
}
async function getProducts(){
    return await query('SELECT id, title as name FROM products');
}
async function getCountries(){
    return await query('SELECT id, country as name FROM countries');
}

// Obtiene las ciudades, según el country_id que se le pasa por parámetro.
async function getCities(country_id){
    let cities = await query('SELECT id, city as name FROM cities WHERE country_id = ' + country_id);

    if ((await cities).length <= 0)
    {
        return {message: 'No encontramos ciudades asociadas al countryID brindado.'};
    }
    else
    {
        return await cities;
    }
}

// Obtiene los leads, según cantidad de filas y rango de fecha. 
async function getLeads(rows, dateFilter = null){

    let sql = 'SELECT leads.*, countries.country, cities.city, products.title as product_selected, reasons.reason as reason'; // DECLARAMOS LAS COLUMNAS QUE BUSCAMOS
    //SENTECIAMOS LAS TABLAS Y CONDICIONES DE DONDE SE OBTENDRÁN LAS COLUMNAS ANTERIORES.
    sql += " FROM (leads INNER JOIN countries ON leads.country_id = countries.id INNER JOIN cities ON leads.city_id = cities.id INNER JOIN products ON leads.product_selected_id = products.id INNER JOIN reasons ON leads.reason_id = reasons.id)"

    //AGREGAMOS LA CONDICIÓN 'where' QUE NOS FILTRARÁ LAS FECHAS, SI LES ES PASADA.
    if(dateFilter != null)
    {
        sql += ' WHERE date BETWEEN "'+ dateFilter.since +'" AND "'+ dateFilter.until+'"';
    }
    sql += ' ORDER BY date DESC LIMIT ' + rows;
    let leads = await query(sql);
    console.log(leads);
    return leads;
}

// Genera un nuevo Lead, según la información enviada por parámetro.
async function newLead(data)
{
    console.log('INIT NEW LEAD');
    
    // Obtenemos el día de hoy
    let today = new Date();
    today = today.toISOString().split('T')[0];

    // Normalizamos la información que ingresará en la base de datos.
    let lead = {
        firstname:              data.firstname,
        lastname:               data.lastname,
        email:                  data.email,
        phone:                  data.phone,
        gender:                 data.gender,
        country_id:             data.country_id,
        city_id:                data.city_id,
        product_selected_id:    data.product_selected_id,
        reason_id:              data.reason_id,
        date :                  today
    }

    // APLICAMOS FILTROS, VALIDACIÓNES Y FORMATOS.
    if(!validate(lead, ['firstname', 'lastname', 'email', 'country_id', 'city_id', 'product_selected_id']))
    {
        return {
            message: 'Falta información requerida para crear un nuevo Lead.',
            isOk: false
        };
    };

    if (isUndefined(lead.reason_id)) lead.reason_id = 1;

    formatUndefined(lead);

    if (lead.gender == 1) {
        lead.gender = 'Femenino';
    }else if(lead.gender == 2) {
        lead.gender = 'Masculino';
    }else{
        lead.gender = 'No especifica';
    }
    

    //#region Contrucción automática de SQL
    let sql = 'INSERT INTO leads ('

    let iterator = 1;

    for (const property in lead) {

        sql += property;

        if (iterator++ != Object.keys(lead).length) {
            sql += ', ';
        }
    }

    sql += ') VALUES (';


    iterator = 1;
    for (const property in lead) {
        if(lead[property] == undefined || lead[property] == null || lead[property] == '') lead[property] = 'NULL';
        sql += '"'+lead[property]+'"';

        if (iterator++ != Object.keys(lead).length) {
            sql += ', ';
        }
    }

    sql += ')';
    //#endregion
    
    console.log(sql);

    let response;
    response = query(sql).then(() => {return {message: 'Lead creado con éxtio.', isOk: true}});

    return await response;
}

// Determina si el valor es nulo o no definido,
// de las diferentes maneras que podría presentarse como tal.
function isUndefined(value)
{
    if(value == "" || value == null || value == undefined || value == "undefined" || value == NaN) return true
    return false
}

// Sirve para establecer NULL propiedadess sin definir o nulas.
// Evita errores en la construcción de sentencia automática.
function formatUndefined(data)
{
    for (const property in data) {
        if(isUndefined(data[property]))
        {
            data[property] = "NULL";
        }
    }
}

// Sirve para validar las propiedades sí o sí requeridas en la creación de un registro.
function validate(data, props)
{
    let validation = true;
    props.forEach(property => {
        if(isUndefined(data[property]))
        {
            console.log(data[property] + ' is not valid');
            validation = false;
            return;
        }
    });

    return validation;
}


module.exports = {
    newLead : newLead,
    getLeads : getLeads,
    getReasons : getReasons,
    getProducts : getProducts,
    getCountries : getCountries,
    getCities : getCities,
}