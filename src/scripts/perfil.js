// scripts/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-perfil');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Recuperar datos del formulario
        const fotoPerfil = document.querySelector('#foto-perfil').files[0];
        const nombre = document.querySelector('#nombre-usuario').value;
        const username = document.querySelector('#username').value;
        const descripcion = document.querySelector('#descripcion-perfil').value;

        // Convertir la foto a Base64 si se sube una foto
        let fotoPerfilBase64 = null;
        if (fotoPerfil) {
            const reader = new FileReader();
            reader.onloadend = () => {
                fotoPerfilBase64 = reader.result;
                guardarPerfil(fotoPerfilBase64, nombre, username, descripcion);
            };
            reader.readAsDataURL(fotoPerfil); // Convierte la foto a Base64
        } else {
            guardarPerfil(null, nombre, username, descripcion);
        }
    });
});

// Función para guardar el perfil en localStorage
function guardarPerfil(fotoPerfil, nombre, username, descripcion) {
    const perfil = {
        fotoPerfil: fotoPerfil,
        nombre: nombre,
        username: username,
        descripcion: descripcion
    };

    // Guardar en localStorage
    localStorage.setItem('perfil', JSON.stringify(perfil));
    alert('Perfil guardado con éxito');
    window.location.href = 'perfil.html'; // Redirigir al perfil
}
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
