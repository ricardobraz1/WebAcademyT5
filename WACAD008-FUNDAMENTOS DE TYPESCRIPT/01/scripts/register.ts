import { saveUser, userExists } from './auth.js';

document.getElementById('register-btn')?.addEventListener('click', () => {
  const username = (document.getElementById('register-username') as HTMLInputElement).value;
  const password = (document.getElementById('register-password') as HTMLInputElement).value;

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
