document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar credenciales de admin
    if (email === "admin@cmp.com.ar" && password === "admin123456") {
        localStorage.setItem('loggedInUser', 'admin');
        window.location.href = 'admin_panel.html';
    } else {
        // Verificar credenciales de médico
        const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
        const medico = medicos.find(med => med.email === email && med.password === password);

        if (medico) {
            localStorage.setItem('loggedInUser', medico.nombre);
            window.location.href = 'medico.html';
        } else {
            // Verificar credenciales de paciente
            const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
            const paciente = pacientes.find(pac => pac.email === email && pac.password === password);

            if (paciente) {
                localStorage.setItem('loggedInUser', paciente.nombre);
                window.location.href = 'paciente.html';
            } else {
                alert('Credenciales incorrectas. Intente nuevamente.');
            }
        }
    }
});
