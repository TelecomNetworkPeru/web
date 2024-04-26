
function agregarTerminoABusquedas(termino) {
    const tabla = document.getElementById("search-terms");
    const fila = tabla.insertRow(-1); 
    const celda = fila.insertCell(0);
    celda.textContent = termino;
}

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    realizarBusqueda();
});

// Manejador para buscar al presionar "Enter" en el campo de búsqueda
document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        realizarBusqueda();
    }
});


function realizarBusqueda() {
    const input = document.getElementById("search-input");
    const termino = input.value.trim();
    if (termino) {
        agregarTerminoABusquedas(termino);
        buscarYResaltar(termino);
        input.value = ""; 
    }
}
function realizarFiltrado() {
    const input = document.getElementById("search-input");
    const termino = input.value.trim().toLowerCase();
    const secciones = document.querySelectorAll(".section");

    secciones.forEach((seccion) => {
        const texto = seccion.textContent.toLowerCase();
        if (texto.includes(termino)) {
            seccion.style.display = "block";
        } else {
            seccion.style.display = "none";
        }
    });
}

function buscarYResaltar(termino) {
    const content = document.getElementById("content");
    const contenidoHTML = content.innerHTML;
    const contenidoResaltado = contenidoHTML.replace(new RegExp(termino, 'gi'), match => `<span class="resaltado">${match}</span>`);
    content.innerHTML = contenidoResaltado;

  
    const primerResaltado = document.querySelector(".resaltado");
    if (primerResaltado) {
        primerResaltado.scrollIntoView({ behavior: "smooth" });
    }
}