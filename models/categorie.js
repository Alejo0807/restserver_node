const { Schema, model } = require('mongoose');


const CategorieSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategorieSchema.methods.toJSON = function() {
    const { __v, estado, ...categorie} = this.toObject();
    return categorie;
}

module.exports = model( 'Categoria', CategorieSchema );