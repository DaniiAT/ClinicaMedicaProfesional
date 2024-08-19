document.addEventListener("DOMContentLoaded", function() {
    const navEmpresas = document.getElementById("nav-empresas");
    const navPacientes = document.getElementById("nav-pacientes");
    const navMedicos = document.getElementById("nav-medicos");
    const navTurnos = document.getElementById("nav-turnos");
    const navSalir = document.getElementById("nav-salir");

    const panelEmpresas = document.getElementById("empresas-panel");
    const panelPacientes = document.getElementById("pacientes-panel");
    const panelMedicos = document.getElementById("medicos-panel");
    const panelTurnos = document.getElementById("turnos-panel");

    function showPanel(panel) {
        panelEmpresas.classList.add("d-none");
        panelPacientes.classList.add("d-none");
        panelMedicos.classList.add("d-none");
        panelTurnos.classList.add("d-none");

        panel.classList.remove("d-none");
    }

    navEmpresas.addEventListener("click", function() {
        showPanel(panelEmpresas);
    });

    navPacientes.addEventListener("click", function() {
        showPanel(panelPacientes);
    });

    navMedicos.addEventListener("click", function() {
        showPanel(panelMedicos);
    });

    navTurnos.addEventListener("click", function() {
        showPanel(panelTurnos);
    });

    navSalir.addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });

    loadData();
});

function loadData() {
    const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

    renderCards(empresas, "lista-empresas");
    renderCards(pacientes, "lista-pacientes");
    renderCards(medicos, "lista-medicos", true);
    renderCards(turnos, "lista-turnos");
}

function renderCards(items, containerId, isMedico = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    items.forEach(item => {
        console.log (item)
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">${item.nombre}</h5>
                </div>
                <div class="card-body">
                    <p>${item.info || `Fecha: ${item.fecha}}<br>Motivo: ${item.motivo}`}</p>
                    ${isMedico ? `<p>Especialidad: ${item.especialidad}</p>` : ""}
                    <div class="card-buttons">
                        <button class="btn btn-primary btn-details" data-id="${item.id}">Ver Detalles</button>
                        <button class="btn btn-danger btn-delete" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll(".btn-details").forEach(button => {
        button.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            showDetails(id);
        });
    });

    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            deleteItem(id);
        });
    });
}

function showDetails(id) {
    const item = getItemById(id);
    const modalBody = document.getElementById("modal-body-content");
    modalBody.innerHTML = `
        <p><strong>Nombre:</strong> ${item.nombre || item.paciente}</p>
        <p><strong>Información:</strong> ${item.info || `Fecha: ${item.fecha}<br>Motivo: ${item.motivo}`}</p>
        ${item.especialidad ? `<p><strong>Especialidad:</strong> ${item.especialidad}</p>` : ""}
    `;
    $('#detailsModal').modal('show');
}

function deleteItem(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este ítem?")) {
        const container = document.querySelector("#panel-content .panel:not(.d-none) .row");
        const card = container.querySelector(`.btn-delete[data-id="${id}"]`).closest(".card");
        card.remove();

        // Actualizar localStorage después de eliminar
        let items = JSON.parse(localStorage.getItem(container.id.replace('lista-', ''))) || [];
        items = items.filter(item => item.id != id);
        localStorage.setItem(container.id.replace('lista-', ''), JSON.stringify(items));
    }
}

function getItemById(id) {
    const allItems = [
        ...JSON.parse(localStorage.getItem('empresas')) || [],
        ...JSON.parse(localStorage.getItem('pacientes')) || [],
        ...JSON.parse(localStorage.getItem('medicos')) || [],
        ...JSON.parse(localStorage.getItem('turnos')) || []
    ];
    return allItems.find(item => item.id == id);
}
