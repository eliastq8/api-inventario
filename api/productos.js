const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Ruta para obtener todos los productos con posibles filtros
router.get('/', async (req, res) => {
    try {
        const { nombre, cantidad } = req.query;
        let consulta = db.collection('productos');

        if (nombre) {
            consulta = consulta.where('nombre', '==', nombre);
        }
        if (cantidad) {
            consulta = consulta.where('cantidad', '==', parseInt(cantidad));
        }

        const snapshot = await consulta.get();
        const productos = [];
        snapshot.forEach((doc) => {
            productos.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        res.status(200).json({ data: productos, total: productos.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('productos').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({
            id: doc.id,
            ...doc.data(),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo producto
// Crear un nuevo producto con ID personalizado
router.post('/', async (req, res) => {
    const { id, nombre, cantidad, descripcion } = req.body;

    // Validar que los datos obligatorios estén presentes
    if (!nombre || cantidad === undefined || !descripcion) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        const newProduct = {
            nombre,
            cantidad,
            descripcion,
        };

        let docRef;
        if (id) {
            // Si el ID es proporcionado, úsalo para crear el documento
            docRef = db.collection('productos').doc(id);
            await docRef.set(newProduct); // Aquí usamos .set() para guardar los datos con el ID personalizado
        } else {
            // Si no se proporciona ID, Firestore generará uno aleatorio
            docRef = await db.collection('productos').add(newProduct);
        }

        res.status(201).json({ id: docRef.id, ...newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Actualizar un producto por ID
router.patch('/:id', async (req, res) => {
    const { nombre, cantidad, descripcion } = req.body;

    if (!nombre || cantidad === undefined || !descripcion) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        const docRef = db.collection('productos').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await docRef.update({ nombre, cantidad, descripcion });
        res.status(200).json({ id: req.params.id, nombre, cantidad, descripcion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
    try {
        const docRef = db.collection('productos').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await docRef.delete();
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
