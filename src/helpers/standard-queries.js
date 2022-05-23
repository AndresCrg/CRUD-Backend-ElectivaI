const connection = require('../connection/connection-mysql');

const getUserQueryByEmail = (correo_electronico) => {
	return new Promise((resolve, reject) => {
		connection.execute('SELECT * FROM `empleados` WHERE `correo_electronico` = ?', [correo_electronico], (err, results, fields) => {
			//console.log(results[0]); // results contains rows returned by server
			if (!results) {
				reject('No se encontraron datos');
			} else {
				resolve(results[0]);
			}
		});
	});
};

const getUserQueryByDocument = (numero_documento) => {
	return new Promise((resolve, reject) => {
		connection.execute('SELECT * FROM `empleados` WHERE `numero_documento` = ?', [numero_documento], (err, results, fields) => {
			//console.log(results[0]); // results contains rows returned by server
			if (!results) {
				reject('No se encontraron datos');
			} else {
				resolve(results[0]);
			}
		});
	});
};

module.exports = {
	getUserQueryByEmail,
	getUserQueryByDocument,
};
