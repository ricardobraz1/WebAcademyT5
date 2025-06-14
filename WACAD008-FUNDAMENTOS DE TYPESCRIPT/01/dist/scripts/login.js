// login.ts
var _a;
import { validateLogin, setLoggedUser } from './auth.js';
(_a = document.getElementById('login-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
        alert('Preencha todos os campos.');
        return;
    }
    if (validateLogin(username, password)) {
        setLoggedUser(username);
        window.location.href = 'home.html';
    }
    else {
        alert('Usuário ou senha inválidos.');
    }
});
