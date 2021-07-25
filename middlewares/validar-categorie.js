const { response } = require("express");
const { Categorie } = require("../models");


const validarIDCategorie = async(req, res = response, next) => {

    const idCategorie = req.header('idCategoria');
    
    if (!idCategorie) {
        return res.status(400).json({
            msg: 'No está el id de la categoria en la petición'
        });
    }
    

    try {
        const categorie = await Categorie.findById(idCategorie);

        if (!categorie) {
            return res.status(401).json({
                msg: 'Categoria ID no válido - la categoria no existe en DB'
            });
        }

        // Verificar si el usuario no ha sido eliminado
        if (!categorie.estado) {
            return res.status(401).json({
                msg: 'Categoria ID no válido - categoria con estado en false'
            });
        }

        req.categoria = categorie;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Categoria ID no válido'
        });
    }
}


module.exports = {
    validarIDCategorie
};

