'use strict'

var idVendedorActual = 0;
var userVendedorActual = "";
var nombreVendedorActual = "";
var edadVendedorActual = 0;
var correoVendedorActual = "";
var passVendedorActual = "";

// ************************ INICIO Y CIERRE DE SESIÓN *****************

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
            document.getElementById('infoId').innerHTML = idVendedorActual.toString();
            document.getElementById('infoNombre').innerHTML = nombreVendedorActual;
            document.getElementById('infoUser').innerHTML = userVendedorActual;
            document.getElementById('infoEdad').innerHTML = edadVendedorActual.toString();
            document.getElementById('infoCorreo').innerHTML = correoVendedorActual;
            document.getElementById('infoPass').innerHTML = passVendedorActual;
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

//************************ADMINISTRACIÓN DE CLIENTES**************************

var formgroupCrearCliente = document.getElementById('nuevoCliente');
var formgroupEliminarCliente = document.getElementById('eliminarCliente')

function gestionNuevoCLiente(){
    formgroupCrearCliente.style.display = 'block';
    formgroupEliminarCliente.style.display = 'none';
}

function gestionEliminarCliente(){
    formgroupCrearCliente.style.display = 'none';
    formgroupEliminarCliente.style.display = 'block';
}

var inputIDClienteNuevo = document.getElementById('idNuevoCliente');
var inputNombreNuevo = document.getElementById('nombreNuevoCliente');
var inputCorreoNuevo = document.getElementById('correoNuevoCliente');

function crearNuevoCliente(){
    if(inputIDClienteNuevo.value != "" && inputNombreNuevo.value != "" && inputCorreoNuevo.value){
        let idClienteNuevo = parseInt(inputIDClienteNuevo.value);
        let nombreNuevo = inputNombreNuevo.value;
        let correoNuevo = inputCorreoNuevo.value;
        let nuevoCliente = [{
            'id': idVendedorActual,
            'clientes' : [{
                'id': idClienteNuevo,
                'nombre': nombreNuevo,
                'correo': correoNuevo
            }]
        }]
        try{
            localStorage.setItem("clientesJSON", JSON.stringify(nuevoCliente));
            console.log("Se ha guardado clientesJSON correctamente...");
            crearClientes();
        }catch(error){
            console.log(error);
            alert("Ha surgido un error al intentar guardar al cliente, verifique la estructura del JSON. (Ver consola)");
        }
        crearClientes();
        inputIDClienteNuevo.value = "";
        inputNombreNuevo.value = "";
        inputCorreoNuevo.value = "";
    }else{
        alert("Todos los campos del nuevo cliente son obligatorios.")
    }
}

// *************************** CALENDARIO ************************

var formgroupVerCalendario = document.getElementById('verCalendario');
var formgroupAgregarEvento = document.getElementById('agregarEvento');

function gestionVerCalendadrio(){
    formgroupVerCalendario.style.display = 'block';
    formgroupAgregarEvento.style.display = 'none';
}
function gestionAgregarEvento(){
    formgroupVerCalendario.style.display = 'none';
    formgroupAgregarEvento.style.display = 'block';
}

var containerGrafoCalendario = document.getElementById('grafoCalendario');
var textareaDotCalendario = document.getElementById('dotCalendario');

function generarGrafoCalendario(){
    let mesSeleccionado = document.getElementById('mesCalendario').value;
    mesSeleccionado = parseInt(mesSeleccionado); // 1 - 12
    let DOTstring = avl_vendedores.obtenerDotEventosDeVendedor(avl_vendedores.raiz, idVendedorActual, mesSeleccionado);
    if(DOTstring != null){
        let parsedData = vis.parseDOTNetwork(DOTstring);
        let data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
            }
        let options = parsedData.options;
        let grafoMatrizEventos = new vis.Network(containerGrafoCalendario, data, options);
        grafoMatrizEventos.setOptions({
            physics: {
                enabled: false
            },
            edges:{
                smooth: false
            }
        });
        textareaDotCalendario.innerHTML = DOTstring;
    }else{
        alert("No se pudo generar el grafo de eventos, no posee eventos en el mes.");
    }
}

var inputFechaNueva = document.getElementById('addFecha');
var inputHora = document.getElementById('addHora');
var textAreaDesc = document.getElementById('descripcionNuevoEvento');

function crearEventoNuevo(){
    if(textAreaDesc.value != ""){
        let fecha = inputFechaNueva.value.split("-");

        let nuevoEvento = [{
            'id': idVendedorActual,
            'eventos' : [{
                'mes': parseInt(fecha[1]),
                'dia': parseInt(fecha[2]),
                'hora': parseInt(inputHora.value),
                'desc': textAreaDesc.value
            }]
        }]
        try{
            localStorage.setItem("eventosJSON", JSON.stringify(nuevoEvento));
            console.log("Se ha guardado eventosJSON correctamente...");
            crearEventos();
        }catch(error){
            console.log(error);
            alert("Ha surgido un error al intentar guardar a los eventos, verifique la estructura del JSON. (Ver consola)");
        }
    }else{
        alert("Agregue una breve descripción del evento")
    }
}