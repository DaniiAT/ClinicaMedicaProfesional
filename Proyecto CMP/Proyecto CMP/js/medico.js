document.addEventListener("DOMContentLoaded", function() {
    const turnosMedicoDiv = document.getElementById("turnos-medico");
    const medicoActual = JSON.parse(localStorage.getItem("medicoLogueado")); // Supone que ya se almacenó el médico logueado

    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const turnosFiltrados = turnos.filter(turno => turno.medico === medicoActual.email);

    if (turnosFiltrados.length > 0) {
        turnosFiltrados.forEach(turno => {
            const turnoDiv = document.createElement("div");
            turnoDiv.classList.add("turno-item", "mb-3", "p-3", "border", "rounded");

            turnoDiv.innerHTML = `
                <h5>Paciente: ${turno.paciente}</h5>
                <p>Fecha: ${turno.fecha}</p>
                <p>Hora: ${turno.hora}</p>
                <p>Motivo: ${turno.motivo}</p>
                <button class="btn btn-warning btn-edit" data-id="${turno.id}">Modificar</button>
                <button class="btn btn-danger btn-delete" data-id="${turno.id}">Cancelar</button>
            `;

            turnosMedicoDiv.appendChild(turnoDiv);
        });
    } else {
        turnosMedicoDiv.innerHTML = "<p>No tienes turnos asignados.</p>";
    }

    // Eventos para modificar o cancelar turnos
    document.querySelectorAll(".btn-edit").forEach(button => {
        button.addEventListener("click", function() {
            const turnoId = this.getAttribute("data-id");
            modificarTurno(turnoId);
        });
    });

    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", function() {
            const turnoId = this.getAttribute("data-id");
            cancelarTurno(turnoId);
        });
    });
});

function modificarTurno(id) {
    // Función para modificar un turno
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const turno = turnos.find(t => t.id === id);

    const nuevaFecha = prompt("Ingrese la nueva fecha:", turno.fecha);
    const nuevaHora = prompt("Ingrese la nueva hora:", turno.hora);
    
    if (nuevaFecha && nuevaHora) {
        turno.fecha = nuevaFecha;
        turno.hora = nuevaHora;
        localStorage.setItem("turnos", JSON.stringify(turnos));
        alert("Turno modificado con éxito");
        location.reload();
    }
}

function cancelarTurno(id) {
    // Función para cancelar un turno
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos = turnos.filter(turno => turno.id !== id);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    alert("Turno cancelado con éxito");
    location.reload();
}
