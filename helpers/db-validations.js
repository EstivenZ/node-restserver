const Usuario = require("../models/usuario");

const emailExiste = async (correo= '') => {
    let existeEmail= await Usuario.findOne({where: {correo: correo}});
    if(existeEmail){
       throw new Error(`El correo -${correo}- ya esta registrado`)
    }
}

const existeUsuarioPorId= async (id) => {
    const existeUsuario= await Usuario.findByPk(id);
    if(!existeUsuario){
       throw new Error(`El id -${id}- no esta registrado`)
    }
}

module.exports= {
    emailExiste,
    existeUsuarioPorId
}