const { response } = require('express');
const { request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
	const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No se encontró token en la petición'
        })
    }

    try {
        jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
       	next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido!'
        })
    }
};

module.exports = {
	validateJWT,
};
