var _a, _b;
import { getLoggedUser, logoutUser } from './auth.js';
// Checa se o usuário está logado
const loggedUser = getLoggedUser();
if (!loggedUser) {
    alert('Você precisa estar logado para acessar essa página.');
    window.location.href = 'login.html';
}
// Lógica para logout
(_a = document.getElementById('logout-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    logoutUser();
    window.location.href = 'login.html';
});
// Função para salvar lembretes no localStorage
function saveReminders(reminders) {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}
// Função para carregar lembretes do localStorage
function loadReminders() {
    return JSON.parse(localStorage.getItem('reminders') || '[]');
}
// Função para adicionar um lembrete
function addReminder(reminder) {
    const reminders = loadReminders();
    reminders.push(reminder);
    saveReminders(reminders);
    renderReminders();
}
// Função para editar um lembrete
function editReminder(id, updatedReminder) {
    const reminders = loadReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index !== -1) {
        reminders[index] = updatedReminder;
        saveReminders(reminders);
        renderReminders();
    }
}
// Função para excluir um lembrete
function deleteReminder(id) {
    const reminders = loadReminders();
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
    renderReminders();
}
// Renderiza os lembretes na tela
function renderReminders() {
    const reminderList = document.getElementById('reminder-list');
    reminderList.innerHTML = '';
    const reminders = loadReminders();
    // Filtrar lembretes pelo usuário logado
    const userReminders = reminders.filter(reminder => reminder.user === loggedUser);
    userReminders.forEach(reminder => {
        const reminderItem = document.createElement('div');
        reminderItem.classList.add('reminder-item');
        reminderItem.innerHTML = `
      <h3>${reminder.title}</h3>
      <p>${reminder.description}</p>
      <p><strong>Até:</strong> ${new Date(reminder.dueDate).toLocaleString()}</p>
      <button class="edit-btn" data-id="${reminder.id}">Editar</button>
      <button class="delete-btn" data-id="${reminder.id}">Excluir</button>
    `;
        reminderList.appendChild(reminderItem);
    });
    // Adicionar eventos para os botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const reminder = loadReminders().find(r => r.id === id);
            if (reminder) {
                document.getElementById('reminder-title').value = reminder.title;
                document.getElementById('reminder-description').value = reminder.description;
                document.getElementById('reminder-date').value = reminder.dueDate;
                document.getElementById('reminder-id').value = id.toString();
            }
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteReminder(id);
        });
    });
}
// Inicialização da página
renderReminders();
// Evento para adicionar ou editar lembrete
(_b = document.getElementById('reminder-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('reminder-title').value;
    const description = document.getElementById('reminder-description').value;
    const dueDate = document.getElementById('reminder-date').value;
    const id = document.getElementById('reminder-id').value;
    const user = loggedUser; // Pega o usuário logado para associar ao lembrete
    if (id) {
        // Se houver um ID, significa que estamos editando
        editReminder(parseInt(id), { id: parseInt(id), title, description, dueDate, user: loggedUser });
    }
    else {
        // Caso contrário, estamos criando um novo lembrete
        const newId = Date.now(); // ID único baseado no timestamp
        addReminder({ id: newId, title, description, dueDate, user: loggedUser });
    }
    // Limpar o formulário
    document.getElementById('reminder-form').reset();
});
