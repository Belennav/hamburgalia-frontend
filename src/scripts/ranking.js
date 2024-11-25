// Función para puntuar una hamburguesa
function puntuarHamburguesa(id) {
    fetch(`http://localhost:3000/hamburguesas/${id}/puntuar`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {
        alert('¡Puntuación añadida!');
        cargarRankingHamburguesas(); // Recargar la lista de hamburguesas
    })
    .catch(error => console.error('Error al puntuar hamburguesa:', error));
}

// Función para comentar una hamburguesa
function comentarHamburguesa(id) {
    const comentario = prompt('Escribe tu comentario:');
    if (comentario) {
        fetch(`http://localhost:3000/hamburguesas/${id}/comentar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comentario })
        })
        .then(response => response.json())
        .then(data => {
            alert('¡Comentario añadido!');
            cargarRankingHamburguesas(); // Recargar la lista de hamburguesas
        })
        .catch(error => console.error('Error al comentar hamburguesa:', error));
    }
}
