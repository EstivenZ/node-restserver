const {request ,response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet= async (req= request, res= response) =>  {
    
    /* const usuarios= await Usuario.findAll();
    const {count: Total_Usuarios}= await Usuario.findAndCountAll(); */

    //Mas rapido juntar todas las promesas
    const [usuarios, {count: Total_Usuarios} ]= await Promise.all([
        Usuario.findAll(),
        Usuario.findAndCountAll()
    ]) 

    res.json({
        Total_Usuarios,
        usuarios
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

const usuariosPut=  async (req, res= response) =>  {

    const {id}= req.params;
    const data= req.body;

    //TODO validar contra la bd 
    if(data.password){
        //Encriptar contraseña
        const salt= bcryptjs.genSaltSync(); //Numero de vueltas, es 10 por defecto
        data.password= bcryptjs.hashSync(data.password, salt); //Encripta en una sola via
    } 
    await Usuario.update({password: data.password}, { //Campos a editar
        where: {
            id: id //Condicion de busqueda
        } 
    });
 
    res.status(201).json({
        msg:`Datos actualizados del usuario ${id}`
    });
}

const usuariosDelete= async (req, res) =>  {

    const {id} = req.params;
    
    await Usuario.destroy({ 
        where: {
            id: id //Condicion de busqueda
        } 
    });

    res.json({
        msg:'Usuario eliminado',
        id
    });
}

module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}