/**
 * @api {get} /productos Obtener todos los productos
 * @apiName GetProductos
 * @apiGroup Productos
 *
 * @apiQuery {String} [nombre] Filtrar productos por nombre.
 * @apiQuery {Number} [cantidad] Filtrar productos por cantidad exacta.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/productos?nombre=manzana&cantidad=10
 * @apiSuccess {Object[]} data Lista de productos.
 * @apiSuccess {String} data.id ID del producto.
 * @apiSuccess {String} data.nombre Nombre del producto.
 * @apiSuccess {Number} data.cantidad Cantidad disponible del producto.
 * @apiSuccess {String} data.descripcion Descripción del producto.
 * @apiSuccess {Number} total Total de productos encontrados.
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [
 *         {
 *           "id": "producto1",
 *           "nombre": "manzana",
 *           "cantidad": 10,
 *           "descripcion": "Fruta fresca y jugosa"
 *         },
 *         {
 *           "id": "producto2",
 *           "nombre": "naranja",
 *           "cantidad": 5,
 *           "descripcion": "Cítrico rico en vitamina C"
 *         }
 *       ],
 *       "total": 2
 *     }
 *
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {get} /productos/:id Obtener un producto por ID
 * @apiName GetProductoById
 * @apiGroup Productos
 *
 * @apiParam {String} id ID del producto.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/productos/producto1
 * @apiSuccess {String} id ID del producto.
 * @apiSuccess {String} nombre Nombre del producto.
 * @apiSuccess {Number} cantidad Cantidad disponible del producto.
 * @apiSuccess {String} descripcion Descripción del producto.
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "producto1",
 *       "nombre": "manzana",
 *       "cantidad": 10,
 *       "descripcion": "Fruta fresca y jugosa"
 *     }
 *
 * @apiError (Error 404) NotFound Producto no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {post} /productos Crear un nuevo producto
 * @apiName CreateProducto
 * @apiGroup Productos
 *
 * @apiBody {String} [id] ID personalizado del producto (opcional).
 * @apiBody {String} nombre Nombre del producto.
 * @apiBody {Number} cantidad Cantidad disponible del producto.
 * @apiBody {String} descripcion Descripción del producto.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X POST http://localhost:3000/productos
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "nombre": "manzana",
 *       "cantidad": 10,
 *       "descripcion": "Fruta fresca y jugosa"
 *     }
 * @apiSuccess {String} id ID del producto creado.
 * @apiSuccess {String} nombre Nombre del producto.
 * @apiSuccess {Number} cantidad Cantidad disponible del producto.
 * @apiSuccess {String} descripcion Descripción del producto.
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "producto1",
 *       "nombre": "manzana",
 *       "cantidad": 10,
 *       "descripcion": "Fruta fresca y jugosa"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {patch} /productos/:id Actualizar un producto por ID
 * @apiName UpdateProducto
 * @apiGroup Productos
 *
 * @apiParam {String} id ID del producto.
 * @apiBody {String} nombre Nombre del producto.
 * @apiBody {Number} cantidad Cantidad disponible del producto.
 * @apiBody {String} descripcion Descripción del producto.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X PATCH http://localhost:3000/productos/producto1
 * @apiExample {json} Body de ejemplo:
 *     {
 *       "nombre": "naranja",
 *       "cantidad": 15,
 *       "descripcion": "Cítrico dulce y jugoso"
 *     }
 * @apiSuccess {String} id ID del producto actualizado.
 * @apiSuccess {String} nombre Nombre del producto.
 * @apiSuccess {Number} cantidad Cantidad disponible del producto.
 * @apiSuccess {String} descripcion Descripción del producto.
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "producto1",
 *       "nombre": "naranja",
 *       "cantidad": 15,
 *       "descripcion": "Cítrico dulce y jugoso"
 *     }
 *
 * @apiError (Error 400) BadRequest Faltan datos obligatorios.
 * @apiError (Error 404) NotFound Producto no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */

/**
 * @api {delete} /productos/:id Eliminar un producto por ID
 * @apiName DeleteProducto
 * @apiGroup Productos
 *
 * @apiParam {String} id ID del producto.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X DELETE http://localhost:3000/productos/producto1
 * @apiSuccess {String} message Mensaje de confirmación de eliminación.
 * @apiSuccessExample {json} Ejemplo de respuesta:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Producto eliminado"
 *     }
 *
 * @apiError (Error 404) NotFound Producto no encontrado.
 * @apiError (Error 500) InternalServerError Error interno del servidor.
 */
