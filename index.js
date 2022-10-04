
class Usuario {
  constructor(nombre, apellido, libros, autor, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [{ libros, autor }];
    this.mascotas = [mascotas];
  }

  getFullName() {
    return `Nombre completo ${this.nombre} ${this.apellido}`;
  }
  addMascota(mascotas) {
    return this.mascotas.push(mascotas);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addLibro(libros, autor) {
    this.libros.push({ libros, autor });
  }
  getBookNames() {
    return this.libros.map((books) => {
      return books.libros;
    });
  }
}

const damian = new Usuario ("Damian", "Lammenda", "It","Stephen King" ,"Iguana")
const damianFullName = damian.getFullName()
const damianLibros = damian.getBookNames()
const addBook = damian.addLibro("El señor de los anillos", "J.R.R. Tolkien") 
const addBook2 = damian.addLibro( "Carrie", "Stephen King") 
const damianMascota = damian.addMascota ("Perro")
const countMascotas = damian.countMascotas()

console.log (damian);

