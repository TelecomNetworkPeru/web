const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa cors al inicio
const initBD = require('./db');
const app = express();

app.use(express.json());
app.use(cors()); // Habilita CORS después de express.json()

const DB_URI = 'mongodb://localhost:27017/entregable01'; 

// Llama a initBD() antes de definir las rutas que requieren acceso a la base de datos
initBD();

mongoose.connect(DB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Define tus rutas después de haber configurado todo lo necesario
app.get('/productos', async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    try {
      const productoGuardado = await nuevoProducto.save();
      res.status(201).json(productoGuardado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

app.put('/productos/:id', async (req, res) => {
    try {
      const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(productoActualizado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
app.delete('/productos/:id', async (req, res) => {
    try {
      await Producto.findByIdAndDelete(req.params.id);
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío normal del formulario

  const nombre = document.getElementById('nombre').value;
  const urlImagen = document.getElementById('url_imagen').value;
  const descripcion = document.getElementById('descripcion').value;

  fetch('http://localhost:3000/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: nombre,
      urlImagen: urlImagen,
      descripcion: descripcion
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Datos del producto guardado
    // Aquí puedes añadir lógica para cerrar el modal y actualizar la lista de productos.
    Swal.fire('¡Producto agregado!', 'El producto ha sido agregado exitosamente.', 'success');
  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire('Error', 'Hubo un problema al agregar el producto.', 'error');
  });
});


// Agrega el modelo de Producto al principio
const Producto = require('./productos');

// Define la ruta POST para guardar un nuevo producto
app.post('/productos', async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud
  const { nombre, url_imagen, descripcion } = req.body;

  // Verifica que se hayan proporcionado todos los datos necesarios
  if (!nombre || !url_imagen || !descripcion) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Crea un nuevo objeto Producto con los datos proporcionados
  const nuevoProducto = new Producto({
      nombre,
      url_imagen,
      descripcion
  });

  try {
      // Guarda el nuevo producto en la base de datos
      const productoGuardado = await nuevoProducto.save();
      // Responde con el producto guardado y el código de estado 201 (creado)
      res.status(201).json(productoGuardado);
  } catch (error) {
      // Si hay algún error al guardar el producto, responde con un código de estado 500 (error interno del servidor)
      res.status(500).json({ message: 'Error al guardar el producto', error: error.message });
  }
});