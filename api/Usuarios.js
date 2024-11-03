const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('Usuarios').get();
        const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ data: usuarios, total: usuarios.length });
    } catch (error) {
        res.status(500).json({ error: `Error al obtener los usuarios: ${error.message}` });
    }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('Usuarios').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: `Error al obtener el usuario: ${error.message}` });
    }
});

module.exports = router;
