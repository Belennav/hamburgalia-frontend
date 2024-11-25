window.onload = function() {
    // Mostrar la hamburguesa por defecto: medallón carne y pan sésamo
    mostrarImagen('carne');  // Medallón de carne
    mostrarImagen('sesamo'); // Pan de sésamo
};

// Función para mostrar las imágenes cuando el usuario selecciona un ingrediente, pan o medallón
function mostrarImagen(ingrediente) {
    const imagenesContainer = document.getElementById('imagenesHamburguesa');

    // Creamos una imagen de cada ingrediente, pan o medallón
    let imagen = document.createElement('img');
    imagen.classList.add('img-fluid');

    // Determinar qué tipo de imagen agregar dependiendo de la opción seleccionada
    switch (ingrediente) {
        // Ingredientes
        case 'queso':
            imagen.src = 'imagenes/queso.png';
            imagen.alt = 'Hamburguesa con Queso';
            break;
        case 'lechuga':
            imagen.src = 'imagenes/lechuga.png';
            imagen.alt = 'Hamburguesa con Lechuga';
            break;
        case 'tomate':
            imagen.src = 'imagenes/tomate.png';
            imagen.alt = 'Hamburguesa con Tomate';
            break;
        case 'salsa':
            imagen.src = 'imagenes/salsa.jpg';
            imagen.alt = 'Hamburguesa con Salsa';
            break;

        // Medallón
        case 'carne':
            imagen.src = 'imagenes/medallon_carne.png';
            imagen.alt = 'Hamburguesa con Medallón de Carne';
            break;
        case 'pollo':
            imagen.src = 'imagenes/medallon_pollo.png';
            imagen.alt = 'Hamburguesa con Medallón de Pollo';
            break;
        case 'vegano':
            imagen.src = 'imagenes/medallon_vegano.png';
            imagen.alt = 'Hamburguesa con Medallón Vegano';
            break;

        // Pan
        case 'sesamo':
            imagen.src = 'imagenes/pan_sesamo.png';
            imagen.alt = 'Hamburguesa con Pan de Sésamo';
            break;
        case 'integral':
            imagen.src = 'imagenes/pan_integral.png';
            imagen.alt = 'Hamburguesa con Pan Integral';
            break;
        case 'brioche':
            imagen.src = 'imagenes/pan_brioche.png';
            imagen.alt = 'Hamburguesa con Pan Brioche';
            break;

        default:
            return; // No hacer nada si no es un ingrediente válido
    }

    // Agregar la imagen al contenedor (sin reemplazar la imagen actual)
    imagenesContainer.appendChild(imagen);
}
