document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-solicitar-turno');
    const medicoSelect = document.getElementById('medico');
    const turnosSolicitadosDiv = document.getElementById('turnos-solicitados');

    function cargarMedicos() {
        let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
        medicos.forEach(medico => {
            let option = document.createElement('option');
            option.value = medico.id;
            option.textContent = `${medico.nombre} - ${medico.especialidad}`;
            medicoSelect.appendChild(option);
        });
    }

    function mostrarTurnosSolicitados() {
        let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        let userId = JSON.parse(localStorage.getItem('user'))?.id; // Obtener ID del paciente logueado
        turnosSolicitadosDiv.innerHTML = '';

        turnos.filter(turno => turno.pacienteId === userId).forEach(turno => {
            let div = document.createElement('div');
            div.innerHTML = `
                <p>Médico: ${turno.medicoNombre}</p>
                <p>Fecha: ${turno.fecha}</p>
                <p>Motivo: ${turno.motivo}</p>
                <button class="btn btn-danger btn-sm" data-id="${turno.id}">Eliminar</button>
            `;
            turnosSolicitadosDiv.appendChild(div);
        });

        turnosSolicitadosDiv.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                eliminarTurno(this.dataset.id);
            });
        });
    }

    function eliminarTurno(turnoId) {
        let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        turnos = turnos.filter(turno => turno.id != turnoId);
        localStorage.setItem('turnos', JSON.stringify(turnos));
        mostrarTurnosSolicitados();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const medicoId = document.getElementById('medico').value;
        const fecha = document.getElementById('fecha').value;
        const motivo = document.getElementById('motivo').value;
        const medico = [...document.getElementById('medico').options].find(opt => opt.value == medicoId).textContent.split(' - ')[0];
        const pacienteId = JSON.parse(localStorage.getItem('user'))?.id; // Obtener ID del paciente logueado

        const nuevoTurno = {
            id: Date.now(),
            medicoId: medicoId,
            medicoNombre: medico,
            pacienteId: pacienteId,
            fecha: fecha,
            motivo: motivo
        };

        let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        turnos.push(nuevoTurno);
        localStorage.setItem('turnos', JSON.stringify(turnos));

        alert('Turno solicitado exitosamente');
        mostrarTurnosSolicitados();
    });

    cargarMedicos();
    mostrarTurnosSolicitados();
});
