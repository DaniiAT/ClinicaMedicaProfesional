document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    mostrarNovedad(id);
});

function mostrarNovedad(id) {
    let novedades = JSON.parse(localStorage.getItem('novedades')) || [];
    let novedad = novedades.find(n => n.id === id);

    if (novedad) {
        let novedadDetalle = document.getElementById('novedad-detalle');
        novedadDetalle.innerHTML = `
            <img src="${novedad.imagen}" alt="${novedad.titulo}">
            <h1>${novedad.titulo}</h1>
            <p class="date">${novedad.fecha}</p>
            <p>${novedad.descripcion}</p>
        `;
    } else {
        document.getElementById('novedad-detalle').innerHTML = `<p>Novedad no encontrada.</p>`;
    }
}
