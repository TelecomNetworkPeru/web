const loadDataTable  = ()=>{

    let html = `
        <tr>
            <td colspan="4" class="text-center">
                <div class="alert alert-warning">No se encontraron elemenetos</div>
            </td>
        </tr>
    `;

    let data = dataDB();

    if(data.length > 0){
        html = "";

        data.forEach((obj,index) => {
            html += `
            <tr>
                <td>${obj.nombre}</td>
                <td><img src="${obj.url_imagen}" alt="${obj.nombre}" class="img"></td>
                <td>${obj.descripcion}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" 
                    data-bs-target="#modal" onclick="cargarData(${index})">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm eliminar" onclick="eliminarItem(${index})" >Eliminar</button>
                </td>
            </tr>`;
        });
    }

    document.querySelector("#tbody").innerHTML = html;

}

loadDataTable();

document.querySelector("#open").onclick = ()=>{
    document.querySelector("#formulario").reset();
    document.querySelector("#indice").value = "-1";
}

const eliminarItem = (i) => {
    let data = dataDB();
    let obj = data[i];

    Swal.fire({
        title: 'Estas seguro de elimar el elmento?',
        text: obj.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
            
            data = data.filter( item => item.nombre != obj.nombre );
            localStorage.setItem("data",JSON.stringify(data));

            loadDataTable();

            Swal.fire(
                'Se elimino exitosamente!',
                '',
                'success'
            )
        }
      })
}

const cargarData = (i) => {
    let data = dataDB();

    let valid = data.indexOf(data[i]);
    
    if(valid > -1){
        let obj = data[i];
        for(const key in obj){
            
            if(key != ""){
                //console.log(key)
                document.querySelector("#"+key).value = obj[key];
            }
            
        }
        document.querySelector("#indice").value = i;
    }else{
       Swal.fire(
        "No se encontro el elemento","","warning"
       )
    }
    
}

const enviarFormulario = ()=>{
    
    const response = validarFormulario("formulario");

    let resultado = response.status ? "Formulario enviado exitosamente" : response.message ;

    if(response.status){

        //comprobamos si existe una clave data en el localStorage
        let data = dataDB();
        let indice = parseFloat(document.querySelector("#indice").value);
        let valid = data.indexOf(data[indice]);
        
        if(valid > -1){
            data[indice] = response.request;
            resultado = "Registro actualizado existosamente";
        }else{
            data.push(response.request);
        }
        
        
        //actualizamos la clave data en el localStorage
        localStorage.setItem("data",JSON.stringify(data));
        
        Swal.fire(
          resultado,
          '',
          'success'
        );

        document.querySelector("#formulario").reset();
        document.querySelector("#close").click();

        loadDataTable();
    }else{
        Swal.fire(
          'Un momento..!',
          resultado,
          'warning'
        );
    }
    
}
const button = document.querySelector('#enviar');

button.onclick = () => {
    enviarFormulario();
}