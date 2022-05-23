const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createUser, updateUser, getUser, patchUSer } = require('../controllers/user.controller');

const router = Router();

router.post(
	'/',
	[
		validateJWT,
		check('nombre_completo', 'El nombre es obligatorio!').not().isEmpty(),
		check('tipo_documento', 'No es un tipo de documento valido!').isIn(['CC', 'TI', 'CE', 'PA']),
		check('numero_documento', 'El número de documento es obligatorio!').not().isEmpty(),
		check('nombre_departamento', 'El nombre del departamento es obligatorio!').not().isEmpty(),
		check('fecha_fin_contrato', 'Debe ingresar una fecha válida!').isDate(),
		check('correo_electronico', 'El correo electrónico no es valido!').isEmail(),
		check('cargo', 'El cargo es obligatorio!').not().isEmpty(),
		check('password', 'La contraseña es obligatoria!').not().isEmpty(),
		check('estado', 'No es un tipo de estado valido!').isIn(['A', 'B', 'D']),
		validateFields,
	],
	createUser
);
router.put('/:id', updateUser);
router.get('/:documento', [validateJWT, check('documento', 'El documento es obligatorio!').not().isEmpty(), validateFields], getUser);
router.patch(
	'/:documento/:fecha_baja',
	[
		validateJWT,
		check('documento', 'El número de documento es obligatorio!').not().isEmpty(),
		check('fecha_baja', 'Debe ingresar una fecha válida!').isDate(),
	],
	patchUSer
);

module.exports = router;
