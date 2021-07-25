const { Router } = require('express');
const { check } = require('express-validator');
const { createCategorie, getCategories, getCategorieById, updateCategorie, deleteCategorie } = require('../controllers/categories');
const { categorieIdExist } = require('../helpers/db-validators');

const { validarCampos,
    validarJWT,
    isAdminRole,
    hasRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', getCategories);


//Obtener una categoría po id - publico
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categorieIdExist),
    validarCampos
],getCategorieById);


//Crear categoría - privado -cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],createCategorie);


//Actualizar categoría - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categorieIdExist),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],updateCategorie);


//Borrar categoría - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categorieIdExist),
    isAdminRole,
    validarCampos
], deleteCategorie);


module.exports = router
