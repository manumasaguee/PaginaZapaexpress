// SIMULADOR DE COMPRA ZAPA EXPRESS - ENTREGABLE 2
// Integración completa con DOM y localStorage

// Datos de productos
const PRODUCTOS = [
    { id: 1, nombre: "Pantuflas stitch rosas", precio: 8500, categoria: "pantuflas", imagen: "../assets/stitchrosas.png" },
    { id: 2, nombre: "Pantuflas stitch", precio: 8200, categoria: "pantuflas", imagen: "../assets/stitch.jpg" },
    { id: 3, nombre: "Pantuflas garras blancas", precio: 7800, categoria: "pantuflas", imagen: "../assets/garrasblancas.png" },
    { id: 4, nombre: "Pantuflas garras grises", precio: 7800, categoria: "pantuflas", imagen: "../assets/garrasgris.png" },
    { id: 5, nombre: "Pantuflas gato dormido", precio: 8900, categoria: "pantuflas", imagen: "../assets/gatodurmiendo.png" },
    { id: 6, nombre: "Sandalias harenna spider", precio: 7500, categoria: "sandalias", imagen: "../assets/harenaspider.png" },
    { id: 7, nombre: "Sandalias harenna con peluche", precio: 8200, categoria: "sandalias", imagen: "../assets/harennapeluche.png" },
    { id: 8, nombre: "Pantuflas capibara", precio: 9100, categoria: "pantuflas", imagen: "../assets/capibara.jpg" },
    { id: 9, nombre: "Pantulas homero simpson", precio: 9500, categoria: "pantuflas", imagen: "../assets/homeropantuflas.png" },
    { id: 10, nombre: "Havaiannas negras", precio: 6800, categoria: "ojotas", imagen: "../assets/ojotasnegras.png" },
    { id: 11, nombre: "Pantuflas animalprint", precio: 8300, categoria: "pantuflas", imagen: "../assets/pantuflasprint.png" },
    { id: 12, nombre: "Pantuflas tiburon", precio: 8700, categoria: "pantuflas", imagen: "../assets/pantuflastiburon.png" },
    { id: 13, nombre: "Solanas rosas", precio: 7200, categoria: "sandalias", imagen: "../assets/solanarosas.png" },
    { id: 14, nombre: "Solanas peluche", precio: 7900, categoria: "sandalias", imagen: "../assets/solanaspeluche.png" },
    { id: 15, nombre: "Pantuflas de sonic", precio: 9200, categoria: "pantuflas", imagen: "../assets/sonicazul.png" },
    { id: 16, nombre: "Sandalias spiderman con peluche", precio: 8500, categoria: "sandalias", imagen: "../assets/spidermanpeluche.png" }
];

const DESCUENTOS = {
    "VIP15": 15,
    "PRIMERA10": 10,
    "ZAPA20": 20
};

// Estado global
let carrito = [];
let cuponAplicado = null;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDesdeStorage();
    renderizarProductos();
    actualizarInterfazCarrito();
    configurarEventListeners();
});

// Configurar event listeners
function configurarEventListeners() {
    // Buscador
    document.getElementById('buscador').addEventListener('input', filtrarProductos);
    
    // Filtro de categoría
    document.getElementById('filtroCategoria').addEventListener('change', filtrarProductos);
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carritoZapaExpress');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carritoZapaExpress', JSON.stringify(carrito));
}

// Renderizar productos en el grid
function renderizarProductos(productosFiltrados = PRODUCTOS) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto-card';
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" onerror="this.src='../assets/logo.png'">
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
                <div class="contador-producto">
                    <button class="btn-cantidad" onclick="modificarCantidad(${producto.id}, -1)">-</button>
                    <span class="cantidad-display" id="cantidad-${producto.id}">0</span>
                    <button class="btn-cantidad" onclick="modificarCantidad(${producto.id}, 1)">+</button>
                </div>
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})" id="btn-agregar-${producto.id}">
                    Agregar al Carrito
                </button>
            </div>
        `;
        grid.appendChild(productoElement);
    });

    actualizarContadoresProductos();
}

// Filtrar productos según búsqueda y categoría
function filtrarProductos() {
    const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('filtroCategoria').value;

    const productosFiltrados = PRODUCTOS.filter(producto => {
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada;
        return coincideTexto && coincideCategoria;
    });

    renderizarProductos(productosFiltrados);
}

// Modificar cantidad de un producto
function modificarCantidad(productoId, cambio) {
    const cantidadDisplay = document.getElementById(`cantidad-${productoId}`);
    let cantidadActual = parseInt(cantidadDisplay.textContent) || 0;
    cantidadActual = Math.max(0, cantidadActual + cambio);
    cantidadDisplay.textContent = cantidadActual;

    const botonAgregar = document.getElementById(`btn-agregar-${productoId}`);
    botonAgregar.disabled = cantidadActual === 0;
    botonAgregar.textContent = cantidadActual > 0 ? `Agregar ${cantidadActual}` : 'Agregar al Carrito';
}

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const cantidadDisplay = document.getElementById(`cantidad-${productoId}`);
    const cantidad = parseInt(cantidadDisplay.textContent) || 1;

    if (cantidad === 0) return;

    const producto = PRODUCTOS.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }

    // Resetear contador
    cantidadDisplay.textContent = '0';
    document.getElementById(`btn-agregar-${productoId}`).textContent = 'Agregar al Carrito';
    document.getElementById(`btn-agregar-${productoId}`).disabled = false;

    guardarCarritoEnStorage();
    actualizarInterfazCarrito();
    mostrarNotificacion(`✅ ${cantidad} x ${producto.nombre} agregado al carrito`);
}

// Actualizar interfaz del carrito
function actualizarInterfazCarrito() {
    actualizarEstadoCarrito();
    actualizarItemsCarrito();
    actualizarResumenCarrito();
    actualizarContadoresProductos();
}

// Actualizar estado del carrito
function actualizarEstadoCarrito() {
    const estadoElement = document.getElementById('estadoCarrito');
    const carritoSection = document.getElementById('carritoSection');

    if (carrito.length > 0) {
        estadoElement.innerHTML = `🛒 Carrito: ${carrito.length} producto(s) - $${calcularSubtotal().toLocaleString()}`;
        carritoSection.style.display = 'block';
    } else {
        estadoElement.innerHTML = '🛒 Carrito vacío';
        carritoSection.style.display = 'none';
    }
}

// Actualizar items del carrito
function actualizarItemsCarrito() {
    const itemsContainer = document.getElementById('carritoItems');
    itemsContainer.innerHTML = '';

    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen" onerror="this.src='../assets/logo.png'">
            <div class="item-info">
                <h4 class="item-nombre">${item.nombre}</h4>
                <p class="item-precio">$${item.precio.toLocaleString()} x ${item.cantidad}</p>
                <p><strong>Subtotal: $${(item.precio * item.cantidad).toLocaleString()}</strong></p>
            </div>
            <div class="item-controls">
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">🗑️ Eliminar</button>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// Actualizar resumen del carrito
function actualizarResumenCarrito() {
    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento();
    const total = subtotal - descuento;

    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('total').innerHTML = `<strong>$${total.toLocaleString()}</strong>`;
}

// Actualizar contadores de productos
function actualizarContadoresProductos() {
    PRODUCTOS.forEach(producto => {
        const itemCarrito = carrito.find(item => item.id === producto.id);
        const cantidad = itemCarrito ? itemCarrito.cantidad : 0;
        const cantidadDisplay = document.getElementById(`cantidad-${producto.id}`);
        if (cantidadDisplay) {
            cantidadDisplay.textContent = cantidad;
        }
    });
}

// Calcular subtotal
function calcularSubtotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Calcular descuento
function calcularDescuento() {
    if (!cuponAplicado) return 0;
    const subtotal = calcularSubtotal();
    return (subtotal * DESCUENTOS[cuponAplicado]) / 100;
}

// Aplicar cupón de descuento
function aplicarCupon() {
    const cuponInput = document.getElementById('cuponInput');
    const mensajeCupon = document.getElementById('mensajeCupon');
    const cupon = cuponInput.value.toUpperCase().trim();

    if (!cupon) {
        mensajeCupon.textContent = 'Por favor, ingresa un código de cupón';
        mensajeCupon.className = 'mensaje-cupon error';
        return;
    }

    if (DESCUENTOS[cupon]) {
        cuponAplicado = cupon;
        const descuento = calcularDescuento();
        mensajeCupon.textContent = `✅ Cupón "${cupon}" aplicado. Descuento: ${DESCUENTOS[cupon]}% (-$${descuento.toLocaleString()})`;
        mensajeCupon.className = 'mensaje-cupon exito';
        actualizarResumenCarrito();
    } else {
        mensajeCupon.textContent = '❌ Código de cupón no válido';
        mensajeCupon.className = 'mensaje-cupon error';
        cuponAplicado = null;
    }
}

// Eliminar item del carrito
function eliminarDelCarrito(index) {
    const itemEliminado = carrito[index];
    carrito.splice(index, 1);
    guardarCarritoEnStorage();
    actualizarInterfazCarrito();
    mostrarNotificacion(`🗑️ ${itemEliminado.nombre} eliminado del carrito`);
}

// Vaciar carrito completo
function vaciarCarrito() {
    if (carrito.length === 0) return;

    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = [];
        cuponAplicado = null;
        document.getElementById('cuponInput').value = '';
        document.getElementById('mensajeCupon').textContent = '';
        guardarCarritoEnStorage();
        actualizarInterfazCarrito();
        mostrarNotificacion('🛒 Carrito vaciado');
    }
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos antes de finalizar la compra.');
        return;
    }

    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento();
    const total = subtotal - descuento;

    const modal = document.getElementById('modalConfirmacion');
    const modalDetalles = document.getElementById('modalDetalles');

    let detallesHTML = `
        <p><strong>Resumen de tu compra:</strong></p>
        <div style="text-align: left; margin: 15px 0;">
            ${carrito.map(item => `
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                    <span>${item.cantidad}x ${item.nombre}</span>
                    <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
                </div>
            `).join('')}
        </div>
        <div style="border-top: 2px solid #a9cb22e8; padding-top: 10px;">
            <div style="display: flex; justify-content: space-between;">
                <span>Subtotal:</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
            ${descuento > 0 ? `
            <div style="display: flex; justify-content: space-between; color: #28a745;">
                <span>Descuento (${cuponAplicado}):</span>
                <span>-$${descuento.toLocaleString()}</span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em;">
                <span>Total:</span>
                <span>$${total.toLocaleString()}</span>
            </div>
        </div>
        <p style="margin-top: 20px; color: #666;">¡Gracias por tu compra! Contacta al WhatsApp para completar tu pedido.</p>
    `;

    modalDetalles.innerHTML = detallesHTML;
    modal.style.display = 'block';
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modalConfirmacion').style.display = 'none';
}

// Reiniciar simulador
function reiniciarSimulador() {
    carrito = [];
    cuponAplicado = null;
    document.getElementById('cuponInput').value = '';
    document.getElementById('mensajeCupon').textContent = '';
    guardarCarritoEnStorage();
    actualizarInterfazCarrito();
    cerrarModal();
    mostrarNotificacion('🔄 Simulador reiniciado');
}

// Mostrar notificación temporal
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Cerrar modal al hacer click fuera
window.onclick = function(event) {
    const modal = document.getElementById('modalConfirmacion');
    if (event.target === modal) {
        cerrarModal();
    }
}