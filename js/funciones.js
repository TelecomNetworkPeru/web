
document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    
    toggleButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const description = button.previousElementSibling;
            
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                button.classList.remove("show-description");
                button.classList.add("hide-description");
                button.textContent = "Ocultar Descripción";
            } else {
                description.style.display = "none";
                button.classList.remove("hide-description");
                button.classList.add("show-description");
                button.textContent = "Mostrar Descripción";
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        let valid = true;
        const requiredFields = ["nombre", "email", "asunto", "mensaje"];

        requiredFields.forEach(function (field) {
            const inputField = contactForm.elements[field];
            if (!inputField.value) {
                valid = false;
                inputField.classList.add("is-invalid");
            } else {
                inputField.classList.remove("is-invalid");
            }
        });

        // Validar campo "teléfono" (opcional)
        const telefono = contactForm.elements["telefono"].value;
        if (telefono && !validarTelefono(telefono)) {
            valid = false;
            contactForm.elements["telefono"].classList.add("is-invalid");
        } else {
            contactForm.elements["telefono"].classList.remove("is-invalid");
        }

        // Validar campo "sitioWeb" (opcional)
        const sitioWeb = contactForm.elements["sitioWeb"].value;
        if (sitioWeb && !validarSitioWeb(sitioWeb)) {
            valid = false;
            contactForm.elements["sitioWeb"].classList.add("is-invalid");
        } else {
            contactForm.elements["sitioWeb"].classList.remove("is-invalid");
        }

        if (!valid) {
            event.preventDefault();
            alert("Por favor, complete todos los campos obligatorios y verifique el formato del teléfono y el sitio web.");
        }
    });

    function validarTelefono(telefono) {
        
        return /^\d{10,}$/.test(telefono);
    }

    function validarSitioWeb(sitioWeb) {
    
        return /^https?:\/\/\S+$/.test(sitioWeb);
    }
});


//funciones buscador
function search() {
    let searchTerm = document.getElementById("search-input").value;
    
    if (searchTerm) {
        let found = window.find(searchTerm);

        if (!found) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'no se encontro esa palabra en la pagina!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            
        }
    }
}

function handleSearch() {
    search();
}

document.getElementById("search-button").addEventListener("click", (event) => {
    event.preventDefault();
    handleSearch();
});

document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        search();
    }
});

const agregarTerminoABusquedas = (termino) => {
    const tabla = document.getElementById("search-terms");
    const fila = tabla.insertRow(-1); 
    const celda = fila.insertCell(0);
    celda.textContent = termino;
}

document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    realizarBusqueda();
});