'use strict'

// INVENTARIO

var containerGrafoProductos = document.getElementById('grafoProductos');
var textAreaDotProductos = document.getElementById('textDotProductos');

function generarGrafoProductos(){
    containerGrafoProductos.innerHTML = ""
    textAreaDotProductos.innerHTML = ""
    if(productosArbolB.raiz != null){
        let DOTstring = productosArbolB.graficarArbolB();
        let parsedData = vis.parseDOTNetwork(DOTstring);
        let data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
            }
        let options = parsedData.options;
        options.nodes = {
            color: 'lightblue'
            }  
        let grafoProductos = new vis.Network(containerGrafoProductos, data, options);
        grafoProductos.setOptions({
            physics: {
                enabled: false
            }
        });
        textAreaDotProductos.innerHTML = DOTstring;
    }else{
        alert("No se han ingresado aún productos al sistema.")
    }
}

// VENTAS

var containerGrafoVentasGlobal = document.getElementById('grafoVentasGlobal');
var textAreaDotVentasGlobal = document.getElementById('textDotVentasGlobal');

function generarGrafoVentasGlobal(){
    containerGrafoVentasGlobal.innerHTML = ""
    textAreaDotVentasGlobal.innerHTML = ""
    let DOTstring = tablaHashVentas.generarDotHash();
    let parsedData = vis.parseDOTNetwork(DOTstring);
    let data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
        }
    let options = parsedData.options;
    let grafoVentasGlobal = new vis.Network(containerGrafoVentasGlobal, data, options);
    grafoVentasGlobal.setOptions({
        physics: {
            enabled: false
        }
    });
    textAreaDotVentasGlobal.innerHTML = DOTstring;
}

var containerGrafoVentasIndividual = document.getElementById('grafoVentasIndividual');
var textAreaDotVentasIndividual= document.getElementById('textDotVentasIndividual');

function generarGrafoVentasIndividual(){
    let inputIdVendedor = document.getElementById('idVendedorReporteVentas');
    if(inputIdVendedor.value != ""){
        let idVendedor = parseInt(inputIdVendedor.value);

        containerGrafoVentasIndividual.innerHTML = ""
        textAreaDotVentasIndividual.innerHTML = ""
        // Función especial para generar la tabla hash individual
        let DOTstring = crearHashIndividual(idVendedor);
        let parsedData = vis.parseDOTNetwork(DOTstring);
        let data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
            }
        let options = parsedData.options;
        let grafoVentasIndividual = new vis.Network(containerGrafoVentasIndividual, data, options);
        grafoVentasIndividual.setOptions({
            physics: {
                enabled: false
            }
        });
        textAreaDotVentasIndividual.innerHTML = DOTstring;
    }else{
        alert("Debe ingresar el id del vendedor.")
    }
}

// RUTAS

var containerGrafoRutas = document.getElementById('container-grafoRutas');
var textAreaDotRutas = document.getElementById('textDotRutas');

function generarGrafoRutas(){
    containerGrafoRutas.innerHTML = ""
    textAreaDotRutas.innerHTML = ""
    if(grafoRutas.primero != null){
        let DOTstring = grafoRutas.generarDotGrafo();
        let parsedData = vis.parseDOTNetwork(DOTstring);
        let data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
            }
        let options = parsedData.options;
        options.nodes = {
            color: 'lightblue'
        }  
        let grafoGeneradoRutas = new vis.Network(containerGrafoRutas, data, options);
        grafoGeneradoRutas.setOptions({
            physics: {
                enabled: false
            }
        });
        textAreaDotRutas.innerHTML = DOTstring;
    }else{
        alert("No se han ingresado aún rutas al sistema.")
    }
}