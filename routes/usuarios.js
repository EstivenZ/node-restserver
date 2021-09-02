const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validations');
const { validarCampos } = require('../middlewares/validar-campos');
const router= Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPut);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste), //Verificar si el correo existe
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('password', 'El password debe contener minimos 5 caracteres').isLength({min:5}),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos //Si pasa ejecuta el controlador, de lo contrario no se ejecutaria
] ,usuariosPost);

router.delete('/:id', [
    check('id').custom(existeUsuarioPorId),
    validarCampos 
], usuariosDelete);

module.exports= router;
