const express = require('express')
const cors= require('cors');
const database = require('../db/connection');

class Server{

    constructor() {
        this.app= express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares();

        //Conexion bd
        this.dbConnection();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public')); //Directorio publico
        this.app.use(cors()); //CORS
        this.app.use(express.json());//Parseo y lectura del body
    }

    //Conectar base de datos
    async dbConnection() {
        try {
            await database.authenticate();
            console.log('Database ok');
        } catch (error) {
            throw new Error(error);
        }
    }
 
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){             
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }
}

module.exports= Server;