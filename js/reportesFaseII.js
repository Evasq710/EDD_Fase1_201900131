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

function reporteOptimo(){
    document.getElementById("labelRutaOptima").innerHTML = ""
    let idBodegaInicio = parseInt(document.getElementById("idNodoOrigen").value);
    let idBodegaFinal = parseInt(document.getElementById("idNodoDestino").value);
    let recorrido = grafoRutas.costoUniforme(idBodegaInicio, idBodegaFinal);
    if(recorrido != null){
        try{
            recorrido = recorrido.reverse();
            let distanciaRecorrida = recorrido[0][1]; // SEGUNDA DIMENSIÓN: [0] -> id de la bodega, [1] -> La distancia acumulada, [2] -> idAntecesor
            
            let listaIdsRuta = [];
            listaIdsRuta.push(recorrido[0][0]); // Empezando desde el nodo final o destino
            let idAntecesor = recorrido[0][2];

            
            recorrido.every(function(bodegaRecorrida, index){
                if(idAntecesor != null){
                    if(this[index][0] == idAntecesor){

                        // Verificando que no exista un camino más corto para el nodo actual (idAntecesor)
                        let nuevoIndex = null;
                        recorrido.forEach(function(bodega, i){
                            if(this[i][0] == idAntecesor){
                                if(i > index){
                                    // Se encontró un nodo más eficiente en i
                                    nuevoIndex = i;
                                }
                            }
                        }, recorrido);

                        if(nuevoIndex != null){
                            listaIdsRuta.push(this[nuevoIndex][0]);
                            idAntecesor = this[nuevoIndex][2];
                        }else{
                            listaIdsRuta.push(this[index][0]);
                            idAntecesor = this[index][2];
                        }
                    }
                }else{
                    listaIdsRuta.push(this[index][0]);
                    return false;
                }
                return true;
            }, recorrido);

            generarGrafoRutaOptima(listaIdsRuta, distanciaRecorrida);
        }catch(error){
            console.log(error);
            alert("Ocurrió un error en la interpretación del recorrido encontrado (ver consola).")
        }
    }else{
        alert(`No se pudo encontrar una ruta de bodega ${idBodegaInicio} a bodega ${idBodegaFinal}.`)
    }
}

var containerGrafoRutaOptima = document.getElementById('grafoRutaOptima');
var textAreaDotRutaOptima = document.getElementById('textDotRutaOptima');

function generarGrafoRutaOptima(listaIdsRuta, distanciaRecorrida){
    containerGrafoRutaOptima.innerHTML = ""
    textAreaDotRutaOptima.innerHTML = ""
    if(grafoRutas.primero != null){
        try{
            let DOTstring = grafoRutas.generarDotGrafoRutaOptima(listaIdsRuta);
            let parsedData = vis.parseDOTNetwork(DOTstring);
            let data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
                }
            let options = parsedData.options;
            let grafoGeneradoRutaOptima = new vis.Network(containerGrafoRutaOptima, data, options);
            grafoGeneradoRutaOptima.setOptions({
                physics: {
                    enabled: false
                }
            });
            document.getElementById("labelRutaOptima").innerHTML = `<h2>Distancia más corta encontrada: ${distanciaRecorrida} km</h2>`
            textAreaDotRutaOptima.innerHTML = DOTstring;
        }catch(error){
            console.log(error);
            alert("Ocurrió un error al tratar de generar el grafo de la ruta óptima (ver consola).")
        }
    }else{
        alert("No se han ingresado aún rutas al sistema.")
    }
}

// BLOCKCHAIN

var containerBlockchain = document.getElementById('grafoBlockchain');
var textAreaDotBlockchain = document.getElementById('textDotBlockchain');

function generarGrafoBlockchain(){
    try{
        containerBlockchain.innerHTML = ""
        textAreaDotBlockchain.innerHTML = ""
        let DOTstring = blockchainTransacciones.generarDotBlockchain();
        let parsedData = vis.parseDOTNetwork(DOTstring);
        let data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
            }
        let options = parsedData.options;
        options.nodes = {
            color: 'lightblue'
        }  
        let grafoBlockchain = new vis.Network(containerBlockchain, data, options);
        grafoBlockchain.setOptions({
            physics: {
                enabled: false
            }
        });
        textAreaDotBlockchain.innerHTML = DOTstring;
    }catch(error){
        console.log(error);
        let DOTstring = blockchainTransacciones.generarDotBlockchain();
        textAreaDotBlockchain.innerHTML = DOTstring;
        alert("Ocurrió un error en la generación del grafo de blockchain (Ver consola).")
    }
}