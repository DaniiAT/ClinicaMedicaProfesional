document.getElementById("form-register-paciente").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    pacientes.push({ nombre, email, telefono, password });
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    alert("Paciente registrado con éxito");
    window.location.href = "login.html";
});
