const { v4: uuidv4 } = require('uuid');

const path = require('path');


const uploadFile = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {


    return new Promise ((resolve, reject) => {
        const { archivo } = files;
        const nombreArchivo = archivo.name.split('.');
        const extension = nombreArchivo[nombreArchivo.length - 1];
        
        if (!extensionesValidas.includes(extension)) {
            reject(`La extensión ${ extension } no es válida`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/',carpeta,  nombreTemp);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) return reject(err);

            resolve(nombreTemp);
        });
    });

    

}


module.exports = {
    uploadFile
};