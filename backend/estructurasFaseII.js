'use strict'

// ************* ARBOL B DE ORDEN P PARA PRODUCTOS *************

// NODO ARBOL B
class nodoB{
    constructor(producto){
        this.dato = producto.id;
        this.producto = producto;
        //apuntadores de lista (tipo nodoB)
        this.siguiente = null;
        this.anterior = null;
        //apuntadores de arbol (tipo página)
        this.izquierda = null;
        this.derecha = null;
    }
}

// LISTA ORDENADA PARA ALMACENAR LOS VALORES, ESTA ESTARÁ EN LAS PÁGINAS
class listaNodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    insertarNodoB(nuevoNodo){
        if (this.primero == null){
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
            this.size++;
            return true;
        }else{
            if(nuevoNodo.dato < this.primero.dato){
                nuevoNodo.siguiente = this.primero;
                this.primero.anterior = nuevoNodo;
                //Cambiando los punteros de las páginas
                // [nuevoNodo]-puntero a página derecha- -puntero a página izquierda-[this.primero]
                this.primero.izquierda = nuevoNodo.derecha;
                // --------------------------------------------
                this.primero = nuevoNodo;
                this.size++;
                return true;
            }
            if(nuevoNodo.dato > this.ultimo.dato){
                this.ultimo.siguiente = nuevoNodo;
                nuevoNodo.anterior = this.ultimo;
                //Cambiando los punteros de las páginas
                // [this.ultimo]-puntero a página derecha- -puntero a página izquierda-[nuevoNodo]
                this.ultimo.derecha = nuevoNodo.izquierda;
                // --------------------------------------------
                this.ultimo = nuevoNodo;
                this.size++;
                return true;
            }
            // El nodo debe de estar entre el primero y el último
            let nodoActual = this.primero;
            while(nodoActual != null){
                if(nuevoNodo.dato < nodoActual.dato){
                    nuevoNodo.siguiente = nodoActual;
                    nuevoNodo.anterior = nodoActual.anterior;
                    //Cambiando los punteros de las páginas
                    // [nodoActual.anterior] v [nuevoNodo] v [nodoActual]
                    nodoActual.izquierda = nuevoNodo.derecha;
                    nodoActual.anterior.derecha = nuevoNodo.izquierda;
                    // --------------------------------------------
                    nodoActual.anterior.siguiente = nuevoNodo;
                    nodoActual.anterior = nuevoNodo;
                    this.size++;
                    return true;
                }
                if(nuevoNodo.dato == nodoActual.dato){
                    console.log(`Ya existe un nodoB en la lista con el dato ${nuevoNodo.dato}, no se pudo hacer la inserción`)
                    return false
                }
                nodoActual = nodoActual.siguiente;
            }
            console.log(`Error, el algoritmo no está ingresando el nodoB con el dato ${nuevoNodo.dato} a la lista, verificar código.`)
            return false;
        }
    }
}

// PAGINA DEL ARBOL B
class paginaArbolB{
    constructor(orden){
        this.esRaiz = false;
        this.orden = orden;
        this.clavesMinimas = (orden-1)/2;
        this.clavesMaximas = orden - 1;
        this.size = 0;
        this.listaClaves = new listaNodoB();
    }

    insertarNodoEnPagina(nodo){
        let insertado = this.listaClaves.insertarNodoB(nodo);
        if(insertado){
            this.size = this.listaClaves.size;
            if(this.size <= this.clavesMaximas){
                // Si el retorno es la instancia de una página (este caso), el tamaño de la página es el correcto, solo se asigna
                // Si el retorno es la instancia de un nodo, la página se dividió
                return this;
            }
            // this.size > this.clavesMaximas
            // this.size == this.orden
            // Retorno de un nodoB, que contendrá como páginas a la página dividida
            return this.dividirPagina(this);
        }
        //Ocurrió un error en la inserción
        return null;
    }

    dividirPagina(pagina){
        let nodoMedio = pagina.listaClaves.primero;
        let posNodoMedio;
        for(posNodoMedio = 0; posNodoMedio < (pagina.clavesMaximas/2); posNodoMedio++){
            //Para posicionarnos en la mediana, la mitad de la página
            //Si el orden = 5, claves máximas = 4, for posNodoMedio = 0; posNodoMedio < 2; posNodoMedio++
            nodoMedio = nodoMedio.siguiente;
        }

        //Pasar todos los valores de la página a nodos independientes
        let nodosPagina = [];
        let actual = pagina.listaClaves.primero;
        while(actual != null){
            nodosPagina.push(actual);
            actual = actual.siguiente;
        }
        pagina.listaClaves.primero = null;
        pagina.listaClaves.ultimo = null;
        pagina.listaClaves.size = 0;

        //Creando las nuevas páginas izquerda y derecha, resultado de la división de la página
        let paginaIzquierda = new paginaArbolB(pagina.orden);
        let paginaDerecha = new paginaArbolB(pagina.orden);

        let contador = 0;
        nodosPagina.forEach(nodo => {
            nodo.anterior = null;
            nodo.siguiente = null;
            if(contador < posNodoMedio){
                // Si el orden = 5, contador0, contador1, contador2 == posNodoMedio se ignora
                paginaIzquierda.insertarNodoEnPagina(nodo);
            }else if(contador > posNodoMedio){
                // Si el orden = 5, contador2 == posNodoMedio se ignora, contador3, contador4
                paginaDerecha.insertarNodoEnPagina(nodo);
            }
            contador++;
        });
        nodoMedio.izquierda = paginaIzquierda;
        nodoMedio.derecha = paginaDerecha;
        // Retorno de un nodoB, que contendrá como páginas a la página dividida
        return nodoMedio;
    }

    paginaEsHoja(){
        if(this.listaClaves.primero.izquierda == null){
            return true;
        }
        return false;
    }
}

// ARBOL B
class arbolBProductos{
    constructor(orden){
        this.raiz = null;
        this.orden = orden;
        this.altura = 0;
    }

    insertarNuevoProducto(producto){
        let nuevoNodo = new nodoB(producto);

        if(this.raiz == null){
            this.raiz = new paginaArbolB(this.orden);
            this.raiz.raiz = true;
            // Retorna una instancia de pagina en este punto
            this.raiz = this.raiz.insertarNodoEnPagina(nuevoNodo);
        }else if(this.altura == 0){
            // Insertando en la raíz
            let respuesta = this.raiz.insertarNodoEnPagina(nuevoNodo);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página, la raiz no se dividió
                this.raiz = respuesta;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es una página dividida, la raíz se dividió
                this.altura++;
                this.raiz = new paginaArbolB(this.orden);
                this.raiz = this.raiz.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 1, un retorno de insertarNodoEnPagina no fue ni página ni nodo.")
            }
        }else{
            // Existe más de una página, se debe recorrer el árbol para hacer la inserción
            let respuesta = this.insertarRecorrer(nuevoNodo, this.raiz);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página, la raiz no se dividió
                this.raiz = respuesta;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es una página dividida, la raíz se dividió
                this.altura++;
                this.raiz = new paginaArbolB(this.orden);
                this.raiz = this.raiz.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 2, un retorno de insertarRecorrer no fue ni página ni nodo.")
            }
        }
    }

    insertarRecorrer(nuevoNodo, paginaActual){
        if(paginaActual.paginaEsHoja()){
            let respuesta = paginaActual.insertarNodoEnPagina(nuevoNodo);
            // instancia de una página, o de un nodo B en caso se haya dividido
            return respuesta;
        }
        if(nuevoNodo.dato < paginaActual.listaClaves.primero.dato){
            let respuesta = this.insertarRecorrer(nuevoNodo, paginaActual.listaClaves.primero.izquierda);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página
                paginaActual.listaClaves.primero.izquierda = respuesta;
                return paginaActual;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es la página izquierda dividida, se debe insertar en la página actual
                return paginaActual.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 3, un retorno de insertarRecorrer no fue ni página ni nodo.")
            }
        }else if(nuevoNodo.dato > paginaActual.listaClaves.ultimo.dato){
            let respuesta = this.insertarRecorrer(nuevoNodo, paginaActual.listaClaves.ultimo.derecha);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página
                paginaActual.listaClaves.ultimo.derecha = respuesta;
                return paginaActual;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es la página derecha dividida, se debe insertar en la página actual
                return paginaActual.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 4, un retorno de insertarRecorrer no fue ni página ni nodo.")
            }
        }else{
            //El nuevoNodo se ubica entre los apuntadores de en medio
            let nodoActual = paginaActual.listaClaves.primero;
            while(nodoActual != null){
                if(nuevoNodo.dato < nodoActual.dato){
                    let respuesta = this.insertarRecorrer(nuevoNodo, nodoActual.izquierda);
                    if(respuesta instanceof paginaArbolB){
                        // La inserción está dentro del tamaño permitido de la página
                        nodoActual.izquierda = respuesta;
                        nodoActual.anterior.derecha = respuesta;
                        return paginaActual;
                    }else if(respuesta instanceof nodoB){
                        // respuesta es un nodoB, el cual es la página izquierda dividida, se debe insertar en la página actual
                        return paginaActual.insertarNodoEnPagina(respuesta);
                    }
                }
                if(nuevoNodo.dato == nodoActual.dato){
                    return paginaActual;
                }
                nodoActual = nodoActual.siguiente;
            }
        }

        return this;
    }

    obtenerTablaProductos(){
        let cadena=""
        cadena += this.obtenerFilasProductos(this.raiz);
        return cadena;
    }

    obtenerFilasProductos(raizActual){
        let cadena="";
        if(raizActual != null){
            if(raizActual.paginaEsHoja()){
                // Graficando la página con todos los nodos
                let auxiliar = raizActual.listaClaves.primero;
                while(auxiliar!=null){
                    cadena += `
                    <tr class="table-secondary">
                      <th scope="row">${auxiliar.dato}</th>
                      <td>${auxiliar.producto.nombre}</td>
                      <td>Q</td>
                      <td>${auxiliar.producto.precio}</td>
                      <td>${auxiliar.producto.cantidad}</td>
                      <td>
                        <input type="number" id="producto${auxiliar.dato}CantidadVenta" min="0" max="${auxiliar.producto.cantidad}" placeholder="0"/>
                      </td>
                    </tr>`
                    auxiliar= auxiliar.siguiente;
                }
            }else{
                // Graficando la página raiz con todos los nodos
                let auxiliar = raizActual.listaClaves.primero;
                while(auxiliar!=null){
                    cadena += `
                    <tr class="table-secondary">
                      <th scope="row">${auxiliar.dato}</th>
                      <td>${auxiliar.producto.nombre}</td>
                      <td>Q</td>
                      <td>${auxiliar.producto.precio}</td>
                      <td>${auxiliar.producto.cantidad}</td>
                      <td>
                        <input type="number" id="producto${auxiliar.dato}CantidadVenta" min="0" max="${auxiliar.producto.cantidad}" placeholder="0"/>
                      </td>
                    </tr>`
                    auxiliar= auxiliar.siguiente;
                }
    
                //recorrer los hijos de cada nodo
                auxiliar = raizActual.listaClaves.primero;
                while(auxiliar != null){
                    cadena+= this.obtenerFilasProductos(auxiliar.izquierda);
                    auxiliar = auxiliar.siguiente;
                }
                cadena+= this.obtenerFilasProductos(raizActual.listaClaves.ultimo.derecha);
            }  
        }
        return cadena;
    }

    graficarArbolB(){
        let cadena="digraph arbolB{\nrankr=TB;\n";
        cadena+="graph[label=\"Arbol B Productos\"]; \nnode[shape = \"box\", style=\"filled\", fillcolor=\"lightblue\"];\n";
        cadena+= this.graficarNodos(this.raiz);
        cadena+=  this.graficarEnlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    graficarNodos(raizActual){
        let cadena="";
        if(raizActual != null){
            if(raizActual.paginaEsHoja()){
                // Graficando la página con todos los nodos
                cadena+="node[shape=record label= \"<p0>"
                let contador=0;
                let auxiliar = raizActual.listaClaves.primero;
                while(auxiliar!=null){
                    contador++;
                    cadena+=`|{${auxiliar.dato}\\n${auxiliar.producto.nombre}\\nPrecio: Q ${auxiliar.producto.precio}\\nCantidad: ${auxiliar.producto.cantidad}}|<p${contador}>`;
                    auxiliar= auxiliar.siguiente;
                }
                cadena+="\"]"+raizActual.listaClaves.primero.dato+";\n";
            }else{
                // Graficando la página raiz con todos los nodos
                cadena+="node[shape=record label= \"<p0>"
                let contador=0;
                let auxiliar = raizActual.listaClaves.primero;
                while(auxiliar!=null){
                    contador++;
                    cadena+=`|{${auxiliar.dato}\\n${auxiliar.producto.nombre}\\nPrecio: Q ${auxiliar.producto.precio}\\nCantidad: ${auxiliar.producto.cantidad}}|<p${contador}>`;
                    auxiliar= auxiliar.siguiente;
                }
                cadena+="\"]"+raizActual.listaClaves.primero.dato+";\n";
    
                //recorrer los hijos de cada nodo
                auxiliar = raizActual.listaClaves.primero;
                while(auxiliar != null){
                    cadena+= this.graficarNodos(auxiliar.izquierda);
                    auxiliar = auxiliar.siguiente;
                }
                cadena+= this.graficarNodos(raizActual.listaClaves.ultimo.derecha);
            }  
        }
        return cadena;
    }

    graficarEnlaces(raizActual){
        let cadena="";
        if(raizActual != null){
            if(raizActual.paginaEsHoja()){
                return ""+raizActual.listaClaves.primero.dato+";\n";
            }else{
                let aux = raizActual.listaClaves.primero;
                let contador =0;
                let txtRaizActual = raizActual.listaClaves.primero.dato;
                while(aux != null){
                    cadena+= "\n"+txtRaizActual+":p"+contador+"->"+this.graficarEnlaces(aux.izquierda);
                    contador++;
                    aux = aux.siguiente;
                }
                cadena+="\n"+txtRaizActual+":p"+contador+"->"+this.graficarEnlaces(raizActual.listaClaves.ultimo.derecha);
            }
        }
        return cadena;
    }
}

// ************* TABLA HASH DE VENTAS, CON LISTA ENLAZADA DE PRODUCTOS *************

// LISTA ENLAZADA DE PRODUCTOS
class nodoProductoVendido{
    constructor(productoVendido){
        this.dato = productoVendido.id;
        // id, cantidad, NOMBRE, PRECIO
        this.productoVendido = productoVendido;
        try{
            this.subtotal = productoVendido.cantidad * productoVendido.precio;
        }catch(error){
            this.subtotal = 0;
            console.log(error);
            console.log("ADVERTENCIA! revisar etiquetas JSON de productos vendidos. Error en cantidad*precio");
        }
        this.siguiente = null;
    }
}

class listaSimpleProductos{
    constructor(){
        this.primero = null;
    }

    insertarProductoVendido(productoVendido){
        let nuevo = new nodoProductoVendido(productoVendido);
        if(this.primero == null){
            this.primero = nuevo;
        }else{
            let nodoActual = this.primero;
            while(nodoActual.siguiente != null){
                nodoActual = nodoActual.siguiente;
            };
            nodoActual.siguiente = nuevo;
        }
    }

    obtenerTotal(){
        let total = 0;
        let nodoActual = this.primero;
        while(nodoActual != null){
            total += nodoActual.subtotal;
            nodoActual = nodoActual.siguiente;
        }
        return total;
    }

    mostrarProductosVendidos(){
        let nodoActual = this.primero;
        console.log("***** Productos vendidos *****")
        while(nodoActual != null){
            console.log("-> " + nodoActual.dato);
            console.log(`${nodoActual.productoVendido.nombre}`);
            nodoActual = nodoActual.siguiente;
        }
    }
}

// TABLA HASH CON NODOS VENTA, CON TODAS LAS VENTAS REGISTRADAS EN UNA LISTA SIMPLE
class nodoVenta{
    constructor(venta, idVentaAutomatico){
        // TODO Verificar que la etiqueta del vendedor venga así, "id"
        this.dato = venta.id;
        // vendedor, id (vendedor), cliente, array productos
        this.venta = venta;
        // total se calcula con la suma de los subtotales de los nodos nodoProductoVendido
        this.total = 0;
        this.idVenta = idVentaAutomatico;
        this.productosVendidos = new listaSimpleProductos();
    }
}

class hashCerradoVentas{
    constructor(size, porcentajeMax){
        this.listaVentas = this.iniciarLista(size);
        this.clavesUsadas = 0;
        this.size = size;
        this.porcentajeMax = porcentajeMax;
    }

    iniciarLista(size){
        let listaVentas = [];
        for(let i = 0; i < size; i++){
            listaVentas[i] = null;
        }
        return listaVentas;
    }

    insertarVenta(venta, idVenta = 0){
        let nuevoNodo;
        if(idVenta == 0){
            nuevoNodo = new nodoVenta(venta, this.clavesUsadas + 1);
        }else{
            nuevoNodo = new nodoVenta(venta, idVenta);
        }
        // Insertando los productos vendidos en la lista simple del nodo venta
        let arrProductosVendidos = venta.productos;
        arrProductosVendidos.forEach(productoVendido => {
            nuevoNodo.productosVendidos.insertarProductoVendido(productoVendido);
        });
        nuevoNodo.total = nuevoNodo.productosVendidos.obtenerTotal();
        // console.log(`Total de venta: ${nuevoNodo.total}`);
        // console.log(`ID generado automáticamente de venta: ${nuevoNodo.idVenta}`);
        // nuevoNodo.productosVendidos.mostrarProductosVendidos();

        // Obteniendo la posición de la venta en la tabla hash
        let index = this.funcionDivision(nuevoNodo.dato);
        if(this.listaVentas[index] == null){
            this.listaVentas[index] = nuevoNodo;
            this.clavesUsadas++;
        }else{
            //colisión
            console.log(">> COLISIÓN, RESOLUCIÓN POR PRUEBA CUADRÁTICA")
            index = this.resolucionColisiones(index);
            this.listaVentas[index] = nuevoNodo;
            this.clavesUsadas++;
        }
        this.rehashing();
    }

    funcionDivision(dato){
        return dato % this.size;
    }

    resolucionColisiones(index){
        // Método de exploración cuadrática, moverse 0^2, 1^2, 3^2, ... posiciones, hasta encontrar un campo disponible
        let newIndex = 0;
        let i = 0;
        let disponible = false;

        while(!disponible){
            newIndex = index + Math.pow(i, 2);
            if(newIndex >= this.size){
                newIndex = newIndex % this.size;
            }
            if(this.listaVentas[newIndex] == null){
                disponible = true;
            }
            i++;
        }
        // Retornando el nuevo indice, en caso hayan ocurrido saltos debido a colisiones
        return newIndex;
    }

    rehashing(){
        let porcentajeUso = this.clavesUsadas*100/this.size;
        if (porcentajeUso >= this.porcentajeMax){
            this.printTabla();
            console.log(this.generarDotHash());
            console.log(">>> REHASHING MÉTODO NUMEROS PRIMOS")
            // Buscando el siguiente número primo, este será el nuevo tamaño del arreglo
            let esPrimo = false;
            let newSize = this.size;
            while(!esPrimo){
                newSize++;
                let divisiones = 0;
                for(let i = newSize; i > 0; i--){
                    if((newSize % i) == 0){
                        // división exacta
                        divisiones++;
                    }
                }
                if(divisiones == 2){
                    // es primo
                    esPrimo = true;
                }
            }
            console.log(`>>> NUEVO TAMAÑO: ${newSize}`);
            // Creando el arreglo con el nuevo tamaño
            let ventasAuxiliar = this.listaVentas;
            this.size = newSize;
            this.listaVentas = this.iniciarLista(newSize);
            this.clavesUsadas = 0;
            ventasAuxiliar.forEach(nodoVenta => {
                if(nodoVenta != null){
                    this.insertarVenta(nodoVenta.venta, nodoVenta.idVenta);
                }
            })
        }else{
            this.printTabla();
            console.log(this.generarDotHash());
        }
    }

    printTabla(){
        let tabla = "["
        this.listaVentas.forEach(nodoVenta => {
            if(nodoVenta == null){
                tabla += " --"
            }else{
                tabla += ` V(${nodoVenta.dato})`
            }
        });
        tabla += ` ] ${this.clavesUsadas*100/this.size}% usado, ${this.porcentajeMax}% máximo`
        console.log(tabla);
    }

    generarDotHash(){
        let dotTabla = `digraph G {
            subgraph cluster_0 {
                label = "Tabla hash Ventas";
                style=filled;
                color=lightgrey;
                fillcolor="palegreen";
                edge[color="palegreen"];
                node [shape = "box" fillcolor="white:grey" style="filled"];\n`
        let pos = 0;
        let enlacesHash = ""
        this.listaVentas.forEach(nodoVenta => {
            if(nodoVenta == null){
                dotTabla += `node[shape=record label= "{${pos}}|<p0>"]${pos};\n`
            }else{
                dotTabla += `node[shape=record label= "{${pos}\\nId venta: ${nodoVenta.idVenta}\\nVendedor: ${nodoVenta.venta.vendedor}\\nCliente: ${nodoVenta.venta.cliente}\\nTotal: Q ${nodoVenta.total}}|<p0>"]${pos};\n`
            }
            if(pos==0){
                enlacesHash += `${pos}`
            }else{
                enlacesHash += `->${pos}`
            }
            pos++;
        });
        enlacesHash += ";\n}\n"
        dotTabla += enlacesHash

        // Graficando las listas enlazadas de productos por venta
        let clustersProductos = 0;
        this.listaVentas.forEach(nodoVenta => {
            if(nodoVenta != null){
                clustersProductos += 1;
                dotTabla += `	subgraph cluster_${clustersProductos} {
                    label = "Productos vendidos";
                    fillcolor="grey";
                    style="filled";
                    node [shape = "box" fillcolor="white" style="filled"];\n`
                let contProductos = 0;
                let enlacesProductos = ""
                let rank = "{rank = same"
                let nodoActual = nodoVenta.productosVendidos.primero;
                while(nodoActual != null){
                    contProductos += 1;
                    dotTabla += `nodo${clustersProductos}${contProductos}[label= "[${nodoActual.dato}] ${nodoActual.productoVendido.nombre}\\nPrecio: Q ${nodoActual.productoVendido.precio}, Cantidad: ${nodoActual.productoVendido.cantidad}\\nSubtotal: Q ${nodoActual.subtotal}"];\n`
                    if(contProductos == 1){
                        enlacesProductos += `nodo${clustersProductos}${contProductos}`;
                    }else{
                        enlacesProductos += ` -> nodo${clustersProductos}${contProductos}`;
                    }
                    rank += `; nodo${clustersProductos}${contProductos}`
                    nodoActual = nodoActual.siguiente;
                }
                enlacesProductos += ";\n"
                rank += "};\n}\n"
                dotTabla += enlacesProductos;
                dotTabla += rank;
            }
        });

        // Enlazando nodo hash con lista de productos
        pos = 0;
        let cluster = 0;
        this.listaVentas.forEach(nodoVenta => {
            if(nodoVenta != null && nodoVenta.productosVendidos.primero != null){
                cluster += 1;
                dotTabla += `${pos}:p0 -> nodo${cluster}1;\n`
            }
            pos++;
        });
        dotTabla += "}"
        return dotTabla;
    }
}

// *****************************************************************************************************************

var productosArbolB = new arbolBProductos(5);
var tablaHashVentas = new hashCerradoVentas(7, 50);

// ******** RECUPERANDO ESTRUCTURAS DEL STORAGE *********
function recuperarArbolB(){
    let arbolBString = localStorage.getItem("productos");
    if(arbolBString != null){
        let arbolBJSON = JSON.parse(arbolBString);
        let arbolBCircularJSON = CircularJSON.parse(arbolBJSON); 
        Object.assign(productosArbolB, arbolBCircularJSON);
        productosArbolB.raiz = recuperacionAnidadaArbolB(productosArbolB.raiz);
    }
}

function recuperacionAnidadaArbolB(paginaActual){
    if(paginaActual != null){
        let paginaAnidada = new paginaArbolB(5);
        Object.assign(paginaAnidada, paginaActual);
        paginaActual = paginaAnidada;

        let listaSerializadaNodosB = paginaActual.listaClaves;
        let listaAnidadaNodosB = new listaNodoB();
        Object.assign(listaAnidadaNodosB, listaSerializadaNodosB);
        paginaActual.listaClaves = listaAnidadaNodosB;

        paginaActual.listaClaves.primero = recuperacionNodosProductos(paginaActual.listaClaves.primero);
        let nodoUltimo = paginaActual.listaClaves.primero;
        while(nodoUltimo != null && nodoUltimo.siguiente != null){
            nodoUltimo = nodoUltimo.siguiente;
        }
        paginaActual.listaClaves.ultimo = nodoUltimo;
        
        if(!paginaActual.paginaEsHoja()){
            let nodoActual = paginaActual.listaClaves.primero;
            while(nodoActual != null){
                nodoActual.izquierda = recuperacionAnidadaArbolB(nodoActual.izquierda);
                nodoActual = nodoActual.siguiente;
            }
            paginaActual.listaClaves.ultimo.derecha = recuperacionAnidadaArbolB(paginaActual.listaClaves.ultimo.derecha);
        }
        return paginaActual;    
    }
    return paginaActual;
}

function recuperacionNodosProductos(nodo_actual){
    if(nodo_actual != null){
        let nodoAnidado = new nodoB(nodo_actual.producto);
        Object.assign(nodoAnidado, nodo_actual);
        nodo_actual = nodoAnidado;
        nodo_actual.siguiente = recuperacionNodosProductos(nodo_actual.siguiente);
        return nodo_actual;
    }
    return nodo_actual;
}

function recuperarTablaHash(){
    let tablaHashString = localStorage.getItem("ventas");
    if(tablaHashString != null){
        let tablaHashJSON = JSON.parse(tablaHashString);
        let tablaHashCircularJSON = CircularJSON.parse(tablaHashJSON); 
        // recuperando tabla hash
        Object.assign(tablaHashVentas, tablaHashCircularJSON);
        tablaHashVentas.listaVentas.forEach(function(nodoSerializado, index){
            if(this[index] != null){
                // recuperadno nodoVenta del array listaVentas
                let nodoRecuperado = new nodoVenta(this[index].venta, this[index].idVenta);
                Object.assign(nodoRecuperado, this[index]);
                this[index] = nodoRecuperado;

                // recuperando lista simple de productos vendidos
                let listaRecuperada = new listaSimpleProductos();
                Object.assign(listaRecuperada, this[index].productosVendidos)
                this[index].productosVendidos = listaRecuperada;
                
                // recuperando cada nodoProductoVendido de la lista simple de productos
                this[index].productosVendidos.primero = recuperacionNodosVentas(this[index].productosVendidos.primero);
            }
        }, tablaHashVentas.listaVentas);
    }
}

function recuperacionNodosVentas(nodo_actual){
    if(nodo_actual != null){
        let nodoAnidado = new nodoProductoVendido(nodo_actual.productoVendido);
        Object.assign(nodoAnidado, nodo_actual);
        nodo_actual = nodoAnidado;
        nodo_actual.siguiente = recuperacionNodosVentas(nodo_actual.siguiente);
        return nodo_actual;
    }
    return nodo_actual;
}

// ******** CREACIÓN E INSERCIÓN DE DATOS *********
function crearProductos(){
    let strProductos = localStorage.getItem("productosJSON");
    if(strProductos != null){
        let arrProductos = JSON.parse(strProductos);
        
        arrProductos.forEach(productoNuevo => {
            try{
                productosArbolB.insertarNuevoProducto(productoNuevo);
            }catch(error){
                console.log(error);
                // TODO alert("Ocurrió un error al insertar vendedores nuevos al árbol AVL. (Ver consola).")
            }
        });
        localStorage.removeItem("productosJSON");
        actualizarProductosStorage();
        alert("Se han cargado los productos correctamente. Ver consola para más detalles.")
    }
}

function crearVentas(){
    let strVentas = localStorage.getItem("ventasJSON");
    if(strVentas != null){
        let arrVentas = JSON.parse(strVentas);
        
        arrVentas.forEach(nuevaVenta => {
            try{
                tablaHashVentas.insertarVenta(nuevaVenta);
            }catch(error){
                console.log(error);
                // TODO alert("Ocurrió un error al insertar ventas nuevas a la tabla hash. (Ver consola).")
            }
        });
        localStorage.removeItem("ventasJSON");
        actualizarVentasStorage();
        alert("Se han cargado las ventas correctamente. Ver consola para más detalles.")
    }
}

function crearHashIndividual(idVendedor){
    let hashIndividual = new hashCerradoVentas(7, 50);
    tablaHashVentas.listaVentas.forEach(nodoVenta => {
        if(nodoVenta != null){
            if(nodoVenta.venta.id == idVendedor){
                hashIndividual.insertarVenta(nodoVenta.venta, nodoVenta.idVenta);
            }
        }
    });
    return hashIndividual.generarDotHash();
}

// ****** ACTUALIZACIÓN STORAGE CUANDO LAS ESTRUCTURAS CAMBIAN ******
function actualizarProductosStorage(){
    let arbolBCircularJSON = CircularJSON.stringify(productosArbolB);
    let arbolBString = JSON.stringify(arbolBCircularJSON);
    localStorage.setItem("productos", arbolBString);
}

function actualizarVentasStorage(){
    let tablaHashCircularJSON = CircularJSON.stringify(tablaHashVentas);
    let tablaHashString = JSON.stringify(tablaHashCircularJSON);
    localStorage.setItem("ventas", tablaHashString);
}

// *********** PRUEBAS PERMANENCIA DE DATOS ***********
function pruebasInventario(){
    console.log("****** ARBOL B DE PRODUCTOS ******");
    console.log(productosArbolB.graficarArbolB());
}

function pruebasVentas(){
    console.log("***** TABLA HASH DE VENTAS ******");
    console.log(tablaHashVentas.generarDotHash());
}