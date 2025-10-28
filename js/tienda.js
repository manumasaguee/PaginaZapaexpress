
// SIMULADOR DE E-COMMERCE COMPLETO - ZAPA EXPRESS

// Datos de productos mejorados
const PRODUCTOS_TIENDA = [
    { 
        id: 1, 
        nombre: "Pantuflas Stitch Rosas", 
        precio: 8500, 
        categoria: "pantuflas", 
        imagen: "../assets/stitchrosas.png",
        descripcion: "Pantuflas súper cómodas con diseño de Stitch en color rosa",
        stock: 15,
        popularidad: 95,
        descuento: 0
    },
    { 
        id: 2, 
        nombre: "Pantuflas Stitch Clásicas", 
        precio: 8200, 
        categoria: "pantuflas", 
        imagen: "../assets/stitch.jpg",
        descripcion: "Las clásicas pantuflas Stitch que todos aman",
        stock: 20,
        popularidad: 92,
        descuento: 0
    },
    { 
        id: 3, 
        nombre: "Pantuflas Garras Blancas", 
        precio: 7800, 
        categoria: "pantuflas", 
        imagen: "../assets/garrasblancas.png",
        descripcion: "Divertidas pantuflas con forma de garras en color blanco",
        stock: 12,
        popularidad: 88,
        descuento: 10
    },
    { 
        id: 4, 
        nombre: "Pantuflas Garras Grises", 
        precio: 7800, 
        categoria: "pantuflas", 
        imagen: "../assets/garrasgris.png",
        descripcion: "Pantuflas con diseño de garras en elegante color gris",
        stock: 8,
        popularidad: 85,
        descuento: 0
    },
    { 
        id: 5, 
        nombre: "Pantuflas Gato Dormido", 
        precio: 8900, 
        categoria: "pantuflas", 
        imagen: "../assets/gatodurmiendo.png",
        descripcion: "Adorables pantuflas con diseño de gatito dormido",
        stock: 18,
        popularidad: 96,
        descuento: 15
    },
    { 
        id: 6, 
        nombre: "Sandalias Harenna Spider", 
        precio: 7500, 
        categoria: "sandalias", 
        imagen: "../assets/harenaspider.png",
        descripcion: "Sandalias deportivas con diseño Spider-Man",
        stock: 25,
        popularidad: 78,
        descuento: 0
    },
    { 
        id: 7, 
        nombre: "Sandalias Harenna con Peluche", 
        precio: 8200, 
        categoria: "sandalias", 
        imagen: "../assets/harennapeluche.png",
        descripcion: "Cómodas sandalias con detalles de peluche",
        stock: 14,
        popularidad: 82,
        descuento: 5
    },
    { 
        id: 8, 
        nombre: "Pantuflas Capibara", 
        precio: 9100, 
        categoria: "pantuflas", 
        imagen: "../assets/capibara.jpg",
        descripcion: "Originales pantuflas con diseño de capibara",
        stock: 6,
        popularidad: 90,
        descuento: 0
    },
    { 
        id: 9, 
        nombre: "Pantuflas Homero Simpson", 
        precio: 9500, 
        categoria: "pantuflas", 
        imagen: "../assets/homeropantuflas.png",
        descripcion: "Divertidas pantuflas con el querido Homero Simpson",
        stock: 10,
        popularidad: 94,
        descuento: 20
    },
    { 
        id: 10, 
        nombre: "Havaiannas Negras", 
        precio: 6800, 
        categoria: "ojotas", 
        imagen: "../assets/ojotasnegras.png",
        descripcion: "Clásicas havaiannas en color negro, ideales para el verano",
        stock: 30,
        popularidad: 89,
        descuento: 0
    },
    { 
        id: 11, 
        nombre: "Pantuflas Animal Print", 
        precio: 8300, 
        categoria: "pantuflas", 
        imagen: "../assets/pantuflasprint.png",
        descripcion: "Elegantes pantuflas con estampado animal print",
        stock: 16,
        popularidad: 87,
        descuento: 0
    },
    { 
        id: 12, 
        nombre: "Pantuflas Tiburón", 
        precio: 8700, 
        categoria: "pantuflas", 
        imagen: "../assets/pantuflastiburon.png",
        descripcion: "Divertidas pantuflas con diseño de tiburón",
        stock: 9,
        popularidad: 91,
        descuento: 12
    },
    { 
        id: 13, 
        nombre: "Solanas Rosas", 
        precio: 7200, 
        categoria: "sandalias", 
        imagen: "../assets/solanarosas.png",
        descripcion: "Hermosas sandalias rosas con detalles femeninos",
        stock: 22,
        popularidad: 84,
        descuento: 0
    },
    { 
        id: 14, 
        nombre: "Solanas con Peluche", 
        precio: 7900, 
        categoria: "sandalias", 
        imagen: "../assets/solanaspeluche.png",
        descripcion: "Sandalias cómodas con suaves detalles en peluche",
        stock: 17,
        popularidad: 86,
        descuento: 8
    },
    { 
        id: 15, 
        nombre: "Pantuflas Sonic", 
        precio: 9200, 
        categoria: "pantuflas", 
        imagen: "../assets/sonicazul.png",
        descripcion: "Pantuflas con el veloz Sonic the Hedgehog",
        stock: 11,
        popularidad: 93,
        descuento: 0
    },
    { 
        id: 16, 
        nombre: "Sandalias Spiderman con Peluche", 
        precio: 8500, 
        categoria: "sandalias", 
        imagen: "../assets/spidermanpeluche.png",
        descripcion: "Sandalias Spiderman con detalles en peluche",
        stock: 13,
        popularidad: 88,
        descuento: 10
    }
];

// Estado global de la tienda
let carrito = [];
let productosFiltrados = [...PRODUCTOS_TIENDA];
let pasoActualCheckout = 1;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDesdeStorage();
    renderizarProductosTienda();
    actualizarInterfazTienda();
    configurarEventListenersTienda();
});

// Configurar event listeners de la tienda
function configurarEventListenersTienda() {
    // Búsqueda y filtros
    document.getElementById('buscadorTienda').addEventListener('input', filtrarProductosTienda);
    document.getElementById('filtroCategoriaTienda').addEventListener('change', filtrarProductosTienda);
    document.getElementById('filtroPrecioTienda').addEventListener('change', filtrarProductosTienda);
    document.getElementById('filtroOrden').addEventListener('change', filtrarProductosTienda);
    
    // Checkout form
    document.getElementById('formCheckout').addEventListener('submit', finalizarPedido);
    
    // Métodos de pago
    document.querySelectorAll('input[name="metodoPago"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const datosTarjeta = document.getElementById('datosTarjeta');
            datosTarjeta.style.display = this.value === 'tarjeta' ? 'block' : 'none';
        });
    });
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carritoTiendaZapaExpress');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carritoTiendaZapaExpress', JSON.stringify(carrito));
}

// Renderizar productos en la tienda
function renderizarProductosTienda() {
    const grid = document.getElementById('productosTiendaGrid');
    const sinResultados = document.getElementById('sinResultados');
    
    grid.innerHTML = '';

    if (productosFiltrados.length === 0) {
        sinResultados.style.display = 'block';
        return;
    }
    
    sinResultados.style.display = 'none';

    productosFiltrados.forEach(producto => {
        const precioFinal = producto.descuento > 0 ? 
            producto.precio * (1 - producto.descuento / 100) : 
            producto.precio;
            
        const productoElement = document.createElement('div');
        productoElement.className = 'producto-tienda-card';
        productoElement.innerHTML = `
            ${producto.descuento > 0 ? `<div class="producto-tienda-badge">-${producto.descuento}%</div>` : ''}
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-tienda-imagen" onerror="this.src='../assets/logo.png'">
            <div class="producto-tienda-info">
                <h3 class="producto-tienda-nombre">${producto.nombre}</h3>
                <p class="producto-tienda-descripcion">${producto.descripcion}</p>
                <div class="producto-tienda-precio">
                    $${Math.round(precioFinal).toLocaleString()}
                    ${producto.descuento > 0 ? 
                        `<span class="producto-tienda-precio-anterior">$${producto.precio.toLocaleString()}</span>` : 
                        ''}
                </div>
                <div class="producto-tienda-stock">${producto.stock} unidades disponibles</div>
                <div class="producto-tienda-controls">
                    <div class="cantidad-control">
                        <button class="btn-cantidad-tienda" onclick="modificarCantidadTienda(${producto.id}, -1)">-</button>
                        <span class="cantidad-display-tienda" id="cantidad-tienda-${producto.id}">1</span>
                        <button class="btn-cantidad-tienda" onclick="modificarCantidadTienda(${producto.id}, 1)">+</button>
                    </div>
                    <button class="btn-agregar-tienda" onclick="agregarAlCarritoTienda(${producto.id})" id="btn-agregar-tienda-${producto.id}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(productoElement);
    });

    actualizarContadoresProductosTienda();
}

// Filtrar y ordenar productos
function filtrarProductosTienda() {
    const textoBusqueda = document.getElementById('buscadorTienda').value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('filtroCategoriaTienda').value;
    const precioSeleccionado = document.getElementById('filtroPrecioTienda').value;
    const ordenSeleccionado = document.getElementById('filtroOrden').value;

    productosFiltrados = PRODUCTOS_TIENDA.filter(producto => {
        // Filtro por texto
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) || 
                            producto.descripcion.toLowerCase().includes(textoBusqueda);
        
        // Filtro por categoría
        const coincideCategoria = categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada;
        
        // Filtro por precio
        let coincidePrecio = true;
        if (precioSeleccionado !== 'todos') {
            const [min, max] = precioSeleccionado.split('-').map(Number);
            const precioFinal = producto.descuento > 0 ? 
                producto.precio * (1 - producto.descuento / 100) : 
                producto.precio;
            coincidePrecio = precioFinal >= min && precioFinal <= max;
        }
        
        return coincideTexto && coincideCategoria && coincidePrecio;
    });

    // Ordenar productos
    switch (ordenSeleccionado) {
        case 'precio-asc':
            productosFiltrados.sort((a, b) => {
                const precioA = a.descuento > 0 ? a.precio * (1 - a.descuento / 100) : a.precio;
                const precioB = b.descuento > 0 ? b.precio * (1 - b.descuento / 100) : b.precio;
                return precioA - precioB;
            });
            break;
        case 'precio-desc':
            productosFiltrados.sort((a, b) => {
                const precioA = a.descuento > 0 ? a.precio * (1 - a.descuento / 100) : a.precio;
                const precioB = b.descuento > 0 ? b.precio * (1 - b.descuento / 100) : b.precio;
                return precioB - precioA;
            });
            break;
        case 'popularidad':
            productosFiltrados.sort((a, b) => b.popularidad - a.popularidad);
            break;
        default: // nombre
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    renderizarProductosTienda();
}

// Modificar cantidad en la tienda
function modificarCantidadTienda(productoId, cambio) {
    const cantidadDisplay = document.getElementById(`cantidad-tienda-${productoId}`);
    let cantidadActual = parseInt(cantidadDisplay.textContent) || 1;
    cantidadActual = Math.max(1, cantidadActual + cambio);
    cantidadDisplay.textContent = cantidadActual;
}

// Agregar producto al carrito desde la tienda
function agregarAlCarritoTienda(productoId) {
    const cantidadDisplay = document.getElementById(`cantidad-tienda-${productoId}`);
    const cantidad = parseInt(cantidadDisplay.textContent) || 1;
    const producto = PRODUCTOS_TIENDA.find(p => p.id === productoId);

    if (cantidad > producto.stock) {
        mostrarNotificacion(`❌ Solo quedan ${producto.stock} unidades disponibles`, 'error');
        return;
    }

    const itemExistente = carrito.find(item => item.id === productoId);

    if (itemExistente) {
        if (itemExistente.cantidad + cantidad > producto.stock) {
            mostrarNotificacion(`❌ No puedes agregar más de ${producto.stock} unidades`, 'error');
            return;
        }
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad,
            precioFinal: producto.descuento > 0 ? 
                producto.precio * (1 - producto.descuento / 100) : 
                producto.precio
        });
    }

    // Resetear contador
    cantidadDisplay.textContent = '1';

    guardarCarritoEnStorage();
    actualizarInterfazTienda();
    mostrarNotificacion(`✅ ${cantidad} x ${producto.nombre} agregado al carrito`);
    mostrarCarritoFlotante();
}

// Actualizar interfaz completa de la tienda
function actualizarInterfazTienda() {
    actualizarContadoresTienda();
    actualizarCarritoFlotante();
    actualizarContadoresProductosTienda();
}

// Actualizar contadores principales
function actualizarContadoresTienda() {
    document.getElementById('contadorCarrito').textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Actualizar carrito flotante
function actualizarCarritoFlotante() {
    const carritoFlotante = document.getElementById('carritoFlotante');
    const carritoCantidad = document.getElementById('carritoCantidadFlotante');
    const carritoItems = document.getElementById('carritoItemsFlotante');
    const totalFlotante = document.getElementById('totalFlotante');

    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    const totalPrecio = carrito.reduce((total, item) => total + (item.precioFinal * item.cantidad), 0);

    carritoCantidad.textContent = totalItems;
    totalFlotante.textContent = Math.round(totalPrecio).toLocaleString();

    // Actualizar items del carrito flotante
    carritoItems.innerHTML = '';
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">El carrito está vacío</p>';
    } else {
        carrito.slice(0, 3).forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrito-flotante';
            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen-flotante" onerror="this.src='../assets/logo.png'">
                <div class="item-info-flotante">
                    <div class="item-nombre-flotante">${item.nombre}</div>
                    <div class="item-precio-flotante">${item.cantidad} x $${Math.round(item.precioFinal).toLocaleString()}</div>
                </div>
            `;
            carritoItems.appendChild(itemElement);
        });
        
        if (carrito.length > 3) {
            const masItems = document.createElement('div');
            masItems.className = 'item-carrito-flotante';
            masItems.innerHTML = `<div style="text-align: center; width: 100%; color: #666;">+${carrito.length - 3} más productos</div>`;
            carritoItems.appendChild(masItems);
        }
    }

    // Mostrar/ocultar carrito flotante
    if (carrito.length > 0 && !carritoFlotante.classList.contains('mostrar')) {
        carritoFlotante.classList.add('mostrar');
    } else if (carrito.length === 0 && carritoFlotante.classList.contains('mostrar')) {
        carritoFlotante.classList.remove('mostrar');
    }
}

// Actualizar contadores de productos en la tienda
function actualizarContadoresProductosTienda() {
    PRODUCTOS_TIENDA.forEach(producto => {
        const itemCarrito = carrito.find(item => item.id === producto.id);
        const cantidad = itemCarrito ? itemCarrito.cantidad : 0;
        const botonAgregar = document.getElementById(`btn-agregar-tienda-${producto.id}`);
        
        if (botonAgregar) {
            if (cantidad >= producto.stock) {
                botonAgregar.textContent = 'Sin Stock';
                botonAgregar.disabled = true;
            } else {
                botonAgregar.textContent = 'Agregar al Carrito';
                botonAgregar.disabled = false;
            }
        }
    });
}

// Mostrar carrito flotante
function mostrarCarritoFlotante() {
    const carritoFlotante = document.getElementById('carritoFlotante');
    carritoFlotante.classList.add('mostrar');
    
    // Ocultar automáticamente después de 5 segundos si no hay interacción
    setTimeout(() => {
        if (!carritoFlotante.matches(':hover')) {
            carritoFlotante.classList.remove('mostrar');
        }
    }, 5000);
}

// Mostrar carrito completo
function mostrarCarritoCompleto() {
    const modal = document.getElementById('modalCarrito');
    const carritoCompleto = document.getElementById('carritoCompleto');
    const carritoVacio = document.getElementById('carritoVacio');

    if (carrito.length === 0) {
        carritoCompleto.style.display = 'none';
        carritoVacio.style.display = 'block';
    } else {
        carritoCompleto.style.display = 'block';
        carritoVacio.style.display = 'none';
        renderizarCarritoCompleto();
    }

    modal.style.display = 'block';
}

// Renderizar carrito completo
function renderizarCarritoCompleto() {
    const carritoCompleto = document.getElementById('carritoCompleto');
    const totalPrecio = carrito.reduce((total, item) => total + (item.precioFinal * item.cantidad), 0);

    carritoCompleto.innerHTML = `
        <div class="carrito-items-completo">
            ${carrito.map((item, index) => `
                <div class="item-carrito-completo">
                    <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen-completo" onerror="this.src='../assets/logo.png'">
                    <div class="item-info-completo">
                        <div class="item-nombre-completo">${item.nombre}</div>
                        <div class="item-precio-completo">$${Math.round(item.precioFinal).toLocaleString()} c/u</div>
                    </div>
                    <div class="item-controls-completo">
                        <span>${item.cantidad} unidades</span>
                        <button class="btn-eliminar-completo" onclick="eliminarDelCarritoTienda(${index})">Eliminar</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="resumen-carrito">
            <div class="resumen-linea">
                <span>Subtotal:</span>
                <span>$${Math.round(totalPrecio).toLocaleString()}</span>
            </div>
            <div class="resumen-linea">
                <span>Envío:</span>
                <span>Gratis</span>
            </div>
            <div class="resumen-linea resumen-total">
                <span>Total:</span>
                <span>$${Math.round(totalPrecio).toLocaleString()}</span>
            </div>
            <button class="btn-finalizar-compra" onclick="iniciarCheckout()">Finalizar Compra</button>
        </div>
    `;
}

// Eliminar item del carrito
function eliminarDelCarritoTienda(index) {
    const itemEliminado = carrito[index];
    carrito.splice(index, 1);
    guardarCarritoEnStorage();
    actualizarInterfazTienda();
    mostrarNotificacion(`🗑️ ${itemEliminado.nombre} eliminado del carrito`);
    
    // Actualizar carrito completo si está abierto
    if (document.getElementById('modalCarrito').style.display === 'block') {
        mostrarCarritoCompleto();
    }
}

// Cerrar modal del carrito
function cerrarModalCarrito() {
    document.getElementById('modalCarrito').style.display = 'none';
}

// Iniciar proceso de checkout
function iniciarCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('❌ El carrito está vacío', 'error');
        return;
    }

    cerrarModalCarrito();
    document.getElementById('modalCheckout').style.display = 'block';
    actualizarResumenPedido();
}

// Actualizar resumen del pedido en checkout
function actualizarResumenPedido() {
    const resumenPedido = document.getElementById('resumenPedido');
    const totalPrecio = carrito.reduce((total, item) => total + (item.precioFinal * item.cantidad), 0);

    resumenPedido.innerHTML = `
        <div style="margin-bottom: 20px;">
            ${carrito.map(item => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                    <span>${item.cantidad}x ${item.nombre}</span>
                    <span>$${Math.round(item.precioFinal * item.cantidad).toLocaleString()}</span>
                </div>
            `).join('')}
        </div>
        <div style="border-top: 2px solid #a9cb22e8; padding-top: 10px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em;">
                <span>Total:</span>
                <span>$${Math.round(totalPrecio).toLocaleString()}</span>
            </div>
        </div>
    `;
}

// Navegación entre pasos del checkout
function siguientePaso(pasoActual) {
    // Validar paso actual
    if (pasoActual === 1 && !validarPaso1()) return;
    if (pasoActual === 2 && !validarPaso2()) return;
    if (pasoActual === 3 && !validarPaso3()) return;

    // Ocultar paso actual
    document.getElementById(`checkoutStep${pasoActual}`).style.display = 'none';
    document.getElementById(`step${pasoActual}`).classList.remove('active');
    
    // Mostrar siguiente paso
    pasoActual++;
    document.getElementById(`checkoutStep${pasoActual}`).style.display = 'block';
    document.getElementById(`step${pasoActual}`).classList.add('active');
}

function anteriorPaso(pasoActual) {
    // Ocultar paso actual
    document.getElementById(`checkoutStep${pasoActual}`).style.display = 'none';
    document.getElementById(`step${pasoActual}`).classList.remove('active');
    
    // Mostrar paso anterior
    pasoActual--;
    document.getElementById(`checkoutStep${pasoActual}`).style.display = 'block';
    document.getElementById(`step${pasoActual}`).classList.add('active');
}

// Validaciones de los pasos
function validarPaso1() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const dni = document.getElementById('dni').value;

    if (!nombre || !email || !telefono || !dni) {
        mostrarNotificacion('❌ Completa todos los campos obligatorios', 'error');
        return false;
    }

    if (!validarEmail(email)) {
        mostrarNotificacion('❌ Ingresa un email válido', 'error');
        return false;
    }

    return true;
}

function validarPaso2() {
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const metodoEnvio = document.getElementById('metodoEnvio').value;

    if (!direccion || !ciudad || !codigoPostal || !metodoEnvio) {
        mostrarNotificacion('❌ Completa todos los campos de envío', 'error');
        return false;
    }

    return true;
}

function validarPaso3() {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
    
    if (!metodoPago) {
        mostrarNotificacion('❌ Selecciona un método de pago', 'error');
        return false;
    }

    return true;
}

// Validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Finalizar pedido
function finalizarPedido(event) {
    event.preventDefault();
    
    if (!validarPaso4()) return;

    // Simular procesamiento del pedido
    mostrarNotificacion('🔄 Procesando tu pedido...', 'info');
    
    setTimeout(() => {
        // Crear resumen del pedido
        const totalPrecio = carrito.reduce((total, item) => total + (item.precioFinal * item.cantidad), 0);
        const numeroPedido = 'ZP' + Date.now().toString().slice(-6);
        
        // Limpiar carrito
        carrito = [];
        guardarCarritoEnStorage();
        actualizarInterfazTienda();
        
        // Cerrar modales
        cerrarModalCheckout();
        
        // Mostrar confirmación
        mostrarConfirmacionPedido(numeroPedido, totalPrecio);
        
    }, 2000);
}

function validarPaso4() {
    const terminos = document.querySelector('#checkoutStep4 input[type="checkbox"]');
    
    if (!terminos.checked) {
        mostrarNotificacion('❌ Debes aceptar los términos y condiciones', 'error');
        return false;
    }

    return true;
}

// Mostrar confirmación del pedido
function mostrarConfirmacionPedido(numeroPedido, total) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 4000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 15px; text-align: center; max-width: 500px; margin: 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #a9cb22e8; margin-bottom: 15px;">¡Pedido Confirmado!</h2>
            <p style="margin-bottom: 10px;"><strong>Número de pedido:</strong> ${numeroPedido}</p>
            <p style="margin-bottom: 10px;"><strong>Total:</strong> $${Math.round(total).toLocaleString()}</p>
            <p style="margin-bottom: 25px; color: #666;">Te contactaremos pronto para coordinar el envío.</p>
            <button onclick="this.closest('div').style.display='none'" style="
                background: linear-gradient(135deg, #a9cb22e8, #8fb41e);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Aceptar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Cerrar modal de checkout
function cerrarModalCheckout() {
    document.getElementById('modalCheckout').style.display = 'none';
    // Resetear formulario
    document.getElementById('formCheckout').reset();
    pasoActualCheckout = 1;
    
    // Resetear pasos
    document.querySelectorAll('.checkout-step').forEach((step, index) => {
        step.style.display = index === 0 ? 'block' : 'none';
    });
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'error' ? '#dc3545' : tipo === 'info' ? '#17a2b8' : '#28a745'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 5000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 4000);
}

// Agregar estilos de animación
const estilosAnimacion = document.createElement('style');
estilosAnimacion.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(estilosAnimacion);

// Cerrar modales al hacer click fuera
window.onclick = function(event) {
    if (event.target === document.getElementById('modalCarrito')) {
        cerrarModalCarrito();
    }
    if (event.target === document.getElementById('modalCheckout')) {
        cerrarModalCheckout();
    }
}