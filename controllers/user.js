const {response, request} = require('express');

const usersGet = (req = request, res = response) => {

    const {nombre = '', apellido = ''} = req.query;

    res.json({
        msg: 'get API - controlador',
        nombre,
        apellido
    });
}

const usersPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch

}