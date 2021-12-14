'use strict';

var radioEmpleado = document.getElementById('optionEmpleado');
var radioCliente = document.getElementById('optionCliente');
var radioProveedor = document.getElementById('optionProveedor');

var formgroupEmpleado = document.getElementById('datosEmpleado');
var formgroupCliente = document.getElementById('datosCliente');
var formgroupProveedor = document.getElementById('datosProveedor');

var submit = document.getElementById("submitUsuario")
submit.addEventListener('click', function(event){
    event.preventDefault();
});

function tipoUsuario(){
    if(radioEmpleado.checked){
        formgroupEmpleado.style.display = 'block';
        formgroupCliente.style.display = 'none';
        formgroupProveedor.style.display = 'none';
    } else if(radioCliente.checked){
        formgroupEmpleado.style.display = 'none';
        formgroupCliente.style.display = 'block';
        formgroupProveedor.style.display = 'none';
    } else if(radioProveedor.checked){
        formgroupEmpleado.style.display = 'none';
        formgroupCliente.style.display = 'none';
        formgroupProveedor.style.display = 'block';
    }
}

function registrarUsuario(){
    if(radioEmpleado.checked){
        let inputId = document.getElementById('idEmpleado');
        let inputUser = document.getElementById('userEmpleado');
        let inputNombre = document.getElementById('nombreEmpleado');
        let inputEdad = document.getElementById('edadEmpleado');
        let inputCorreo = document.getElementById('correoEmpleado');
        let inputPass = document.getElementById('passEmpleado');

        if((inputId.value != "") && (inputUser.value != "") && (inputNombre.value != "") && (inputEdad.value != "") && (inputCorreo.value != "") && (inputPass.value != "")){
            let nuevoEmpleado = {
                'id': parseInt(inputId.value),
                'username': inputUser.value,
                'nombre': inputNombre.value,
                'edad': parseInt(inputEdad.value),
                'correo': inputCorreo.value,
                'password': inputPass.value
            }
            console.log(nuevoEmpleado);
            // TODO REGISTRO
        } else {
            alert("Campos vacíos, todos los campos son obligatorios.");
        }
    } else if(radioCliente.checked){
        let inputIdVendedor = document.getElementById('idVendedor');
        let inputId = document.getElementById('idCliente');
        let inputNombre = document.getElementById('nombreCliente');
        let inputCorreo = document.getElementById('correoCliente');

        if((inputIdVendedor.value != "") && (inputId.value != "") && (inputNombre.value != "") && (inputCorreo.value != "")){
            let nuevoCliente = {
                'idVendedor': parseInt(inputIdVendedor.value),
                'id': parseInt(inputId.value),
                'nombre': inputNombre.value,
                'correo': inputCorreo.value
            }
            console.log(nuevoCliente);
            // TODO REGISTRO
        } else {
            alert("Campos vacíos, todos los campos son obligatorios.");
        }
    } else if(radioProveedor.checked){
        let inputId = document.getElementById('idProveedor');
        let inputNombre = document.getElementById('nombreProveedor');
        let inputDireccion = document.getElementById('direccionProveedor');
        let inputTelefono= document.getElementById('telefonoProveedor');
        let inputCorreo = document.getElementById('correoProveedor');

        if((inputId.value != "") && (inputNombre.value != "") && (inputDireccion.value != "") && (inputTelefono.value != "") && (inputCorreo.value != "")){
            let nuevoProveedor = {
                'id': parseInt(inputId.value),
                'nombre': inputNombre.value,
                'direccion': inputDireccion.value,
                'telefono': parseInt(inputTelefono.value),
                'correo': inputCorreo.value
            }
            console.log(nuevoProveedor);
            // TODO REGISTRO
        } else {
            alert("Campos vacíos, todos los campos son obligatorios.");
        }
    }
}