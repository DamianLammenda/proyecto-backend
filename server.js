const express = require('express');
const fs = require('fs');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3004;

// const Contenedor = require('./tp2');
// const contenedor = new Contenedor("productos.txt");

//devuelve un array con los productos.txt
app.get('/productos', (_req, res) => {
    res.status(200).send(fs.readFileSync('productos.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            }
            return data;
            }));
});

// app.get('/productos', (_req, res) => {
//     res.send('Hola');
// });
// app.get('/productosRandom', (_req, res) => {
//     res.status(200).send('Hola random');
// });
//devuelve un producto aleatorio del array de productos.txt
app.get('/productosRandom', (_req, res) => {
    res.status(200).send(fs.readFileSync('productos.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            }
            const productos = JSON.parse(data);
            const random = Math.floor(Math.random() * productos.length);
            return productos[random];
            }));
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

