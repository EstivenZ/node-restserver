const {request ,response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet= (req= request, res= response) =>  {
    const {nombre= 'No name', q}= req.query;
    res.json({
        msg:'Hello get',
        q,
        nombre
    });
}

const usuariosPost= async (req= request, res= response) =>  { //Agregando un nuevo usuario
 
    const {nombre, correo, password, rol}= req.body;
    const usuario= new Usuario({nombre, correo, password, rol});

    //Encriptar contraseña
    const salt= bcryptjs.genSaltSync(); //Numero de vueltas, es 10 por defecto
    usuario.password= bcryptjs.hashSync(password, salt); //Encripta en una sola via

    //Guardar usuario en bd
    await usuario.save();

    //Ver respuesta
    res.json({
        usuario
    });
}

const usuariosPut=  (req, res) =>  {

    const {id}= req.params;
    res.status(201).json({
        msg:'Hello put',
        id
    });
}

const usuariosDelete= (req, res) =>  {
    res.json({
        msg:'Hello delete'
    });
}

module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}