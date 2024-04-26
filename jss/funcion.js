const validarFormulario = (form) => { 
    try {
        
        let error = 0;
        let message = "";
        let status = false;
        let countCheck = 0;
        let objeto = {};

        if(document.getElementById(form)){
            let formulario = document.getElementById(form);
            let elementos = formulario.elements;
            for (let i = 0; i < elementos.length; i++){
                
                let elemento = elementos[i];
                                
                let name = elemento.getAttribute("custom-name") ? elemento.getAttribute("custom-name") : elemento.getAttribute("name");
                let required = elemento.getAttribute('required') ? true : false;
                
                if (elemento.type !== 'button') {
                    if(elemento.value === "" && required){
                        error++;
                        message += `${name}, es requerido<br>`;
                    }

                    objeto[elemento.name] = elemento.value;
                }

                if (elemento.type === 'radio') {
                    if (!elemento.checked && countCheck == 0) {
                        message += `${name}, es requerido<br>`;
                        error++;
                    }
                    countCheck = 1;
                }

                if(elemento.type =="email" && elemento.value != ""){
                    if(!/\S+@\S+\.\S+/.test(elemento.value)){
                        message += `Ingrese un Email valido<br>`;
                        error++;
                    }
                }
                
            }

            status = error == 0 ? true : false;
        }else{
            message = `El elemento html de nombre ${form}, no existe en el DOM`;
        }
        
            

        return {status: status,message: message,request: objeto};
        
    } catch (error) {
        
        return {status: false,message: error.message,request: {}};
    }

    

}

const dataDB = () => {

    let data = [];
    if(localStorage.getItem('data')){
        //convertimos a un objeto JS
        data = JSON.parse(localStorage.getItem('data'));
    }

    return data;

}

const chunk = (array,size) => {
    const chunkedArray = [];
    let index = 0;

    while (index < array.length) {
        chunkedArray.push(array.slice(index, index + size));
        index += size;
    }

    return chunkedArray;
}



const loadDataInicio  = ()=>{
    
    let html = `
        <div class="text-center my-4">
            <span class="alert alert-warning">
                No hay productos disponibles, regrese mas tarde.
            </span>
        </div>
    `;

    let data = dataDB();

    if(data.length > 0){
        html = "";
        
        let newData = chunk(data,4);
        console.log(newData);

        newData.forEach(arr => {
            
            html += `<article class="productos">`;

            arr.forEach(obj => {
                let key = data.indexOf(obj);

                html += `
                <div class="producto">
                    <img src="${obj.url_imagen}" alt="${obj.nombre}">
                    <h2>${obj.nombre}</h2>
                    <p>${obj.descripcion}</p>
                    <a href="#" indice="${key}" class="btn btn-primary">Detalle</a>
                </div>
                `;
            });

            html += `</article>`;
        });

        
    }

    document.querySelector("#contenedor").innerHTML = html;

}

loadDataInicio();