const express = require('express')
const cors= require('cors')

class Server{

    constructor() {
        this.app= express();
        this.port= process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public')); //Directorio publico
        this.app.use(cors()); //CORS
        this.app.use(express.json());//Parseo y lectura del body
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