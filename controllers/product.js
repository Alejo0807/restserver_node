const { response } = require("express");
const { Product } = require("../models");


const getProducts = async(req, res = response) => {
    
    try {
        const { limit = 5, from = 0 } = req.query;

        const query = {estado:true}
    
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('categoria')
                .populate('usuario')
        ]);

        res.json({
            total,
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}

const getProductById = async(req, res = response) => {
    
    try {
        const { id } = req.params;
    
        const product = await Product.findById(id)
                            .populate('usuario')
                            .populate('categoria');

        res.json({
            product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}



const createProduct = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Product.findOne({nombre})
    try {
        if (productoDB) {
           return res.status(400).json({
               msg: `El producto ${nombre} ya existe`
           });
        }
    
        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id,
            categoria: req.categoria._id
        }
    
        const product = new Product(data);
        await product.save();
        
        res.json({
            product
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}


const updateProduct = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const productoaDB = await Product.findOne({nombre})
    const { id } = req.params;

    try {
        if (productoaDB) {
            return res.status(400).json({
                msg: `La categoria ${nombre} ya existe`
            });
        }

        const data = {
            nombre,
            usuario: req.usuario._id,
            categoria: req.categoria._id
        };

        const product = await Product.findByIdAndUpdate(id, data);
        const productUpdated = await Product.findById(id);

        res.json({
            product,
            productUpdated
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}

const deleteProduct = async(req, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, {estado: false});
        const usuarioAutenticado = req.usuario;
        res.json({
            product
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

