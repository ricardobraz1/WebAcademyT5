"use strict";
// login.ts
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (loginUser(username, password)) {
        window.location.href = '../pages/home.html';
    }
    else {
        alert('Falha ao realizar login. Verifique suas credenciais.');
    }
});
