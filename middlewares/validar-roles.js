const { response } = require("express")

const isAdminRole = (req, res = response, next) => {


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador`
        });
    }

    next();
}

const hasRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            })
        }
        console.log(req.usuario.rol);
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        
        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}


