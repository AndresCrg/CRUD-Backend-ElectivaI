const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const { getUserQueryByEmail } = require('../helpers/standard-queries');

const login = async (req = request, res = response) => {
	const { correo_electronico, password } = req.body;
	try {
		const user = await getUserQueryByEmail(correo_electronico);
		if (!user) {
			return res.status(400).json({
				msg: 'Correo o contraseña incorrectos - Correo',
			});
		}

		if (user.estado === 'B' || user.estado === 'D') {
			return res.status(400).json({
				msg: 'Correo o contraseña incorrectos - estado = 0 ',
			});
		}

		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Correo o contraseña incorrectos - Password',
			});
		}

		let estado = user.estado;
		estado = estado === 'A' ? true : false;

		const token = await generateJWT(user.numero_documento);

		//Falta guardar el token en BD

		const { exp } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);

		const caducidad = new Date();
		caducidad.setTime(exp * 1000);

		res.json({
			estado,
			token,
			caducidad,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Error servidor!. Contacte al administador',
		});
	}
};

module.exports = {
	login,
};
