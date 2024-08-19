document.addEventListener('DOMContentLoaded', function() {
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];

    const listaMedicos = document.getElementById('lista-medicos');

    medicos.forEach(medico => {
        const medicoCard = document.createElement('div');
        medicoCard.className = 'col-md-4 mb-4';
        medicoCard.innerHTML = `
            <div class="card">
                <img src="${medico.imagen}" class="card-img-top" alt="${medico.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${medico.nombre}</h5>
                    <p class="card-text">${medico.especialidad}</p>
                    <button class="btn btn-primary btn-solicitar-turno" data-id="${medico.id}">Pedir Turno</button>
                </div>
            </div>
        `;
        listaMedicos.appendChild(medicoCard);
    });

    // Añadir event listener a los botones de "Pedir Turno"
    listaMedicos.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-solicitar-turno')) {
            const medicoId = event.target.getAttribute('data-id');
            localStorage.setItem('medicoSeleccionado', medicoId);
            window.location.href = 'solicitar_turno.html';
        }
    });
});
