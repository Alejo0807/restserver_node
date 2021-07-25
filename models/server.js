const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categories: '/api/categorias',
            products: '/api/productos',
            search: '/api/buscar'
        };
        

        //Conectar a base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parse body
        this.app.use(express.json());

        // directorio publico
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.usuarios, require('../routes/user'));
        this.app.use(this.path.categories, require('../routes/categories'));
        this.app.use(this.path.products, require('../routes/products'));
        this.app.use(this.path.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}


module.exports = Server;