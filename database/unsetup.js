// DATABASE UNSETUP
// Se utiliza para eliminar la estructura e información generada.

const database = require('./init.js');

let connection = database.startConnection();
let queryHandle = database.queryHandle;

// Eliminamos la tabla a través de una sentencia Mysql
connection.query('DROP DATABASE IF EXISTS test_node_js', (error) => { queryHandle(error, 'TABLA ELIMINADA CORRECTAMENTE') });

setTimeout(()=>{
    process.exit();
},1000);