// Función para cargar hamburguesas desde el servidor y mostrar en el ranking
function cargarRankingHamburguesas() {
    const rankingSection = document.querySelector('#ranking');
    if (rankingSection) {
        fetch('http://localhost:3000/hamburguesas')  // URL del servidor local
            .then(response => response.json())
            .then(data => {
                // Ordenar las hamburguesas por puntuación
                data.sort((a, b) => b.puntuacion - a.puntuacion);

                // Insertar las hamburguesas en el HTML
                rankingSection.innerHTML = data.map(hamburguesa => `
                    <a href="post.html?id=${hamburguesa._id}" class="list-group-item list-group-item-action">
                        <h5 class="mb-1">${hamburguesa.nombre}</h5>
                        <p class="mb-1">${hamburguesa.descripcion}</p>
                        <small>Rating: ${'★'.repeat(hamburguesa.puntuacion)}${'☆'.repeat(5 - hamburguesa.puntuacion)}</small>
                    </a>
                `).join('');
            })
            .catch(error => console.error('Error al cargar hamburguesas:', error));
    }
}

// Llamada a cargarRankingHamburguesas cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    cargarRankingHamburguesas();
});
