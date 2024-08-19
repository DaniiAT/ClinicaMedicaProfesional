document.addEventListener('DOMContentLoaded', function() {
    cargarNovedades();
});

function cargarNovedades() {
    let novedades = JSON.parse(localStorage.getItem('novedades')) || [];
    let novedadesList = document.getElementById('novedades-list');
    novedadesList.innerHTML = ''; // Limpiar lista

    novedades.forEach(novedad => {
        let novedadCard = document.createElement('div');
        novedadCard.classList.add('novedad-card');
        novedadCard.innerHTML = `
            <img src="${novedad.imagen}" alt="${novedad.titulo}">
            <div class="content">
                <h3>${novedad.titulo}</h3>
                <p>${novedad.descripcion}</p>
                <p class="date">${novedad.fecha}</p>
                <a href="novedad_detalle.html?id=${novedad.id}">Ver más</a>
            </div>
        `;
        novedadesList.appendChild(novedadCard);
    });
}
