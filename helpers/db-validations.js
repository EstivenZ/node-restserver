const Usuario = require("../models/usuario");

const emailExiste = async (correo= '') => {
    let existeEmail= await Usuario.findOne({where: {correo: correo}});
    if(existeEmail){
       throw new Error(`El correo -${correo}- ya esta registrado`)
    }
}

module.exports= {
    emailExiste
}