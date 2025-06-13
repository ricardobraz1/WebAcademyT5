"use strict";
// auth.ts
const users = JSON.parse(localStorage.getItem('users') || '[]');
function registerUser(username, password) {
    if (users.some((user) => user.username === username)) {
        alert('Usuário já existe!');
        return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    return true;
}
function loginUser(username, password) {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('authenticatedUser', username);
        return true;
    }
    alert('Credenciais inválidas!');
    return false;
}
function isAuthenticated() {
    return localStorage.getItem('authenticatedUser') !== null;
}
function getUser() {
    return localStorage.getItem('authenticatedUser');
}
function logoutUser() {
    localStorage.removeItem('authenticatedUser');
    window.location.href = '../pages/login.html';
}
