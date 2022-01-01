'use strict'

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