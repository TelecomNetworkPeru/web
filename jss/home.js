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