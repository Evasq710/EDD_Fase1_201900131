'use strict';

// Registro individual de usuarios

var radioEmpleado = document.getElementById('optionEmpleado');
var radioCliente = document.getElementById('optionCliente');
var radioProveedor = document.getElementById('optionProveedor');

var formgroupEmpleado = document.getElementById('datosEmpleado');
var formgroupCliente = document.getElementById('datosCliente');
var formgroupProveedor = document.getElementById('datosProveedor');

var submitUsuario = document.getElementById("submitUsuario")
submitUsuario.addEventListener('click', function(event){
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
            let nuevoEmpleado = [{
                'id': parseInt(inputId.value),
                'username': inputUser.value,
                'nombre': inputNombre.value,
                'edad': parseInt(inputEdad.value),
                'correo': inputCorreo.value,
                'password': inputPass.value
            }]
            try{
                localStorage.setItem("vendedoresJSON", JSON.stringify(nuevoEmpleado));
                console.log("Se ha guardado vendedoresJSON correctamente...");
                crearVendedores();
                location.reload();
                inputId.value = "";
                inputUser.value = "";
                inputNombre.value = "";
                inputEdad.value = "";
                inputCorreo.value = "";
                inputPass.value = "";
            }catch(error){
                console.log(error);
                alert("Ha surgido un error al intentar guardar al vendedor, verifique la estructura del JSON. (Ver consola)");
            }
        } else {
            alert("Campos vacíos, todos los campos son obligatorios.");
        }
    } else if(radioCliente.checked){
        let inputIdVendedor = document.getElementById('idVendedor');
        let inputId = document.getElementById('idCliente');
        let inputNombre = document.getElementById('nombreCliente');
        let inputCorreo = document.getElementById('correoCliente');

        if((inputIdVendedor.value != "") && (inputId.value != "") && (inputNombre.value != "") && (inputCorreo.value != "")){
            let nuevoCliente = [{
                'id': parseInt(inputIdVendedor.value),
                'clientes' : [{
                    'id': parseInt(inputId.value),
                    'nombre': inputNombre.value,
                    'correo': inputCorreo.value
                }]
            }]
            try{
                localStorage.setItem("clientesJSON", JSON.stringify(nuevoCliente));
                console.log("Se ha guardado clientesJSON correctamente...");
                crearClientes();
                location.reload();
                inputIdVendedor.value = "";
                inputId.value = "";
                inputNombre.value =  "";
                inputCorreo.value = "";
            }catch(error){
                console.log(error);
                alert("Ha surgido un error al intentar guardar al cliente, verifique la estructura del JSON. (Ver consola)");
            }
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
            let nuevoProveedor = [{
                'id': parseInt(inputId.value),
                'nombre': inputNombre.value,
                'direccion': inputDireccion.value,
                'telefono': parseInt(inputTelefono.value),
                'correo': inputCorreo.value
            }]
            try{
                localStorage.setItem("proveedoresJSON", JSON.stringify(nuevoProveedor));
                console.log("Se ha guardado proveedoresJSON correctamente...");
                crearProveedores();
                location.reload();
                inputId.value = "";
                inputNombre.value = "";
                inputDireccion.value = "";
                inputTelefono.value = "";
                inputCorreo.value = "";
            }catch(error){
                console.log(error);
                alert("Ha surgido un error al intentar guardar al proveedor, verifique la estructura del JSON. (Ver consola)");
            }
        } else {
            alert("Campos vacíos, todos los campos son obligatorios.");
        }
    }
}

// Eliminación de usuarios

var rdDeleteEmpleado = document.getElementById('optionDeleteEmpleado');
var rdDeleteCliente = document.getElementById('optionDeleteCliente');
var rdDeleteProveedor = document.getElementById('optionDeleteProveedor');

var frmgrpDeleteEmpleado = document.getElementById('deleteEmpleado');
var frmgrpDeleteCliente = document.getElementById('deleteCliente');
var frmgrpDeleteProveedor = document.getElementById('deleteProveedor');

var submitDeleteUser = document.getElementById("submitDeleteUser")
submitDeleteUser.addEventListener('click', function(event){
    event.preventDefault();
});

function tipoUsuarioEliminar(){
    if(rdDeleteEmpleado.checked){
        frmgrpDeleteEmpleado.style.display = 'block';
        frmgrpDeleteCliente.style.display = 'none';
        frmgrpDeleteProveedor.style.display = 'none';
    } else if(rdDeleteCliente.checked){
        frmgrpDeleteEmpleado.style.display = 'none';
        frmgrpDeleteCliente.style.display = 'block';
        frmgrpDeleteProveedor.style.display = 'none';
    } else if(rdDeleteProveedor.checked){
        frmgrpDeleteEmpleado.style.display = 'none';
        frmgrpDeleteCliente.style.display = 'none';
        frmgrpDeleteProveedor.style.display = 'block';
    }
}

function eliminarUsuario(){
    if(rdDeleteEmpleado.checked){
        eliminarVendedorSeleccionado();
    } else if(rdDeleteCliente.checked){
        
    } else if(rdDeleteProveedor.checked){
        eliminarProveedorSeleccionado();
    }
}

//ELIMINAR VENDEDOR
var selectVendedor = document.getElementById('idNombreDeleteEmpleado');

function actualizarSelectVendedores(){
    avl_vendedores.mostrarDatosVendedores(selectVendedor);
}
var userDltVendedor = document.getElementById('userDeleteEmpleado');
var edadDltVendedor = document.getElementById('edadDeleteEmpleado');
var correoDltVendedor = document.getElementById('correoDeleteEmpleado');
var vendedorSeleccionado = null;

function onchangeSelectVendedor(){
    let idVendedor = parseInt(selectVendedor.value);
    if(idVendedor != 0){
        vendedorSeleccionado = avl_vendedores.obtenerVendedorID(idVendedor);
        userDltVendedor.value = vendedorSeleccionado.username;
        edadDltVendedor.value = vendedorSeleccionado.edad;
        correoDltVendedor.value = vendedorSeleccionado.correo;
    }else{
        vendedorSeleccionado = null;
        userDltVendedor.value = "";
        edadDltVendedor.value = "";
        correoDltVendedor.value = "";
    }
}

function eliminarVendedorSeleccionado(){
    if(vendedorSeleccionado != null){
        eliminacionVendedor(vendedorSeleccionado);
        location.reload();
    }else{
        alert("Debe seleccionar un vendedor para su eliminación");
    }
}

//ELIMINAR PROVEEDOR
var selectProveedor = document.getElementById('idNombreDeleteProveedor');

function actualizarSelectProveedores(){
    binario_proveedores.mostrarDatosProveedores(selectProveedor);
}

var direccionDltProveedor = document.getElementById('direccionDeleteProveedor');
var telDltProveedor = document.getElementById('telDeleteProveedor');
var emailDltProveedor = document.getElementById('correoDeleteProveedor');
var proveedorSeleccionado = null;

function onchangeSelectProveedor(){
    let idProveedor = parseInt(selectProveedor.value);
    if(idProveedor != 0){
        proveedorSeleccionado = binario_proveedores.obtenerProveedor(idProveedor);
        direccionDltProveedor.value = proveedorSeleccionado.direccion;
        telDltProveedor.value = proveedorSeleccionado.telefono;
        emailDltProveedor.value = proveedorSeleccionado.correo;
    }else{
        proveedorSeleccionado = null;
        direccionDltProveedor.value = "";
        telDltProveedor.value = "";
        emailDltProveedor.value = "";
    }
}

function eliminarProveedorSeleccionado(){
    if(proveedorSeleccionado != null){
        eliminacionProveedor(proveedorSeleccionado);
        location.reload();
    }else{
        alert("Debe seleccionar un proveedor para su eliminación");
    }
}

// Cargas masivas

var radioCargaEmpleados = document.getElementById('cargaEmpleados');
var radioCargaClientes = document.getElementById('cargaClientes');
var radioCargaProveedores = document.getElementById('cargaProveedores');
var radioCargaEventos = document.getElementById('cargaEventos');

var submitCarga = document.getElementById("submitCarga")
submitCarga.addEventListener('click', function(event){
    event.preventDefault();
});

//Se maneja por aparte el inputFile ya que el FileReader es asíncrono, y necesitamos sincronía para la ejecución de múltiples funciones
var inputFile = document.getElementById('fileCarga');
inputFile.addEventListener('change', function(e){
    const reader = new FileReader();
    reader.onload = function(){
        localStorage.setItem("cargaJSON", reader.result);
    };
    if(typeof inputFile.files[0] !== 'undefined' && inputFile.files[0].name.split('.')[1] == 'json'){
        reader.readAsText(inputFile.files[0], 'UTF-8');
    }
}, false);


function cargaMasiva(){
    if(typeof inputFile.files[0] !== 'undefined'){
        if(inputFile.files[0].name.split('.')[1] == 'json'){
            try{
                if(radioCargaEmpleados.checked){
                    let cargaJSON = localStorage.getItem("cargaJSON");
                    if(cargaJSON != null){
                        let objetoVendedores = JSON.parse(cargaJSON);
                        try{
                            localStorage.setItem("vendedoresJSON", JSON.stringify(objetoVendedores.vendedores));
                            localStorage.removeItem("cargaJSON");
                            console.log("Se han guardado los vendedoresJSON correctamente...");
                            crearVendedores();
                        }catch(error){
                            console.log(error);
                            alert("Ha surgido un error al intentar guardar a los vendedores, verifique la estructura del JSON. (Ver consola)");
                        }
                    }else{
                        alert("Ha surgido un error al intentar guardar el JSON de vendedores en el localStorage.");
                    }
                } else if(radioCargaClientes.checked){
                    if(avl_vendedores.raiz != null){
                        let cargaJSON = localStorage.getItem("cargaJSON");
                        if(cargaJSON != null){
                            let objetoClientes = JSON.parse(cargaJSON);
                            try{
                                localStorage.setItem("clientesJSON", JSON.stringify(objetoClientes.vendedores));
                                localStorage.removeItem("cargaJSON");
                                console.log("Se han guardado los clientesJSON correctamente...");
                                crearClientes();
                            }catch(error){
                                console.log(error);
                                alert("Ha surgido un error al intentar guardar a los clientes, verifique la estructura del JSON. (Ver consola)");
                            }
                        }else{
                            alert("Ha surgido un error al intentar guardar el JSON de clientes en el localStorage.");
                        }
                    }else{
                        alert("Debe cargar empleados primero, para poder hacer la carga masiva de clientes.")
                    }
                } else if(radioCargaProveedores.checked){
                    let cargaJSON = localStorage.getItem("cargaJSON");
                    if(cargaJSON != null){
                        let objetoProveedores = JSON.parse(cargaJSON);
                        try{
                            localStorage.setItem("proveedoresJSON", JSON.stringify(objetoProveedores.proveedores));
                            localStorage.removeItem("cargaJSON");
                            console.log("Se han guardado los proveedoresJSON correctamente...");
                            crearProveedores();
                        }catch(error){
                            console.log(error);
                            alert("Ha surgido un error al intentar guardar a los proveedores, verifique la estructura del JSON. (Ver consola)");
                        }
                    }else{
                        alert("Ha surgido un error al intentar guardar el JSON de proveedores en el localStorage.");
                    }
                } else if(radioCargaEventos.checked){
                    if(avl_vendedores.raiz != null){
                        let cargaJSON = localStorage.getItem("cargaJSON");
                        if(cargaJSON != null){
                            let objetoEventos = JSON.parse(cargaJSON);
                            try{
                                localStorage.setItem("eventosJSON", JSON.stringify(objetoEventos.vendedores));
                                localStorage.removeItem("cargaJSON");
                                console.log("Se han guardado los eventosJSON correctamente...");
                                crearEventos();
                            }catch(error){
                                console.log(error);
                                alert("Ha surgido un error al intentar guardar a los eventos, verifique la estructura del JSON. (Ver consola)");
                            }
                        }else{
                            alert("Ha surgido un error al intentar guardar el JSON de eventos en el localStorage.");
                        }
                    }else{
                        alert("Debe cargar empleados primero, para poder hacer la carga masiva de eventos.")
                    }
                }
            }catch(error){
                console.log(error);
                alert("No ha sido posible realizar la carga masiva (Ver consola).");
            }
        }else {
            alert("El archivo debe ser JSON (extensión .json)");
        }
    } else {
        alert("Debes seleccionar un archivo para la carga masiva.");
    }
}