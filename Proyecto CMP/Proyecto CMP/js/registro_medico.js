document.getElementById("form-register-medico").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const especialidad = document.getElementById("especialidad").value;
    const matricula = document.getElementById("matricula").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    medicos.push({ nombre, especialidad, matricula, email, telefono, password });
    localStorage.setItem("medicos", JSON.stringify(medicos));

    alert("Médico registrado con éxito");
    window.location.href = "login.html"; // Redirige a la página de login después del registro
});
