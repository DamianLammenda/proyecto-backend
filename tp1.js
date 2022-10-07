
class Usuario {
  constructor(nombre, apellido, libro, autor, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [{ libro, autor }];
    this.mascotas = [mascotas];
  }

  getFullName() {
    return `Nombre completo: ${this.nombre} ${this.apellido}`;
  }
  addMascota(mascotas) {
    return this.mascotas.push(mascotas);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addLibro(libro, autor) {
    this.libros.push({ libro, autor });
  }
  getBookNames() {
    return this.libros.map((books) => {
      return books.libro;
    });
  }
}

const damian = new Usuario ("Damian", "Lammenda", "It","Stephen King" ,"Iguana")
const damianFullName = damian.getFullName()
const addBook = damian.addLibro("El señor de los anillos", "J.R.R. Tolkien") 
const addBook2 = damian.addLibro( "Carrie", "Stephen King") 
const damianMascota = damian.addMascota ("Perro")
const countMascotas = damian.countMascotas()
const damianLibros = damian.getBookNames()

console.log (damian);

