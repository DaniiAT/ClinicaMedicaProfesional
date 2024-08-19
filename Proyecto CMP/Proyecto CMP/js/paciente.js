document.addEventListener('DOMContentLoaded', () => {
    const turnosPacienteDiv = document.getElementById('turnos-paciente');
    let userId = JSON.parse(localStorage.getItem('user'))?.id; // Obtener ID del paciente logueado

    function mostrarTurnos() {
        let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        turnosPacienteDiv.innerHTML = '';

        turnos.filter(turno => turno.pacienteId === userId).forEach(turno => {
            let div = document.createElement('div');
            div.innerHTML = `
                <p>Médico: ${turno.medicoNombre}</p>
                <p>Fecha: ${turno.fecha}</p>
                <p>Motivo: ${turno.motivo}</p>
                <button class="btn btn-danger btn-sm" data-id="${turno.id}">Eliminar</button>
            `;
            turnosPacienteDiv.appendChild(div);
        });

        turnosPacienteDiv.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                eliminarTurno(this.dataset.id);
            });
        });
    }

    function eliminarTurno(turnoId) {
        let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        turnos = turnos.filter(turno => turno.id != turnoId);
        localStorage.setItem('turnos', JSON.stringify(turnos));
        mostrarTurnos();
    }

    mostrarTurnos();
});
