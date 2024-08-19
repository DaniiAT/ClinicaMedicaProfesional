document.addEventListener('DOMContentLoaded', function() {
    cargarTurnosMedico();
});

function cargarTurnosMedico() {
    let turnosSolicitados = JSON.parse(localStorage.getItem('turnosSolicitados')) || [];
    let turnosList = document.getElementById('turnos-medico');
    let medicoNombre = JSON.parse(localStorage.getItem('usuario')).nombre; // Asumiendo que el nombre del médico está en el LocalStorage
    
    turnosList.innerHTML = ''; 

    turnosSolicitados.forEach(turno => {
        if (turno.medico === medicoNombre) { // Solo mostrar turnos del médico logueado
            let turnoItem = document.createElement('div');
            turnoItem.innerHTML = `
                <p>Paciente: ${turno.paciente}</p>
                <p>Fecha: ${turno.fecha}</p>
                <p>Motivo: ${turno.motivo}</p>
            `;
            turnosList.appendChild(turnoItem);
        }
    });
}
document.getElementById('logout-button').addEventListener('click', function() {
    // Limpiar el localStorage
    localStorage.removeItem('currentUser');
    // Redirigir a la página de inicio
    window.location.href = 'index.html';
});