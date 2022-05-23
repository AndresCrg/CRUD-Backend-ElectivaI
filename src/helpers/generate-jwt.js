const jwt = require('jsonwebtoken');

const generateJWT = (numero_documento) => {
	return new Promise((resolve, reject) => {
		const payload = { numero_documento };

		jwt.sign(
			payload,
			process.env.SECRETEORPRIVATEKEY,
			{
				expiresIn: '1h',
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject('No se puedo generar Token!');
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generateJWT,
};
