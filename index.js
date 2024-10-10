const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { Inventory } = require('./models'); // Importa el modelo Sequelize Inventory
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Ruta para obtener todos los productos desde la base de datos
app.get("/data", async (req, res) => {
    try {
        const products = await Inventory.findAll(); // Obtiene todos los productos
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});

// Ruta para obtener un producto por ID desde la base de datos
app.get("/data/:id", async (req, res) => {
    try {
        const product = await Inventory.findByPk(req.params.id); // Busca por ID
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});

// Ruta para agregar un nuevo producto
app.post("/data", async (req, res) => {
    try {
        const { nombre, cantidad, descripcion } = req.body;
        const newProduct = await Inventory.create({ 
            nombre: nombre, 
            cantidad: cantidad, 
            descripcion: descripcion 
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto', error });
    }
});

// Ruta para actualizar un producto
app.put("/data/:id", async (req, res) => {
    try {
        const { nombre, cantidad, descripcion } = req.body;
        const product = await Inventory.findByPk(req.params.id);
        if (product) {
            await product.update({nombre, cantidad, descripcion});
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
});

// Ruta para eliminar un producto
app.delete("/data/:id", async (req, res) => {
    try {
        const product = await Inventory.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.status(200).json({ message: "Producto eliminado" });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});

app.listen(port, () => {
    console.log(`Servicio escuchando en el puerto ${port}`);
});
