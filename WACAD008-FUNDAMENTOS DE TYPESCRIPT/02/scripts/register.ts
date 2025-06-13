const registerForm = document.getElementById('register-form') as HTMLFormElement;

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    if (registerUser(username, password)) {
        window.location.href = '../pages/login.html';
    }
});
