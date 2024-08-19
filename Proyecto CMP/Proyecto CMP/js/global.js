function checkSession() {
    let userSession = localStorage.getItem('loggedUser');
    if (userSession) {
        document.getElementById('logoutBtn').style.display = 'block';
    } else {
        document.getElementById('logoutBtn').style.display = 'none';
    }
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedUser');
    alert('Sesión cerrada');
    window.location.href = 'index.html';
});

window.onload = checkSession;
