const table = document.getElementById('maintenance-table');
const tableBody = document.getElementById('table-body');
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const productList = document.getElementById('product-list');
const productUl = document.getElementById('product-ul');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');
// Función para agregar una nueva fila a la tabla
function agregarFila(equipo, tipoMantenimiento, fechaMantenimiento, costo) {
    const newRow = tableBody.insertRow(tableBody.rows.length);

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.contentEditable = true;
    cell2.contentEditable = true;
    cell3.contentEditable = true;
    cell4.contentEditable = true;

    cell1.textContent = equipo || '';
    cell2.textContent = tipoMantenimiento || '';
    cell3.textContent = fechaMantenimiento || '';
    cell4.textContent = costo || '';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
        tableBody.deleteRow(newRow.rowIndex);
    });

    cell5.appendChild(deleteButton);

    newRow.addEventListener('input', function (e) {
        const cell = e.target;
        cell.classList.add('edit-cell');
    });

    newRow.addEventListener('focusout', function (e) {
        const cell = e.target;
        cell.classList.remove('edit-cell');
        actualizarListaProductos();
    });
}
// Agregar producto cuando se hace clic en el botón "Agregar Producto"
addButton.addEventListener('click', function () {
    agregarFila('', '', '', '');
    actualizarListaProductos(); // Llamar a la función después de agregar una fila
});

// Eliminar producto cuando se hace clic en el botón "Eliminar Producto"
deleteButton.addEventListener('click', function () {
    const rowCount = tableBody.rows.length;
    if (rowCount > 0) {
        tableBody.deleteRow(rowCount - 1);
        actualizarListaProductos();
    }
});

// Función para actualizar la lista de productos
function actualizarListaProductos() {
    const productUl = document.getElementById('product-ul');
    productUl.innerHTML = '';

    const filas = tableBody.rows;

    for (let i = 0; i < filas.length; i++) {
        const equipo = filas[i].cells[0].textContent;
        if (equipo) {
            const li = document.createElement('li');
            li.textContent = equipo;
            productUl.appendChild(li);
        }
    }
    // Guardar la lista de productos en localStorage
  
}
function guardarDatosEnLocalStorage() {
    const filas = Array.from(tableBody.rows).map(row => ({
        equipo: row.cells[0].textContent,
        tipoMantenimiento: row.cells[1].textContent,
        fechaMantenimiento: row.cells[2].textContent,
        costo: row.cells[3].textContent,
    }));

    localStorage.setItem('tablaMantenimiento', JSON.stringify(filas));
    
}

function restaurarTablaDesdeLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('tablaMantenimiento')) || [];
    
    while (tableBody.rows.length > 0) {
        tableBody.deleteRow(0); // Elimina todas las filas existentes
    }

    storedData.forEach(data => {
        agregarFila(data.equipo, data.tipoMantenimiento, data.fechaMantenimiento, data.costo);
    });
}
// ...

// Restaurar la tabla de mantenimiento y la lista de productos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    restaurarTablaDesdeLocalStorage();
    actualizarListaProductos();
});
saveButton.addEventListener('click', function () {
    guardarDatosEnLocalStorage();
    alert('Datos guardados en localStorage.');
});

// Limpiar localStorage desde la consola manualmente


// Eliminar la última fila de la tabla de mantenimiento
function limpiarLocalStorage() {
    localStorage.removeItem('tablaMantenimiento'); // Elimina los datos de la tabla de mantenimiento
    localStorage.removeItem('listaProductos'); // Elimina los datos de la lista de productos
    productUl.innerHTML = ''; // Limpia la lista de productos en la página
    alert('Datos de la tabla de mantenimiento y la lista de productos eliminados.');
}

// Limpiar localStorage
clearButton.addEventListener('click', limpiarLocalStorage);



//tabla guardar
function guardarProducto() {
    saveButton.addEventListener('click', guardarProducto);

    let nombre = document.getElementById("nombre").value;
    let url_imagen = document.getElementById("url_imagen").value;
    let descripcion = document.getElementById("descripcion").value;
  
    if (nombre.trim() === "" || url_imagen.trim() === "" || descripcion.trim() === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${nombre}</td>
      <td><img src="${url_imagen}" alt="${nombre}" style="max-width: 100px;"></td>
      <td>${descripcion}</td>
      <td><button type="button" class="btn btn-danger" onclick="eliminarProducto(this)">Eliminar</button></td>
    `;
  
    document.getElementById("tbody").appendChild(newRow);
  
    // Cerrar el modal
    let modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.hide();
  
    // Limpiar los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("url_imagen").value = "";
    document.getElementById("descripcion").value = "";
  }




  //tabla funcionalidades



document.addEventListener("DOMContentLoaded", function () {
    
    let cerrarBoton = document.querySelector('[data-bs-dismiss="modal"]');
    let guardarBoton = document.getElementById('enviar');

    guardarBoton.addEventListener('click', function () {
        
        let modal = document.querySelector('modal');
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    });

    
    cerrarBoton.addEventListener('click', function () {
        
        let modal = document.querySelector('.modal');
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    });
});

