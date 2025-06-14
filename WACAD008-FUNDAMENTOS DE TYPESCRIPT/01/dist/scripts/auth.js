// auth.ts
// Função para verificar se o usuário existe no localStorage
export function userExists(username) {
    const users = loadUsers();
    return users.some(user => user.username === username);
}
// Função para salvar um novo usuário no localStorage
export function saveUser(newUser) {
    const users = loadUsers();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}
// Função para carregar todos os usuários do localStorage
export function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}
// Função para validar o login do usuário
export function validateLogin(username, password) {
    const users = loadUsers();
    return users.some(user => user.username === username && user.password === password);
}
// Função para salvar o usuário logado no localStorage
export function setLoggedUser(username) {
    localStorage.setItem('loggedUser', username);
}
// Função para obter o usuário logado no localStorage
export function getLoggedUser() {
    return localStorage.getItem('loggedUser');
}
// Função para deslogar o usuário
export function logoutUser() {
    localStorage.removeItem('loggedUser');
}
