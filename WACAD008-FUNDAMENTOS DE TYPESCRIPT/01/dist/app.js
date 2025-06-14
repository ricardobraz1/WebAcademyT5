"use strict";
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
let isEditing = false;
let editingId = null;
// Função para carregar lembretes do Local Storage
function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    reminders.forEach((reminder) => {
        addReminderToDOM(reminder);
    });
}
// Função para adicionar lembrete ao DOM
function addReminderToDOM(reminder) {
    const [id, title, dueDate, description] = reminder;
    const li = document.createElement('li');
    li.id = id;
    li.innerHTML = `
        <span><strong>${title}</strong> - ${description} (Até: ${new Date(dueDate).toLocaleString()})</span>
        <div>
            <button onclick="editReminder('${id}')">Editar</button>
            <button onclick="deleteReminder('${id}')">Excluir</button>
        </div>
    `;
    todoList.appendChild(li);
}
// Função para salvar lembrete no Local Storage
function saveReminder(reminder) {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    if (isEditing && editingId) {
        const index = reminders.findIndex((r) => r[0] === editingId);
        reminders[index] = reminder;
        isEditing = false;
        editingId = null;
    }
    else {
        reminders.push(reminder);
    }
    localStorage.setItem('reminders', JSON.stringify(reminders));
}
// Função para excluir lembrete
function deleteReminder(id) {
    var _a;
    let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    reminders = reminders.filter((reminder) => reminder[0] !== id);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.remove();
}
// Função para editar lembrete
function editReminder(id) {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const reminder = reminders.find((r) => r[0] === id);
    if (reminder) {
        const [reminderId, title, dueDate, description] = reminder;
        document.getElementById('title').value = title;
        document.getElementById('due-date').value = dueDate;
        document.getElementById('description').value = description;
        isEditing = true;
        editingId = reminderId;
    }
}
// Evento de submissão do formulário
todoForm.addEventListener('submit', (e) => {
    var _a;
    e.preventDefault();
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('due-date').value;
    const description = document.getElementById('description').value;
    const id = editingId ? editingId : Date.now().toString();
    const reminder = [id, title, dueDate, description];
    if (isEditing) {
        // Remove o lembrete antigo da lista antes de adicionar o atualizado
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.remove();
    }
    addReminderToDOM(reminder);
    saveReminder(reminder);
    todoForm.reset();
    isEditing = false;
    editingId = null;
});
// Carregar lembretes salvos ao carregar a página
loadReminders();
// Tornar as funções editReminder e deleteReminder globais para uso no DOM
window.editReminder = editReminder;
window.deleteReminder = deleteReminder;
