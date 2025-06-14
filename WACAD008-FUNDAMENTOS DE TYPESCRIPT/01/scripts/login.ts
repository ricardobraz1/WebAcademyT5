import { validateLogin, setLoggedUser } from './auth.js';

document.getElementById('login-btn')?.addEventListener('click', () => {
  const username = (document.getElementById('login-username') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;

  if (!username || !password) {
    alert('Preencha todos os campos.');
    return;
  }

  if (validateLogin(username, password)) {
    setLoggedUser(username);
    window.location.href = 'home.html';
  } else {
    alert('Usuário ou senha inválidos.');
  }
});
