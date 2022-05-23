require('dotenv').config();
const express = require('express');
const connection = require('../connection/connection-mysql');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.SERVER_PORT;
		connection;
		this.usersPath = '/apiRest/Usuarios';
		this.authPath = '/apiRest/Acceso';
		this.middleware();
		this.routes();
	}

	middleware() {
		//Lectura y parseo de JSON
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.authPath, require('../routes/auth'));
		this.app.use(this.usersPath, require('../routes/user-routes'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Example app listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
