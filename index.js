  //PROYECTO DE PAGINA DE VENTA DE PRODUCTOS 

const hamburguer = document.querySelector('.hamburger');

const menu = document.querySelector('.menu-navegacion');


console.log(menu)
console.log(hamburguer)

hamburguer.addEventListener('click', ()=>{
   menu.classList.toggle("spread")
  
})

window.addEventListener('click', e=>{
   if(menu.classList.contains('spread') && e.target != menu && e.target != hamburguer  ){
          menu.classList.toggle("spread")
   }
})


const baseDeDatos = [
  {
      id: 1,
      nombre: 'Buzo Among Us Xmas Edicion Especial',
      precio: 1200,
      imagen: 'img/BUZO.jpg'
  },
  {
      id: 2,
      nombre: 'Buzo among us Espacial',
      precio: 1000,
      imagen: 'img/buzo 2.jpg'
  },
  {
      id: 3,
      nombre: 'Remera Among Us Sillon Espacial',
      precio: 600,
      imagen: 'img/REMERA 1.jpg'
  },
  {
      id: 4,
      nombre: 'Pantuflas Among Us acolchondas',
      precio: 1500,
      imagen: 'img/PANTUFLAS.jpg'
  },
  {
    id: 5,
    nombre: 'Ojotas Among Us "Dripping',
    precio: 4500,
    imagen: 'img/dripping.jpg'
  },
  {
    id: 6,
    nombre: 'Ojotas estampado Among Us',
    precio: 1200,
    imagen: 'img/ojotas locas.jpg'
  },
  {
    id: 7,
    nombre: 'Disfraces para infantes de los tripulandes de Among Us',
    precio: 1200,
    imagen: 'img/DISFRACES.jpg'
  },
  {
    id: 8,
    nombre: 'Llavero Among Us de goma elastica',
    precio: 1200,
    imagen: 'img/LLAVERO.webp'
  },
  {
    id: 9,
    nombre: 'Peluchitos Among Us',
    precio: 1200,
    imagen: 'img/PELUCHES.jpg'
  },

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones


function renderizarProductos() {
  baseDeDatos.forEach((info) => {
      // Estructura
      const miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4');
      // Body
      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      // Titulo
      const miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info.nombre;
      // Imagen
      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info.imagen);
      // Precio
      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text');
      miNodoPrecio.textContent = `${info.precio}${divisa}`;
      // Boton 
      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-danger');
      miNodoBoton.textContent = '+';
      miNodoBoton.setAttribute('marcador', info.id);
      miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
  });
}

/*
* Evento para añadir un producto al carrito de la compra
*/
function anyadirProductoAlCarrito(evento) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute('marcador'))
 
  renderizarCarrito();

}


function renderizarCarrito() {

  DOMcarrito.textContent = '';

  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
      // Obtenemos el item que necesitamos de la variable base de datos
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
          
          return itemBaseDatos.id === parseInt(item);
      });
    
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          
          return itemId === item ? total += 1 : total;
      }, 0);
      // nodo del item del carrito
      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      // Boton de borrar
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
  
      miBoton.addEventListener('click', borrarItemCarrito);
      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
  });
  
  DOMtotal.textContent = calcularTotal();
}


//Evento para borrar un elemento del carrito

function borrarItemCarrito(evento) {
 
  const id = evento.target.dataset.item;
 
  carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
  });
 
  renderizarCarrito();
}


//Calcula el precio total teniendo en cuenta los productos repetidos

function calcularTotal() {
  
  return carrito.reduce((total, item) => {
    
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
      });
      
      return total + miItem[0].precio;
  }, 0).toFixed(2);
}


//Varia el carrito y vuelve a dibujarlo

function vaciarCarrito() {
  
  carrito = [];
  
  renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();



