class User {
	constructor(nombre_completo, tipo_documento, numero_documento, nombre_departamento, fecha_fin_contrato, correo_electronico, cargo, password, estado) {
		this.nombre_completo = nombre_completo;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.nombre_departamento = nombre_departamento;
		this.fecha_fin_contrato = fecha_fin_contrato;
		this.correo_electronico = correo_electronico;
		this.cargo = cargo;
		this.password = password;
		this.estado = estado;
	}
}

module.exports = User;
