const { Categorie, Product } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en BD`);
    }
};

const emailExiste = async(correo = '') => {
    const emailExistente = await Usuario.findOne({correo});
    if (emailExistente) {
        throw new Error(`El correo ${ correo } ya está registrado en BD`);
    }
};

const usuarioIdExiste = async(id) => {
    const usuarioExiste = await Usuario.findById(id);
    if (!usuarioExiste) {
        throw new Error(`El id ${ id } no existe`);
    }
};

const categorieIdExist = async(id) => {
    const categorieExist = await Categorie.findById(id);
    if (!categorieExist) {
        throw new Error(`El id ${ id } no existe`);
    }
};

const productIdExist = async(id) => {
    const productExist = await Product.findById(id);
    if (!productExist) {
        throw new Error(`El id ${ id } no existe`);
    }
};

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioIdExiste,
    categorieIdExist,
    productIdExist
};