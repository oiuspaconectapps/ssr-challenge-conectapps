// DATABASE SETUP
// Se utiliza para generar la estructura y la información mínima
// para poner en marcha el desarrollo.

const database = require('./init.js');

let connection = database.startConnection(null);
let queryHandle = database.queryHandle;


// Crea la base de datos, en caso de ya no estarlo.
connection.query(
    'CREATE DATABASE IF NOT EXISTS test_node_js',
    (error) => queryHandle(error, 'La base de datos se encuentra en linea.')
);

// Lo 'setTimeout', se utilizan para dar delay entre las operaciones,
// así evitar fallos de ejecución en estructuras aún no creadas.

// Conectamos a la tabla asignada por defecto.
setTimeout(() => {
    connection = database.startConnection();
}, 200);

// Creamos las tablas a través de sentencias SQL.
setTimeout(() => {    
    connection.query(
        "CREATE TABLE IF NOT EXISTS countries ( id INT(3) NOT NULL AUTO_INCREMENT , country VARCHAR(20) NOT NULL, PRIMARY KEY (id)) ENGINE = InnoDB;",
        (error) => queryHandle(error, 'Tabla countries creada con éxito.')
    );
    
    connection.query(
        "CREATE TABLE IF NOT EXISTS cities ( id INT(7) NOT NULL AUTO_INCREMENT , city VARCHAR(20) NOT NULL , country_id INT(3) NOT NULL , PRIMARY KEY (id), FOREIGN KEY (country_id) REFERENCES countries(id)) ENGINE = InnoDB;",
        (error) => queryHandle(error, 'Tabla cities creada con éxito.')
    );
    
    connection.query(
        "CREATE TABLE IF NOT EXISTS products ( id INT(10) NOT NULL AUTO_INCREMENT , title VARCHAR(50) NOT NULL , PRIMARY KEY (id)) ENGINE = InnoDB;",
        (error) => queryHandle(error, 'Tabla products creada con éxito.')
    
        );
    connection.query(
        "CREATE TABLE IF NOT EXISTS reasons ( id INT(3) NOT NULL AUTO_INCREMENT , reason VARCHAR(255) NOT NULL , PRIMARY KEY (id)) ENGINE = InnoDB;",
        (error) => queryHandle(error, 'Tabla reasons creada con éxito.')
    );
    
    connection.query(
        "CREATE TABLE IF NOT EXISTS leads ( id INT(10) NOT NULL AUTO_INCREMENT , firstname VARCHAR(30) NOT NULL , lastname VARCHAR(30) NOT NULL , email VARCHAR(150) NOT NULL , phone VARCHAR(30) , gender VARCHAR(30) , country_id INT(3) NOT NULL , city_id INT(7) NOT NULL , product_selected_id INT(7) NOT NULL , reason_id INT(3), date DATE NOT NULL , PRIMARY KEY (id), FOREIGN KEY (city_id) REFERENCES cities(id), FOREIGN KEY (country_id) REFERENCES countries(id), FOREIGN KEY (product_selected_id) REFERENCES products(id), FOREIGN KEY (reason_id) REFERENCES reasons(id)) ENGINE = InnoDB;",
        (error) => queryHandle(error, 'Tabla leads creada con éxito.')
    );

    // Al terminar ejecutamos los seeders.
    setTimeout(() => {
        seeders();
    }, 500);
    
},1000);


// Inserta información en las tablas que antes establecimos.
function seeders()
{
    /// PAÍSES
    let countries = ['Argentina', 'Paraguay', 'Uruguay', 'Chile', 'Bolivia', 'Brasil']
    countries.forEach(country => {
        connection.query("INSERT INTO countries (country) VALUES ('"+country+"')");
    });
    console.log('-Insertando datos de países... OK');

    /// CIUDADES
    let cities = [
        {
            country_id: 1,
            name: 'Mar del Plata'
        },
        {
            country_id: 1,
            name: 'Villa Carlos Paz'
        },
        {
            country_id: 2,
            name: 'Asunción'
        },
        {
            country_id: 3,
            name: 'Montevideo'
        },
        {
            country_id: 4,
            name: 'Santiago de chile'
        },
        {
            country_id: 5,
            name: 'Sucre'
        },
        {
            country_id: 6,
            name: 'Manaos'
        }
    ];
    cities.forEach(city => {
        connection.query("INSERT INTO cities (city, country_id) VALUES ('"+city.name+"', '"+city.country_id+"')");
    });
    console.log('-Insertando datos de ciudades... OK');

    /// PRODUCTOS
    let products = ['Diseño web', 'Optimización de alojamiento', 'Email Marketing'];
    products.forEach(product => {
        connection.query("INSERT INTO products (title) VALUES ('"+product+"')");
    });
    console.log('-Insertando datos de productos... OK');

    /// MOTIVOS DE CONSULTAS<<
    let reasons = ['No especifica', 'Contactar con un asesor', 'Solicitud de presupuesto', 'Necesito realizar un reclamo'];
    reasons.forEach(reason => {
        connection.query("INSERT INTO reasons (reason) VALUES ('"+reason+"')");
    });
    console.log('-Insertando datos de motivos de consultas... OK');
    

    /// LEADS
    let leads = [
        {
            firstname: 'Gustavo',
            lastname: 'Vanegas',
            emai: "3mail@hotmail.com",
            phone: 1132446689,
            gender: "No especifica",
            country_id: 2,
            city_id: 3,
            product_selected_id:3,
            reason_id:1,
            date: '2021-04-10'
        },
        {
            firstname: 'María',
            lastname: 'Gutierrez',
            emai: "corredo@gmail.com",
            phone: 1122446789,
            gender: "Femenino",
            country_id: 3,
            city_id: 4,
            product_selected_id:2,
            reason_id:3,
            date: '2022-01-25'
        },
        {
            firstname: 'Julián',
            lastname: 'Vanegas',
            emai: "mai1l@hotmail.com",
            phone: 1132444689,
            gender: "Masculino",
            country_id: 2,
            city_id: 3,
            product_selected_id:1,
            reason_id:1,
            date: '2022-09-08'
        },
        {
            firstname: 'Josefina',
            lastname: 'Gutierrez',
            emai: "correo444@gmail.com",
            phone: 1122446682,
            gender: "Masculino",
            country_id: 1,
            city_id: 2,
            product_selected_id:3,
            reason_id:3,
            date: '2022-09-30'
        },
        {
            firstname: 'Valentín',
            lastname: 'Vanegas',
            emai: "valen@hotmail.com",
            phone: 1122441689,
            gender: "Masculino",
            country_id: 2,
            city_id: 3,
            product_selected_id:1,
            reason_id:1,
            date: '2022-10-05'
        },
        {
        firstname: 'Jessica',
        lastname: 'Gutierrez',
        emai: "correo@gmail.com",
        phone: 1122446689,
        gender: "Femenino",
        country_id: 1,
        city_id: 1,
        product_selected_id:2,
        reason_id:2,
        date: '2022-04-10'
        },
    ];

    leads.forEach(lead => {
        connection.query("INSERT INTO leads (firstname, lastname, email, phone, gender, country_id, city_id, product_selected_id, reason_id, date) VALUES ('"+lead.firstname+"','"+lead.lastname+"','"+lead.emai+"','"+lead.phone+"','"+lead.gender+"','"+lead.country_id+"','"+lead.city_id+"','"+lead.product_selected_id+"','"+lead.reason_id+"','"+lead.date+"')");
    });
    console.log('-Insertando datos de Leads... OK');
}

setTimeout(()=>{
    process.exit();
},2500);