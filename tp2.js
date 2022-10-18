const fs = require('fs');
 
class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }
 
    async save(producto) {
        try {
            const productos = await this.getAll();
            producto.id = productos.length + 1;
            productos.push(producto);
            await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2));
            return producto.id;
        } catch (error) {
            console.log('Error en save: ', error);
        }
    }
 
    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find((producto) => producto.id === id);
            return producto;
        } catch (error) {
            console.log('Error en getById: ', error);
        }
    }
 
    async getAll() {
        try {
            const contenido =  fs.readFileSync(this.archivo, 'utf-8');
            return JSON.parse(contenido);
        } catch (error) {
            console.log('Error en getAll: ', error);
        }
    }
 
    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find((producto) => producto.id === id);
            if (!producto) {
                return null;
            }
            const productosFiltrados = productos.filter((producto) => producto.id !== id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(productosFiltrados, null, 2));
            return producto;
        } catch (error) {
            console.log('Error en deleteById: ', error);
        }
    }
 
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify([], null, 2));
        } catch (error) {
            console.log('Error en deleteAll: ', error);
        }
    }
}
 
//crear productos y guardarlos en el archivo productos.txt usando la clase contenedor y el módulo fs de node.js 
const contenedor = new Contenedor('productos.txt');
 
module.exports = Contenedor;

//Descomentar para agregar producto
//console.log(contenedor.save ({ title: 'heladera', price: 80.50, thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/323/009/products/negro-35d9e5ef0af75095f216560860367793-1024-1024.jpg', id: 1 }));

