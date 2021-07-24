const { Router } = require('express');
const { check } = require('express-validator')

const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/user');
const {esRoleValido,
        usuarioIdExiste,
        emailExiste} = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        isAdminRole,
        hasRole } = require('../middlewares');



const router = Router();


router.get('/', usersGet);

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(usuarioIdExiste),
        validarCampos
],usersPut)

router.post('/', [
        check('correo', 'El correo no es válido').isEmail(),
        check('nombre', 'El nombre es obligatorio ').not().isEmpty(),
        check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('correo').custom(emailExiste),
        check('rol').custom(esRoleValido),
        validarCampos
], usersPost);

router.delete('/:id',[
        validarJWT,
        // isAdminRole,
        hasRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(usuarioIdExiste),
        validarCampos
], usersDelete);

router.patch('/', usersPatch);


module.exports = router;