document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el envío por defecto del formulario

            var perfilRegistrado = localStorage.getItem('perfilRegistrado');
    
            // Si no está registrado, redirige al usuario a la página de perfil
            if (!perfilRegistrado) {
                alert('Por favor, completa tu perfil antes de continuar.');
                window.location.href = 'perfil.html';
                return; // Detener la ejecución del resto del script si no está registrado
            }
            // Obtener datos del formulario
            const nombre = document.querySelector('#nombre').value;
            const descripcion = document.querySelector('#descripcion').value;
            const pan = document.querySelector('input[name="pan"]:checked').value;
            const proteina = document.querySelector('input[name="proteina"]:checked').value;
            const ingredientes = Array.from(document.querySelectorAll('input[name="ingredientes"]:checked'))
                                      .map(checkbox => checkbox.value);
            const disenos = document.querySelector('#disenos').value;

            // Crear objeto para la hamburguesa
            const hamburguesa = {
                nombre,
                descripcion,
                pan,
                proteina,
                ingredientes,
                disenos,
                puntuacion: 0, // Inicialmente, la puntuación es 0
                comentarios: []
            };
            cargarRankingHamburguesas();

            // Verifica si se está en la página de un post y carga el post correspondiente
            if (window.location.pathname.includes('post.html')) {
                const params = new URLSearchParams(window.location.search);
                const postId = params.get('id');
                if (postId) cargarPost(postId);
            }

            // Formulario de creación de hamburguesa
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    if (!localStorage.getItem('perfilRegistrado')) {
                        alert('Por favor, completa tu perfil antes de continuar.');
                        window.location.href = 'perfil.html';
                        return;
                    }
                    crearHamburguesa();
                });
            }

        // Función para cargar hamburguesas desde el servidor y mostrar en el ranking
        function cargarRankingHamburguesas() {
            fetch('http://localhost:3000/hamburguesas')
                .then(response => response.json())
                .then(data => {
                    data.sort((a, b) => b.puntuacion - a.puntuacion);
                    document.querySelector('#ranking .list-group').innerHTML = data.map(hamburguesa => `
                        <a href="post.html?id=${hamburguesa._id}" class="list-group-item list-group-item-action">
                            <h5 class="mb-1">${hamburguesa.nombre}</h5>
                            <p class="mb-1">${hamburguesa.descripcion}</p>
                            <small>Rating: ${'★'.repeat(hamburguesa.puntuacion)}${'☆'.repeat(5 - hamburguesa.puntuacion)}</small>
                        </a>
                    `).join('');
                })
                .catch(error => console.error('Error al cargar hamburguesas:', error));
        }
            // Enviar los datos al servidor
            fetch('http://localhost:3000/hamburguesas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hamburguesa)
            })
            .then(response => response.json())
            .then(data => {
                alert('¡Hamburguesa creada con éxito!');
                form.reset();
                cargarHamburguesas(); // Recargar la lista de hamburguesas
            })
            .catch(error => console.error('Error al crear hamburguesa:', error));
        });
    }
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si estamos en la página de un post
    if (window.location.pathname.includes('post.html')) {
        // Obtener el ID del post desde la URL
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');

        if (postId) {
            cargarPost(postId);
        }
    }
});

// Función para cargar el post desde el servidor usando el ID
function cargarPost(id) {
    fetch(`http://localhost:3000/posts/${id}`)
        .then(response => response.json())
        .then(post => {
            // Actualizar el contenido del post en la página
            document.querySelector('#titulo-post').textContent = post.titulo;
            document.querySelector('#contenido-post').textContent = post.contenido;

            // Cargar comentarios
            const comentariosSection = document.querySelector('#lista-comentarios');
            comentariosSection.innerHTML = post.comentarios.map(comentario => `
                <li class="list-group-item">${comentario}</li>
            `).join('');
        })
        .catch(error => console.error('Error al cargar el post:', error));
}

// Lógica para agregar un comentario
document.querySelector('#form-comentario').addEventListener('submit', (event) => {
    event.preventDefault();
    const comentario = document.querySelector('#nuevo-comentario').value;
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (comentario && postId) {
        fetch(`http://localhost:3000/posts/${postId}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comentario })
        })
        .then(response => response.json())
        .then(data => {
            alert('Comentario agregado');
            cargarPost(postId); // Recargar el post con el nuevo comentario
        })
        .catch(error => console.error('Error al agregar comentario:', error));
    }
});

 cargarRankingHamburguesas();
});

// Función para cargar hamburguesas desde el servidor y actualizar el ranking
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
// Función para cargar hamburguesas desde el servidor y actualizar el ranking
function cargarHamburguesas() {
    const rankingSection = document.querySelector('#ranking ul');
    if (rankingSection) {
        fetch('http://localhost:3000/hamburguesas')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => b.puntuacion - a.puntuacion); // Ordenar por puntuación

                rankingSection.innerHTML = data.map(hamburguesa => `
                    <li>
                        <h3>${hamburguesa.nombre}</h3>
                        <p>${hamburguesa.descripcion}</p>
                        <p>Puntuación: ${hamburguesa.puntuacion}</p>
                        <button onclick="puntuarHamburguesa('${hamburguesa._id}')">Puntuar</button>
                        <button onclick="comentarHamburguesa('${hamburguesa._id}')">Comentar</button>
                    </li>
                `).join('');
            })
            .catch(error => console.error('Error al cargar hamburguesas:', error));
    }
}

// Función para puntuar una hamburguesa
function puntuarHamburguesa(id) {
    fetch(`http://localhost:3000/hamburguesas/${id}/puntuar`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {
        alert('¡Puntuación añadida!');
        cargarHamburguesas(); // Recargar la lista de hamburguesas
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
            cargarHamburguesas(); // Recargar la lista de hamburguesas
        })
        .catch(error => console.error('Error al comentar hamburguesa:', error));
    }
}