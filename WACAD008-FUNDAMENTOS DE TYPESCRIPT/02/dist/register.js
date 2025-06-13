"use strict";
// register.ts
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    if (registerUser(username, password)) {
        window.location.href = '../pages/login.html';
    }
});
