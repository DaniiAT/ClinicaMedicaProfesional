document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-register-empresa');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;

        const nuevaEmpresa = {
            id: Date.now(),
            nombre: nombre,
            direccion: direccion
        };

        let empresas = JSON.parse(localStorage.getItem('empresas')) || [];
        empresas.push(nuevaEmpresa);
        localStorage.setItem('empresas', JSON.stringify(empresas));

        alert('Empresa registrada exitosamente');
        window.location.href = 'login.html'; // Redirige al login
    });
});
