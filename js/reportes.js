
var containerGrafo = document.getElementById('grafo');
var textAreaDot = document.getElementById('textDot');

var radioReporteVendedores = document.getElementById('reporteEmpleados');
var radioReporteClientes = document.getElementById('reporteClientes');
var radioReporteCalendario = document.getElementById('reporteCalendario');
var radioReporteProveedores = document.getElementById('reporteProveedores');

var formgroupReporteClientes = document.getElementById('datosReporteClientes');
var formgrouppReporteCalendario = document.getElementById('datosReporteCalendario');

function datosAdicionales(){
    if(radioReporteClientes.checked){
        formgroupReporteClientes.style.display = 'block';
        formgrouppReporteCalendario.style.display = 'none';
    }else if(radioReporteCalendario.checked){
        formgroupReporteClientes.style.display = 'none';
        formgrouppReporteCalendario.style.display = 'block';
    }else{
        formgroupReporteClientes.style.display = 'none';
        formgrouppReporteCalendario.style.display = 'none';
    }
}

function generarGrafo(){
    if(radioReporteVendedores.checked){
        containerGrafo.innerHTML = ""
        textAreaDot.innerHTML = ""
        if(avl_vendedores.raiz != null){
            let DOTstring = avl_vendedores.obtenerDotVendedores();
            let parsedData = vis.parseDOTNetwork(DOTstring);
            let data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
              }
            let options = parsedData.options;
            options.nodes = {
                color: 'black'
              }
            options.layout = {
                hierarchical: {
                    direction: "UD",
                    sortMethod: "directed",
                }
            }    
            let grafoVendedores = new vis.Network(containerGrafo, data, options);
            grafoVendedores.setOptions({
                physics: {
                    enabled: false
                }
            });
            textAreaDot.innerHTML = DOTstring;
        }else{
            alert("No se han ingresado aún vendedores al sistema.")
        }
    }else if(radioReporteClientes.checked){
        if(avl_vendedores.raiz != null){
            let idVendedor = document.getElementById('idVendedorReporteClientes').value
            if(idVendedor != ""){
                idVendedor = parseInt(idVendedor);
                let DOTstring = avl_vendedores.obtenerDotClientesDeVendedor(avl_vendedores.raiz, idVendedor);
                if(DOTstring != null){
                    let parsedData = vis.parseDOTNetwork(DOTstring);
                    let data = {
                        nodes: parsedData.nodes,
                        edges: parsedData.edges
                      }
                    let options = parsedData.options;
                    options.layout = {
                        hierarchical: {
                            direction: "UD",
                            sortMethod: "directed",
                        }
                    }    
                    let grafoClientes = new vis.Network(containerGrafo, data, options);
                    grafoClientes.setOptions({
                        physics: {
                            enabled: false
                        }
                    });
                    textAreaDot.innerHTML = DOTstring;
                }else{
                    alert("No se encontró a un vendedor con el ID especificado.");
                }
            }else{
                alert("Debe ingresar el ID del vendedor del cual se desee reportar sus clientes.");
            }
        }else{
            alert("No se han ingresado aún vendedores al sistema, no es posible generar el reporte de clientes.");
        }
    }else if(radioReporteCalendario.checked){
        if(avl_vendedores.raiz != null){
            let idVendedor = document.getElementById('idVendedorReporteCalendario').value
            if(idVendedor != ""){
                idVendedor = parseInt(idVendedor);
                let mesSeleccionado = document.getElementById('mesReporteCalendario').value;
                mesSeleccionado = parseInt(mesSeleccionado); // 1 - 12
                let DOTstring = avl_vendedores.obtenerDotEventosDeVendedor(avl_vendedores.raiz, idVendedor, mesSeleccionado);
                if(DOTstring != null){
                    let parsedData = vis.parseDOTNetwork(DOTstring);
                    let data = {
                        nodes: parsedData.nodes,
                        edges: parsedData.edges
                      }
                    let options = parsedData.options;
                    let grafoMatrizEventos = new vis.Network(containerGrafo, data, options);
                    grafoMatrizEventos.setOptions({
                        physics: {
                            enabled: false
                        },
                        edges:{
                            smooth: false
                        }
                    });
                    textAreaDot.innerHTML = DOTstring;
                }else{
                    alert("No se pudo generar el grafo de eventos, verifique que el ID exista en el sistema, y que el vendedor posea eventos en el mes.");
                }
            }else{
                alert("Debe ingresar el ID del vendedor del cual se desee generar su calendario de eventos.");
            }
        }else{
            alert("No se han ingresado aún vendedores al sistema, no es posible generar el reporte de eventos.")
        }
    }else if(radioReporteProveedores.checked){
        containerGrafo.innerHTML = ""
        textAreaDot.innerHTML = ""
        if(binario_proveedores.raiz != null){
            let DOTstring = binario_proveedores.generarDotProveedores();
            let parsedData = vis.parseDOTNetwork(DOTstring);
            let data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
              }
            let options = parsedData.options;
            options.nodes = {
                color: 'black'
              }
            options.layout = {
                hierarchical: {
                    direction: "UD",
                    sortMethod: "directed",
                }
            }
            let grafoProveedores = new vis.Network(containerGrafo, data, options);
            grafoProveedores.setOptions({
                physics: {
                    enabled: false
                }
            });
            textAreaDot.innerHTML = DOTstring;
        }else{
            alert("No se han ingresado aún proveedores al sistema.")
        }
    }
}