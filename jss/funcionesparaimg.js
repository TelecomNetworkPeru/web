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

// Si tienes un botón "Guardar" dentro de un modal, puedes agregar un evento de clic así:
document.getElementById('enviar').addEventListener('click', function() {
    guardarProducto(); // Llamar a la función para guardar el producto
});
