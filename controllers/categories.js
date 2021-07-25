const { response } = require("express")
const { Categorie } = require('../models')

const getCategories = async(req, res = response) => {
    
    try {
        const { limit = 5, from = 0 } = req.query;

        const query = {estado:true}
    
        const [total, categories] = await Promise.all([
            Categorie.countDocuments(query),
            Categorie.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('usuario')
        ]);

        res.json({
            total,
            categories
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}

const getCategorieById = async(req, res = response) => {
    
    try {
        const { id } = req.params;
    
        const categorie = await Categorie.findById(id).populate('usuario');

        res.json({
            categorie
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}



const createCategorie = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categorie.findOne({nombre})
    try {
        if (categoriaDB) {
           return res.status(400).json({
               msg: `La categoria ${nombre} ya existe`
           });
        }
    
        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }
    
        const categorie = new Categorie(data);
        await categorie.save();
        
        res.json({
            categorie
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}


const updateCategorie = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categorie.findOne({nombre})
    const { id } = req.params;

    try {
        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${nombre} ya existe`
            });
        }

        const data = {
            nombre,
            usuario: req.usuario._id
        };

        const categorie = await Categorie.findByIdAndUpdate(id, data);
        const categorieUpdated = await Categorie.findById(id);

        res.json({
            categorie,
            categorieUpdated
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}

const deleteCategorie = async(req, res = response) => {
    try {
        const { id } = req.params;

        const categorie = await Categorie.findByIdAndUpdate(id, {estado: false});
        const usuarioAutenticado = req.usuario;
        res.json({
            categorie
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }
}

module.exports = {
    getCategories,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorie
}