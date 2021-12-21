'use strict'

var idVendedorActual = 0;
var userVendedorActual = "";
var nombreVendedorActual = "";
var edadVendedorActual = 0;
var correoVendedorActual = "";
var passVendedorActual = "";

function datosVendedor(){
    let user = localStorage.getItem("userVendedor");
    let vendedor = avl_vendedores.obtenerVendedorJSON(user);
    if(vendedor != null){
        try{
            idVendedorActual = vendedor.id;
            userVendedorActual = vendedor.username;
            nombreVendedorActual = vendedor.nombre;
            edadVendedorActual = vendedor.edad;
            correoVendedorActual = vendedor.correo;
            passVendedorActual = vendedor.password;
        }catch(error){
            console.log(error);
            console.log("El vendedor no fue ingresado con todos los datos necesarios.")
            alert("Datos incompletos del vendedor (ver consola)");
        }
    }else{
        console.log("ERROR: Método obtenerVendedorJSON no encontró al user guardado en el storage.")
        alert("Ocurrió un error en el storage (ver consola).")
    }
}


function cerrarSesion(){
    localStorage.removeItem("userVendedor");
    location.href = "../index.html"
}