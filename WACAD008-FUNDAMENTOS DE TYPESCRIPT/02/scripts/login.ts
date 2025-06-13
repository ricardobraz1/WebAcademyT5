const loginForm = document.getElementById('login-form') as HTMLFormElement;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (loginUser(username, password)) {
        window.location.href = '../pages/home.html';
    } else {
        alert('Falha ao realizar login. Verifique suas credenciais.');
    }
});
