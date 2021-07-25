const { Router } = require('express');
const { check } = require('express-validator');

const { getProducts, getProductById, updateProduct, deleteProduct, createProduct } = require('../controllers/product');
const { productIdExist } = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        isAdminRole,
        hasRole } = require('../middlewares');
const { validarIDCategorie } = require('../middlewares/validar-categorie');

const router = Router();

//Obtener todos los productos - publico
router.get('/', getProducts);


//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productIdExist),
    validarCampos
],getProductById);


//Crear producto - privado -cualquier persona con token válido
router.post('/', [
    validarJWT,
    validarIDCategorie,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],createProduct);


//Actualizar producto - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    validarIDCategorie,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productIdExist),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],updateProduct);


//Borrar producto - Admin
router.delete('/:id', [
    validarJWT,
    validarIDCategorie, 
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productIdExist),
    isAdminRole,
    validarCampos
], deleteProduct);


module.exports = router;