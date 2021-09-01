const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => { //next: Se llama si el middleware pasa para que continue con el siguiente

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

module.exports= {
    validarCampos
}