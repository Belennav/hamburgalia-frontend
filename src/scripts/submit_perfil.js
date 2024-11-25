// scripts/submit_perfil.js

document.addEventListener('DOMContentLoaded', () => {
    const perfilForm = document.querySelector('#perfil-form');
    
    perfilForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        // Obtener los datos del formulario
        const fotoPerfil = document.querySelector('#foto-perfil').files[0];
        const nombreUsuario = document.querySelector('#nombre-usuario').value;
        const username = document.querySelector('#username').value;
        const descripcionPerfil = document.querySelector('#descripcion-perfil').value;

        // Leer la imagen de perfil (si la hay) como Data URL
        let fotoPerfilUrl = '';
        if (fotoPerfil) {
            const reader = new FileReader();
            reader.onloadend = () => {
                fotoPerfilUrl = reader.result; // La imagen en base64
                // Guardar los datos en localStorage
                guardarPerfil(fotoPerfilUrl, nombreUsuario, username, descripcionPerfil);
            };
            reader.readAsDataURL(fotoPerfil);
        } else {
            // Si no se sube una imagen, solo se guardan los otros datos
            guardarPerfil(fotoPerfilUrl, nombreUsuario, username, descripcionPerfil);
        }
    });

    function guardarPerfil(fotoPerfilUrl, nombreUsuario, username, descripcionPerfil) {
        // Crear objeto de perfil
        const perfil = {
            fotoPerfil: fotoPerfilUrl || 'default-avatar.png', // Imagen por defecto si no hay foto
            nombre: nombreUsuario,
            username: username,
            descripcion: descripcionPerfil
        };

        // Guardar los datos del perfil en localStorage
        localStorage.setItem('perfil', JSON.stringify(perfil));

        // Redirigir a la página de perfil
        window.location.href = 'perfil.html';
    }
});
// scripts/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos del perfil desde localStorage
    const perfil = JSON.parse(localStorage.getItem('perfil'));

    // Verificar si existe el perfil en localStorage
    if (perfil) {
        // Actualizar los campos del perfil
        document.querySelector('#nombre-perfil').textContent = perfil.nombre;
        document.querySelector('#username-perfil').textContent = perfil.username;
        document.querySelector('#descripcion-perfil').textContent = perfil.descripcion;

        // Mostrar la foto de perfil (si la hay)
        const perfilImagen = document.querySelector('#perfil-imagen');
        if (perfil.fotoPerfil) {
            perfilImagen.src = perfil.fotoPerfil;
        }
    } else {
        // Si no hay perfil guardado, redirigir al usuario a la página de actualización del perfil
        alert('Por favor, completa tu perfil.');
        window.location.href = 'submit_perfil.html';
    }
});
