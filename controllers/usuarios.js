const {request ,response} = require('express')

const usuariosGet= (req= request, res= response) =>  {
    const {nombre= 'No name', q}= req.query;
    res.json({
        msg:'Hello get',
        q,
        nombre
    });
}

const usuariosPost= (req, res) =>  {
    res.json({
        msg:'Hello post'
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