// Verificar si estamos en la página de un post
if (window.location.pathname.includes('post.html')) {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (postId) {
        cargarPost(postId);
    }
}

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
