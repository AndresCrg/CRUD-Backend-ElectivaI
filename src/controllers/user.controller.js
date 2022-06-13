const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const connection = require('../connection/connection-mysql');
const User = require('../models/user');
const { getUserQueryByDocument } = require('../helpers/standard-queries');

const createUser = (req = request, res = response) => {
	const body = req.body;
	const user = new User(
		body.nombre_completo,
		body.tipo_documento,
		body.numero_documento,
		body.nombre_departamento,
		body.fecha_fin_contrato,
		body.correo_electronico,
		body.cargo,
		body.password,
		body.estado
	);
	/*
	TODO - Validar si el correo ya existe
	*/

	//Encrptar la contraseña
	const salt = bcryptjs.genSaltSync();

	//Encriptarlo en una sola vía
	user.password = bcryptjs.hashSync(body.password, salt);

	connection.execute(
		'INSERT INTO `empleados` (`nombre_completo`, `tipo_documento`, `numero_documento`, `nombre_departamento`,`fecha_fin_contrato`, `correo_electronico`, `cargo`, `password`, `estado`) VALUES (?,?,?,?,?,?,?,?,?)',
		[
			user.nombre_completo,
			user.tipo_documento,
			user.numero_documento,
			user.nombre_departamento,
			user.fecha_fin_contrato,
			user.correo_electronico,
			user.cargo,
			user.password,
			user.estado,
		],
		(err, results, fields) => {
			console.log(user.password);
			res.json({
				msg: 'Usuario agregado correctamente!',
			});
		}
	);
};

const updateUser = (req = request, res = response) => {
	const { id, ...data } = req.body;
	res.json({
		msg: 'Usuario actualizado correctamente!',
		data,
	});
};

const getUser = (req = request, res = response) => {
	const doc = req.params.documento;
	connection.execute('SELECT * FROM `empleados` WHERE `numero_documento` = ?', [doc], (err, results, fields) => {
		//console.log(results[0]); // results contains rows returned by server
		const user = results[0];
		res.json({
			user,
		});
	});
};

const patchUSer = async (req = request, res = response) => {
	const documento = req.params.documento;
	const fecha_baja = req.params.fecha_baja;

	try {
		const user = await getUserQueryByDocument(documento);
		if (!user) {
			return res.status(400).json({
				msg: 'Empleado no existe!',
			});
		}

		const estate = 'D';
		documento.toString();
		fecha_baja.toString();

		connection.execute(
			'UPDATE `empleados` SET `estado` = ?, `fecha_fin_contrato` = ? WHERE `numero_documento` = ?',
			[estate, fecha_baja, documento],
			(err, results, fields) => {
				//console.log(results[0]); // results contains rows returned by server
				res.json({
					msg: 'Empleado borrado exitosamente!',
				});
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error en el servidor!',
		});
	}
};

module.exports = {
	createUser,
	updateUser,
	getUser,
	patchUSer,
};
