const { response } = require("express");
const { ObjectId } = require("mongoose").Types; 

const { Usuario,
        Categorie,
        Role,
        Product } = require("../models");

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const searchUsers = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        const user = await Usuario.findById(termino);
        return res.json( {
            results: (user)? [user] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const users = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }] 
    });

    res.json({
        results: users
    });
}

const searchProducts = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        const product = await Product.findById(termino).populate('categoria','nombre');
        return res.json( {
            results: (product)? [product] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const products = await Product.find({ 
        $or: [{ nombre: regex }],
        $and: [{ estado: true }] 
    }).populate('categoria','nombre');

    res.json({
        results: products
    });
}

const searchCategories = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        const categorie = await Categorie.findById(termino);
        return res.json( {
            results: (categorie)? [categorie] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const categories = await Categorie.find({ 
        $or: [{ nombre: regex }],
        $and: [{ estado: true }] 
    });

    res.json({
        results: categories
    });
}



const search = async(req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            searchUsers(termino, res);
            break;
        case 'categorias':
            searchCategories(termino, res);
            break;
        case 'productos':
            searchProducts(termino, res);
            break;
        case 'roles':
            break;
        default:
            res.status(500).json({
                msg: 'No se ha implementado esta búsqueda'
            });
    }

};


module.exports = {
    search
};