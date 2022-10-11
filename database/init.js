// DATABASE SCRIPT HELPER 
// Se utiliza este script para exportar funciones estandarizadas
// al resto de scripts que gestionan la estructura de database.

var mysql = require('mysql');
var connection;

/*
## Variable de Configuración de base de datos.
## Reemplace los datos correspondientes para conectasrse a su base de datos.
*/

let dataConnection = {
    host: 'localhost',
    user: 'root',
    password: '',
}


// Sirve para conectar a la base de datos y a una tabla.
// Retorna dicha conexión.
function startConnection(database = 'test_node_js')
{
    if(database != null){
        dataConnection.database = database;
    }

    connection = mysql.createConnection(dataConnection);

    connection.connect(((error) => { queryHandle(error, 'Conexión a Mysql exitosa. ' + (database !=null ? 'Conexión a la tabla '+dataConnection.database+' exitosa. ':'')) }));
    
    return connection;
}

// Sirve para manejar los resultados de las query, sin escribir tanto código.
function queryHandle(error, okMessage=null){
    if(error){
        throw error
    }
    else if(okMessage != null){console.log(okMessage)}
}

// Exportamos ciertos elementos del script, para ser reutilizados en sus importaciones.
module.exports = {
    startConnection: startConnection,
    queryHandle : queryHandle
}