// SIMULADOR DE COMPRA - ZAPA EXPRESS
// Variables y constantes globales
const PRODUCTOS = [
    { id: 1, nombre: "Pantuflas stitch rosas", precio: 8500 },
    { id: 2, nombre: "Pantuflas stitch", precio: 8200 },
    { id: 3, nombre: "Pantuflas garras blancas", precio: 7800 },
    { id: 4, nombre: "Pantuflas garras grises", precio: 7800 },
    { id: 5, nombre: "Pantuflas gato dormido", precio: 8900 },
    { id: 6, nombre: "Sandalias harenna spider", precio: 7500 },
    { id: 7, nombre: "Sandalias harenna con peluche", precio: 8200 },
    { id: 8, nombre: "Pantuflas capibara", precio: 9100 },
    { id: 9, nombre: "Pantulas homero simpson", precio: 9500 },
    { id: 10, nombre: "Havaiannas negras", precio: 6800 },
    { id: 11, nombre: "Pantuflas animalprint", precio: 8300 },
    { id: 12, nombre: "Pantuflas tiburon", precio: 8700 },
    { id: 13, nombre: "Solanas rosas", precio: 7200 },
    { id: 14, nombre: "Solanas peluche", precio: 7900 },
    { id: 15, nombre: "Pantuflas de sonic", precio: 9200 },
    { id: 16, nombre: "Sandalias spiderman con peluche", precio: 8500 }
];

const DESCUENTOS = {
    "VIP15": 15,
    "PRIMERA10": 10,
    "ZAPA20": 20
};

let carrito = [];
let totalCompra = 0;

// Función principal para iniciar el simulador
function iniciarSimulador() {
    console.log("¡Bienvenido al Simulador de Compra de Zapa Express!");
    console.log("==================================================");
    
    // Mostrar mensaje de bienvenida
    alert("¡Bienvenido al Simulador de Compra de Zapa Express!\n\nEn este simulador podrás:\n1. Ver nuestros productos\n2. Agregar productos a tu carrito\n3. Calcular el total de tu compra\n4. Aplicar cupones de descuento\n\nPara interactuar, sigue las instrucciones en los cuadros de diálogo.");
    
    // Iniciar el proceso de compra
    mostrarProductos();
}

// Función para mostrar los productos disponibles
function mostrarProductos() {
    console.log("\nPRODUCTOS DISPONIBLES:");
    console.log("=====================");
    
    PRODUCTOS.forEach(producto => {
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio}`);
    });
    
    // Llamar a la función para seleccionar productos
    seleccionarProductos();
}

// Función para seleccionar productos y agregarlos al carrito
function seleccionarProductos() {
    let continuarComprando = true;
    
    while (continuarComprando) {
        const productoId = prompt(
            "Ingresa el número del producto que deseas agregar al carrito:\n\n" +
            PRODUCTOS.map(p => `${p.id}. ${p.nombre} - $${p.precio}`).join("\n") +
            "\n\nEscribe 'fin' para terminar de agregar productos."
        );
        
        if (productoId === null) {
            // El usuario canceló
            continuarComprando = false;
            break;
        }
        
        if (productoId.toLowerCase() === 'fin') {
            continuarComprando = false;
            break;
        }
        
        const id = parseInt(productoId);
        
        if (isNaN(id) || id < 1 || id > PRODUCTOS.length) {
            alert("Por favor, ingresa un número de producto válido.");
            continue;
        }
        
        const cantidad = prompt(`¿Cuántas unidades de "${PRODUCTOS[id-1].nombre}" deseas agregar?`);
        const cantidadNum = parseInt(cantidad);
        
        if (isNaN(cantidadNum) || cantidadNum < 1) {
            alert("Por favor, ingresa una cantidad válida.");
            continue;
        }
        
        // Agregar producto al carrito
        const productoSeleccionado = PRODUCTOS[id-1];
        carrito.push({
            ...productoSeleccionado,
            cantidad: cantidadNum,
            subtotal: productoSeleccionado.precio * cantidadNum
        });
        
        console.log(`✅ Agregado: ${cantidadNum} x ${productoSeleccionado.nombre}`);
        
        const respuesta = confirm("¿Deseas agregar otro producto?");
        if (!respuesta) {
            continuarComprando = false;
        }
    }
    
    // Si hay productos en el carrito, mostrar resumen
    if (carrito.length > 0) {
        mostrarResumenCarrito();
    } else {
        alert("No has agregado productos al carrito. ¡Vuelve pronto!");
    }
}

// Función para mostrar el resumen del carrito y calcular totales
function mostrarResumenCarrito() {
    console.log("\n🛒 TU CARRITO DE COMPRAS:");
    console.log("========================");
    
    totalCompra = 0;
    
    carrito.forEach((item, index) => {
        console.log(`${index + 1}. ${item.cantidad}x ${item.nombre} - $${item.subtotal}`);
        totalCompra += item.subtotal;
    });
    
    console.log(`\n💰 TOTAL: $${totalCompra}`);
    
    alert(`Tu carrito tiene ${carrito.length} producto(s).\nTotal preliminar: $${totalCompra}\n\n¿Deseas aplicar un cupón de descuento?`);
    
    // Preguntar por cupón de descuento
 aplicarDescuento();
}

// Función para aplicar descuentos
function aplicarDescuento() {
    const usarCupon = confirm("¿Tienes un cupón de descuento? (Aceptar para ingresar cupón, Cancelar para continuar sin descuento)");
    
    if (usarCupon) {
        const cupon = prompt("Ingresa tu código de descuento (VIP15, PRIMERA10, ZAPA20):").toUpperCase();
        
        if (DESCUENTOS[cupon]) {
            const descuento = DESCUENTOS[cupon];
            const ahorro = (totalCompra * descuento) / 100;
            totalCompra -= ahorro;
            
            console.log(`🎉 ¡Cupón "${cupon}" aplicado! Descuento: ${descuento}%`);
            console.log(`💰 Ahorraste: $${ahorro}`);
            console.log(`💵 NUEVO TOTAL: $${totalCompra}`);
            
            alert(`¡Cupón aplicado con éxito!\nDescuento: ${descuento}%\nAhorraste: $${ahorro}\nNuevo total: $${totalCompra}`);
        } else {
            alert("Cupón no válido. Continuando sin descuento.");
            console.log("❌ Cupón no válido. Continuando sin descuento.");
        }
    }
    
    // Finalizar compra
    finalizarCompra();
}

// Función para finalizar la compra
function finalizarCompra() {
    console.log("\n🎯 RESUMEN FINAL DE COMPRA:");
    console.log("=========================");
    
    carrito.forEach((item, index) => {
        console.log(`${index + 1}. ${item.cantidad}x ${item.nombre} - $${item.subtotal}`);
    });
    
    console.log(`\n💰 TOTAL A PAGAR: $${totalCompra}`);
    
    alert(`¡Gracias por tu compra!\n\nTotal de productos: ${carrito.length}\nTotal a pagar: $${totalCompra}\n\nPuedes contactarnos al WhatsApp: +54 9 2932 41-7171 para completar tu pedido.`);
    
    // Preguntar si desea realizar otra compra
    const otraCompra = confirm("¿Deseas realizar otra compra simulada?");
    
    if (otraCompra) {
        // Reiniciar variables para nueva compra
        carrito = [];
        totalCompra = 0;
        
        // Volver a iniciar el simulador
        iniciarSimulador();
    } else {
        console.log("¡Gracias por usar el simulador de Zapa Express! Vuelve pronto.");
        alert("¡Gracias por usar el simulador de Zapa Express! Visita nuestra tienda en Bernardo de Yrigoyen 148, Punta Alta.");
    }
}

// Función auxiliar para formatear precios
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(precio);
}

// Mensaje inicial en consola
console.log("¡Bienvenido al Simulador de Zapa Express!");
console.log("Para iniciar el simulador, escribe: iniciarSimulador()");
