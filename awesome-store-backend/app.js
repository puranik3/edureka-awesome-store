const express = require( 'express' );
const mysql = require( 'mysql' );
const cors = require( 'cors' );

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'storekeeper',
    password: 'storekeeper123',
    database: 'store'
});

connection.connect(function( error ) {
    if( error ) {
        console.log( error.message );
        throw error;
    }

    console.log( 'connected to DB' );
});

const app = express();

app.use( cors() ); // enables any server / file to access this servers endpoints

app.get( '/products', function( req, res ) {
    const query = 'SELECT * FROM products;'

    connection.query(query, function( error, products ) {
        if( error ) {
            res.json({
                message: error.message
            });
            return;
        }

        res.json( products );
    });
});

app.listen( 3000 );