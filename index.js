const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

const data = [
    {
        id: 1,
        nombre: "cosa1",
        cantidad: 2,
        descripcion: "es una descripcion"
    },
    {
        id: 2,
        nombre: "cosa2",
        cantidad: 6,
        descripcion: "es una descripcion"
    },

]

app.get("/", (req, res) => {
    res.send("hola mundo")
})
app.get("/data/all", (req, res) => {
    res.status(200).json(data)
})
app.get("/data", (req, res) => {
    const query_id = req.query.id
    const query_nombre = req.query.nombre
    if (query_id && query_nombre) {
        const filtro = data.filter(item => item.id == query_id && item.nombre == query_nombre)
        if (filtro.length > 0) {
            res.status(200).json(filtro)
        } else {
            res.status(404).json({ mensaje: "no encontrado" })
        }
    } else {
        res.status(302).redirect("/data/all")
    }
})

app.get("/data/:id", (req, res) => {
    const id_user = req.params.id
    const encontrado = data.find(item => item.id == id_user)
    if (encontrado) {
        res.status(200).json(encontrado)
    } else {
        res.status(404).json({ mensaje: "no encontrado" })
    }
})
app.post("/data", (req, res) => {
    const user_body = req.body
    data.push(user_body)
    res.status(201).json(data)
})

app.put("/data/:id", (req, res) => {
    const user_body = req.body
    const param = req.params.id
    const encontrado = data.findIndex(item => item.id == param)
    if (encontrado != -1) {
        data[encontrado] = user_body
        res.status(201).json(data)
    } else {
        res.status(404).json({ message: "No encontrado" })
    }
})

app.delete("/data/:id", (req, res) => {
    const param = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === param);
    if (index !== -1) {
        const [deleted] = data.splice(index, 1);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.listen(port, () => {
    console.log("Servicio escuchando el puerto", port)
})