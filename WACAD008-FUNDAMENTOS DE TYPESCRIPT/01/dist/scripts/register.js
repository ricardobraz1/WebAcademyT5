// register.ts
var _a;
import { saveUser, userExists } from './auth.js';
(_a = document.getElementById('register-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (!username || !password) {
        alert('Preencha todos os campos.');
        return;
    }
    if (userExists(username)) {
        alert('Usuário já existe.');
        return;
    }
    saveUser({ username, password });
    alert('Usuário registrado com sucesso! Faça o login.');
    window.location.href = 'login.html';
});
