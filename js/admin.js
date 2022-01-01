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
                inputId.value = "";
                inputUser.value = "";
                inputNombre.value = "";
                inputEdad.value = "";
                inputCorreo.value = "";
                inputPass.value = "";
                location.reload();
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
                inputIdVendedor.value = "";
                inputId.value = "";
                inputNombre.value =  "";
                inputCorreo.value = "";
                location.reload();
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
                inputId.value = "";
                inputNombre.value = "";
                inputDireccion.value = "";
                inputTelefono.value = "";
                inputCorreo.value = "";
                location.reload();
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
        eliminarClienteSeleccionado();
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

//ELIMINAR CLIENTE
var selectCliente = document.getElementById('idNombreDeleteCliente');

function actualizarSelectClientes(){
    avl_vendedores.mostrarDatosClientes(selectCliente);
}
var correoDltCliente = document.getElementById('correoDeleteCliente');
var clienteSeleccionado = null;

function onchangeSelectCliente(){
    let idCliente = parseInt(selectCliente.value);
    let arrCliente = selectCliente[selectCliente.selectedIndex].innerHTML.split('-');
    if(idCliente != 0){
        clienteSeleccionado = avl_vendedores.obtenerCliente(idCliente, arrCliente[1]);
        correoDltCliente.value = clienteSeleccionado.correo;
    }else{
        clienteSeleccionado = null;
        correoDltCliente.value = "";
    }
}

function eliminarClienteSeleccionado(){
    if(clienteSeleccionado != null){
        eliminacionCliente(clienteSeleccionado);
        location.reload();
    }else{
        alert("Debe seleccionar un cliente para su eliminación");
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
                            location.reload();
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
                                location.reload();
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
                            location.reload();
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
                                location.reload();
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

// ************************* FASE II *******************************

// CONTROL DE VISTAS INVENTARIO
var formgroupCrearProducto = document.getElementById('nuevoProducto');
var formgroupCargaProductos = document.getElementById('cargaProductos');
var formgroupGrafoProductos = document.getElementById('reporteProductos');

function gestionNuevoProducto(){
    formgroupCrearProducto.style.display = 'block';
    formgroupCargaProductos.style.display = 'none';
    formgroupGrafoProductos.style.display = 'none';
}

function gestionCargaProductos(){
    formgroupCrearProducto.style.display = 'none';
    formgroupCargaProductos.style.display = 'block';
    formgroupGrafoProductos.style.display = 'none';
}

function gestionReporteProductos(){
    formgroupCrearProducto.style.display = 'none';
    formgroupCargaProductos.style.display = 'none';
    formgroupGrafoProductos.style.display = 'block';
}

// CONTROL DE VISTAS VENTAS
var formgroupCrearVenta = document.getElementById('nuevaVenta');
var formgroupCargaVentas = document.getElementById('cargaVentas');
var formgroupReporteVentas = document.getElementById('reporteVentas');

function gestionNuevaVenta(){
    formgroupCrearVenta.style.display = 'block';
    formgroupCargaVentas.style.display = 'none';
    formgroupReporteVentas.style.display = 'none';
}

function gestionCargaVentas(){
    formgroupCrearVenta.style.display = 'none';
    formgroupCargaVentas.style.display = 'block';
    formgroupReporteVentas.style.display = 'none';
}

function gestionReporteVentas(){
    formgroupCrearVenta.style.display = 'none';
    formgroupCargaVentas.style.display = 'none';
    formgroupReporteVentas.style.display = 'block';
}

// CONTROL DE VISTAS RUTAS
var formgroupCargaRutas = document.getElementById('cargaRutas');
var formgroupReporteRutas = document.getElementById('reporteRutas');
var formgroupRutaOptima = document.getElementById('rutasOptimas');

function gestionCargaRutas(){
    formgroupCargaRutas.style.display = 'block';
    formgroupReporteRutas.style.display = 'none';
    formgroupRutaOptima.style.display = 'none';
}

function gestionReporteRutas(){
    formgroupCargaRutas.style.display = 'none';
    formgroupReporteRutas.style.display = 'block';
    formgroupRutaOptima.style.display = 'none';
}

function gestionRutaOptima(){
    formgroupCargaRutas.style.display = 'none';
    formgroupReporteRutas.style.display = 'none';
    formgroupRutaOptima.style.display = 'block';
}

// ----- INVENTARIO ------

var inputFileProductos = document.getElementById('fileCargaProductos');
inputFileProductos.addEventListener('change', function(e){
    const reader = new FileReader();
    reader.onload = function(){
        localStorage.setItem("cargaProductosJSON", reader.result);
    };
    if(typeof inputFileProductos.files[0] !== 'undefined' && inputFileProductos.files[0].name.split('.')[1] == 'json'){
        reader.readAsText(inputFileProductos.files[0], 'UTF-8');
    }
}, false);

// REGISTRO INDIVIDUAL DE PRODUCTOS
function registrarProducto(){
    let inputId = document.getElementById('idNuevoProducto');
    let inputNombre = document.getElementById('nombreNuevoProducto');
    let inputPrecio = document.getElementById('precioNuevoProducto');
    let inputCantidad = document.getElementById('cantidadNuevoProducto');

    if((inputId.value != "") && (inputNombre.value != "") && (inputPrecio.value != "") && (inputCantidad.value != "")){
        let nuevoProducto = [{
            'id': parseInt(inputId.value),
            'nombre': inputNombre.value,
            'precio': parseFloat(inputPrecio.value),
            'cantidad': parseInt(inputCantidad.value)
        }]
        try{
            localStorage.setItem("productosJSON", JSON.stringify(nuevoProducto));
            console.log("Se ha guardado productosJSON correctamente...");
            crearProductos();
            inputId.value = "";
            inputNombre.value = "";
            inputPrecio.value = "";
            inputCantidad.value = "";
        }catch(error){
            console.log(error);
            alert("Ha surgido un error al intentar guardar el producto, verifique la estructura del JSON. (Ver consola)");
        }
    } else {
        alert("Campos vacíos, todos los campos son obligatorios.");
    }
}

// CARGA MASIVA PRODUCTOS
function cargaMasivaProductos(){
    if(typeof inputFileProductos.files[0] !== 'undefined'){
        if(inputFileProductos.files[0].name.split('.')[1] == 'json'){
            try{
                let cargaProductosJSON = localStorage.getItem("cargaProductosJSON");
                if(cargaProductosJSON != null){
                    let objetoProductos = JSON.parse(cargaProductosJSON);
                    try{
                        localStorage.setItem("productosJSON", JSON.stringify(objetoProductos.productos));
                        localStorage.removeItem("cargaProductosJSON");
                        console.log("Se han guardado los productosJSON correctamente...");
                        crearProductos();
                    }catch(error){
                        console.log(error);
                        alert("Ha surgido un error al intentar guardar a los productos, verifique la estructura del JSON. (Ver consola)");
                    }
                }else{
                    alert("Ha surgido un error al intentar guardar el JSON de productos en el localStorage.");
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

// ----- VENTAS ------

var inputFileVentas = document.getElementById('fileCargaVentas');
inputFileVentas.addEventListener('change', function(e){
    const reader = new FileReader();
    reader.onload = function(){
        localStorage.setItem("cargaVentasJSON", reader.result);
    };
    if(typeof inputFileVentas.files[0] !== 'undefined' && inputFileVentas.files[0].name.split('.')[1] == 'json'){
        reader.readAsText(inputFileVentas.files[0], 'UTF-8');
    }
}, false);

// CARGA MASIVA VENTAS
function cargaMasivaVentas(){
    if(typeof inputFileVentas.files[0] !== 'undefined'){
        if(inputFileVentas.files[0].name.split('.')[1] == 'json'){
            try{
                let cargaVentasJSON = localStorage.getItem("cargaVentasJSON");
                if(cargaVentasJSON != null){
                    let objetoVentas = JSON.parse(cargaVentasJSON);
                    try{
                        localStorage.setItem("ventasJSON", JSON.stringify(objetoVentas.ventas));
                        localStorage.removeItem("cargaVentasJSON");
                        console.log("Se han guardado las ventasJSON correctamente...");
                        crearVentas();
                    }catch(error){
                        console.log(error);
                        alert("Ha surgido un error al intentar guardar a las ventas, verifique la estructura del JSON. (Ver consola)");
                    }
                }else{
                    alert("Ha surgido un error al intentar guardar el JSON de ventas en el localStorage.");
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