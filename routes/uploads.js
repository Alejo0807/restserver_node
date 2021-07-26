const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFiles, updateFile, updateImage, showImage, updateImageCloudinary } = require("../controllers/uploads");
const { ableCollections } = require("../helpers");
const { validarCampos, validateUploadFile } = require("../middlewares");

const router = Router();

router.post('/', validateUploadFile ,uploadFiles);

router.put('/:coleccion/:id',[
    validateUploadFile,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => ableCollections(c, ['usuarios', 'productos'])),
    validarCampos
],updateImageCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => ableCollections(c, ['usuarios', 'productos'])),
    validarCampos
],showImage);

module.exports = router;


