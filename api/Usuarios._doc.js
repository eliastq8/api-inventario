/**
 * @api {get} /usuarios Obtener todos los usuarios
 * @apiName GetUsuarios
 * @apiGroup Usuarios
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/usuarios
 * @apiSuccess {Object[]} data Lista de usuarios.
 * @apiSuccess {String} data.id ID del usuario.
 * @apiSuccess {String} data.nombre Nombre del usuario.
 * @apiSuccess {String} data.email Correo electrónico del usuario.
 * @apiSuccess {String} data.rol Rol del usuario (ejemplo: admin, cliente, operador).
 * @apiSuccess {Number} total Total de usuarios.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "usuario1",
 *           "nombre": "Juan Pérez",
 *           "email": "juan.perez@example.com",
 *           "rol": "admin"
 *         },
 *         {
 *           "id": "usuario2",
 *           "nombre": "María López",
 *           "email": "maria.lopez@example.com",
 *           "rol": "cliente"
 *         }
 *       ],
 *       "total": 2
 *     }
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /usuarios/:id Obtener un usuario por ID
 * @apiName GetUsuarioById
 * @apiGroup Usuarios
 *
 * @apiParam {String} id ID del usuario.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/usuarios/usuario1
 * @apiSuccess {String} id ID del usuario.
 * @apiSuccess {String} nombre Nombre del usuario.
 * @apiSuccess {String} email Correo electrónico del usuario.
 * @apiSuccess {String} rol Rol del usuario (ejemplo: admin, cliente, operador).
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "usuario1",
 *       "nombre": "Juan Pérez",
 *       "email": "juan.perez@example.com",
 *       "rol": "admin"
 *     }
 *
 * @apiError (Error 404) NotFound Usuario no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
