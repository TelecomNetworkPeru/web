const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    urlImagen: String,
    descripcion: String
  });
  
  const Producto = mongoose.model('Producto', ProductoSchema);

  module.exports = Producto