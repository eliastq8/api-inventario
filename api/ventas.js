const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Ruta para obtener todas las ventas
// Ruta para obtener todas las ventas con filtros opcionales
router.get('/', async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        let consulta = db.collection('ventas');

        if (fechaInicio && fechaFin) {
            const inicioTimestamp = admin.firestore.Timestamp.fromDate(new Date(fechaInicio));
            const finTimestamp = admin.firestore.Timestamp.fromDate(new Date(fechaFin));
            consulta = consulta.where('fecha', '>=', inicioTimestamp).where('fecha', '<=', finTimestamp);
        }

        const snapshot = await consulta.get();
        const ventas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ data: ventas, total: ventas.length });
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las ventas: ${error.message}` });
    }
});

// Ruta para obtener una venta por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('ventas').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la venta: ${error.message}` });
    }
});

// Crear una nueva venta sin restricciones de usuario o rol
router.post('/', async (req, res) => {
    const { idUsuario, idProducto, cantidad } = req.body;

    // Validaciones de entrada básicas
    if (!idUsuario || !idProducto || cantidad === undefined) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    if (typeof cantidad !== 'number' || cantidad <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }

    try {
        // Verificar existencia de usuario y producto en Firestore
        const usuarioRef = db.collection('Usuarios').doc(idUsuario);
        const productoRef = db.collection('productos').doc(idProducto);

        const [usuarioSnap, productoSnap] = await Promise.all([usuarioRef.get(), productoRef.get()]);

        if (!usuarioSnap.exists) return res.status(404).json({ error: 'Usuario no encontrado' });
        if (!productoSnap.exists) return res.status(404).json({ error: 'Producto no encontrado' });

        // Crear venta
        const nuevaVenta = {
            idUsuario,
            idProducto,
            cantidad,
            fecha: admin.firestore.Timestamp.now(),
        };

        const docRef = await db.collection('ventas').add(nuevaVenta);
        res.status(201).json({ id: docRef.id, ...nuevaVenta });
    } catch (error) {
        res.status(500).json({ error: `Error al crear la venta: ${error.message}` });
    }
});

module.exports = router;
