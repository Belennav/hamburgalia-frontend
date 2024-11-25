// Este script maneja la extracción de los parámetros de la URL y los muestra en el resumen

document.addEventListener("DOMContentLoaded", function () {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    // Mostrar los valores en el resumen
    const nombre = params.get("nombre");
    const descripcion = params.get("descripcion");
    const pan = params.get("pan");
    const medallon = params.get("medallon");
    const ingredientes = params.getAll("ingredientes");

    // Asignar los valores al HTML
    document.getElementById("nombre_resumen").textContent = nombre;
    document.getElementById("descripcion_resumen").textContent = descripcion;

    // Mostrar el pan seleccionado
    document.getElementById("pan_resumen").textContent = pan.charAt(0).toUpperCase() + pan.slice(1);

    // Mostrar el medallón seleccionado
    document.getElementById("medallon_resumen").textContent = medallon.charAt(0).toUpperCase() + medallon.slice(1);

    // Mostrar los ingredientes adicionales seleccionados
    const ingredientesLista = document.getElementById("ingredientes_resumen");
    if (ingredientes.length > 0) {
        ingredientes.forEach(ingrediente => {
            const li = document.createElement("li");
            li.textContent = ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1);
            ingredientesLista.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No se seleccionaron ingredientes adicionales.";
        ingredientesLista.appendChild(li);
    }

    // Redirigir a la página de creación si se hace clic en el botón
    document.getElementById("crear_otra").addEventListener("click", function() {
        window.location.href = "crear.html";  // Redirige a crear otra hamburguesa
    });
});
