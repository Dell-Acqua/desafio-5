const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const productos = [
  { title: 'Lechuga Hidroponica', price: 250, thumbnail: 'https://cdn4.iconfinder.com/data/icons/food-4-9/128/food_Cabbage-Vegetable-Organic-Lettuce-256.png', id: 1 },
  { title: 'Rucula Hidroponica', price: 450, thumbnail: 'https://cdn3.iconfinder.com/data/icons/arugula-1/500/vab1055_1_arugula_isometric-128.png', id: 2 },
  { title: 'Tomatitos Cherry', price: 500, thumbnail: 'https://cdn2.iconfinder.com/data/icons/fruits-vegetables-2/83/cherry_tomato-128.png', id: 3 },
];

const server = app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

app.set('views', './views');
app.set('view engine', 'pug');

app.post('/productos', (req, res) => {
  const id = productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1;
  const productoIngresado = req.body;
  const productoAGuardar = { ...productoIngresado, id: id };
  productos.push(productoAGuardar);
  res.writeHead(301, { Location: '/productos' });
  return res.end();
});

app.get('/', (req, res) => {
  res.render('formulario.pug');
});

app.get('/productos', (req, res) => {
  res.render('productos.pug', {
    productos: productos,
  });
});

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));