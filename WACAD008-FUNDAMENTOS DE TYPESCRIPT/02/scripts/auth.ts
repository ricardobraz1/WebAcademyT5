interface User {
  username: string;
  password: string;
}

const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

function registerUser(username: string, password: string): boolean {
  if (users.some((user) => user.username === username)) {
      alert('Usuário já existe!');
      return false;
  }

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Usuário registrado com sucesso!');
  return true;
}

function loginUser(username: string, password: string): boolean {
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
      localStorage.setItem('authenticatedUser', username);
      return true;
  }

  alert('Credenciais inválidas!');
  return false;
}

function isAuthenticated(): boolean {
  return localStorage.getItem('authenticatedUser') !== null;
}

function getUser(): string | null {
  return localStorage.getItem('authenticatedUser');
}

function logoutUser(): void {
  localStorage.removeItem('authenticatedUser');
  window.location.href = '../pages/login.html';
}
