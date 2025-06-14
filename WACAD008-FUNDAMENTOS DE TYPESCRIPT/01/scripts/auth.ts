
export interface User {
    username: string;
    password: string;
  }
  
  // Função para verificar se o usuário existe no localStorage
  export function userExists(username: string): boolean {
    const users = loadUsers();
    return users.some(user => user.username === username);
  }
  
  // Função para salvar um novo usuário no localStorage
  export function saveUser(newUser: User): void {
    const users = loadUsers();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Função para carregar todos os usuários do localStorage
  export function loadUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
  
  // Função para validar o login do usuário
  export function validateLogin(username: string, password: string): boolean {
    const users = loadUsers();
    return users.some(user => user.username === username && user.password === password);
  }
  
  // Função para salvar o usuário logado no localStorage
  export function setLoggedUser(username: string): void {
    localStorage.setItem('loggedUser', username);
  }
  
  // Função para obter o usuário logado no localStorage
  export function getLoggedUser(): string | null {
    return localStorage.getItem('loggedUser');
  }
  
  // Função para deslogar o usuário
  export function logoutUser(): void {
    localStorage.removeItem('loggedUser');
  }
  