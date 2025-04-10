const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// Numeracion para la primera columna de tablaListaCompras
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

// Para validar cantidad de txtNumber
function validarCantidad(){

    // validar que tenga un contenido
    if(txtNumber.value.trim().length<=0){
        return false;
    };// length <=0   Es decir cuando no tiene nada el campo input

    // validar que sea int número
    if(isNaN(txtNumber.value)){
        return false;
    };//  is NaN Confirma si no es un número, regresa falso

    // validar que sea número mayor que sero
    if(Number(txtNumber.value) <= 0){
        return false;
    };

    return true;
};//validarCantidad

// Función para crear precio al azar
function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}; //getPrecio


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    // Crear variable "bandera", al ser true, permite agregar los campos de input a la tabla

    let isValid = true;

    // Para limpiar el texto, el borde y la alerta cada que presiono el botón
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    txtName.style.border= "";
    txtNumber.style.border= "";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3 ){
        txtName.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>"
        alertValidaciones.style.display="block";
        isValid = false;
    }; // length>=3

    if(! validarCantidad()){
        txtNumber.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>"
        alertValidaciones.style.display="block";
        isValid = false;
    }; //validarCantidad

    if(isValid){ // si pasó las validaciones se añade
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                   </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        
        // Llenado de los campos Total en Productos y Precio Total
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;

        
        
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
        

    }// if isValid

}); // btn Agregar

btnClear.addEventListener("click", function (event){  // Botón limpiar
    event.preventDefault();

    // Para limpiar los campos de las etiquetas table data <td>
    cuerpoTabla.insertAdjacentHTML = "";
}); // Botón limpiar

