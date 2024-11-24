/**
 * @api {get} /ventas Obtener todas las ventas
 * @apiName GetVentas
 * @apiGroup Ventas
 *
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/ventas
 * @apiSuccess {Object[]} data Lista de ventas.
 * @apiSuccess {String} data.id ID de la venta.
 * @apiSuccess {String} data.idUsuario ID del usuario que realizó la venta.
 * @apiSuccess {String} data.idProducto ID del producto vendido.
 * @apiSuccess {Number} data.cantidad Cantidad de productos vendidos.
 * @apiSuccess {Timestamp} data.fecha Fecha de la venta.
 * @apiSuccess {Number} total Total de ventas.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "venta1",
 *           "idUsuario": "usuario1",
 *           "idProducto": "producto1",
 *           "cantidad": 3,
 *           "fecha": "2024-11-23T12:00:00.000Z"
 *         }
 *       ],
 *       "total": 1
 *     }
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /ventas/:id Obtener una venta por ID
 * @apiName GetVentaById
 * @apiGroup Ventas
 *
 * @apiParam {String} id ID de la venta.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/ventas/venta1
 * @apiSuccess {String} id ID de la venta.
 * @apiSuccess {String} idUsuario ID del usuario que realizó la venta.
 * @apiSuccess {String} idProducto ID del producto vendido.
 * @apiSuccess {Number} cantidad Cantidad de productos vendidos.
 * @apiSuccess {Timestamp} fecha Fecha de la venta.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "venta1",
 *       "idUsuario": "usuario1",
 *       "idProducto": "producto1",
 *       "cantidad": 3,
 *       "fecha": "2024-11-23T12:00:00.000Z"
 *     }
 *
 * @apiError (Error 404) NotFound Venta no encontrada.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {post} /ventas Crear una nueva venta
 * @apiName CreateVenta
 * @apiGroup Ventas
 *
 * @apiBody {String} idUsuario ID del usuario que realiza la venta.
 * @apiBody {String} idProducto ID del producto vendido.
 * @apiBody {Number} cantidad Cantidad de productos vendidos (debe ser mayor a 0).
 * @apiExample {curl} Ruta de ejemplo:
 *     curl -X POST http://localhost:3000/ventas
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "idUsuario": "usuario1",
 *       "idProducto": "producto1",
 *       "cantidad": 3
 *     }
 *
 * @apiSuccess {String} id ID de la nueva venta.
 * @apiSuccess {String} idUsuario ID del usuario que realizó la venta.
 * @apiSuccess {String} idProducto ID del producto vendido.
 * @apiSuccess {Number} cantidad Cantidad de productos vendidos.
 * @apiSuccess {Timestamp} fecha Fecha de la venta.
 * @apiSuccessExample {json} Ejemplo de respuesta
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "nuevaVenta",
 *       "idUsuario": "usuario1",
 *       "idProducto": "producto1",
 *       "cantidad": 3,
 *       "fecha": "2024-11-23T12:00:00.000Z"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios o cantidad inválida.
 * @apiError (Error 404) NotFound Usuario o producto no encontrados.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
