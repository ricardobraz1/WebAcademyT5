type Task = [string, Date, Date?, string?];

const tasks: Array<Task> = [];

let editIndex: number | null = null;

const inputTitle = document.getElementById("taskTitle") as HTMLInputElement | null;
const inputDeadline = document.getElementById("taskDeadline") as HTMLInputElement | null;
const inputDescription = document.getElementById("taskDescription") as HTMLInputElement | null;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement | null;
const tasksList = document.getElementById("tasksList");

function createOrUpdateTask(title: string, deadline?: Date, description?: string): void {
  const createdAt = new Date();

  if (editIndex !== null) {
    const original = tasks[editIndex];
    tasks[editIndex] = [title, createdAt, deadline, description];
    editIndex = null;
    if (addTaskBtn) addTaskBtn.textContent = "Add Task";
  } else {
    const newTask: Task = [title, createdAt, deadline, description];
    tasks.push(newTask);
  }

  renderTasks();
  clearInputs();
}

function renderTasks(): void {
  if (!tasksList) return;
  tasksList.innerHTML = "";

  tasks.forEach(([title, createdAt, deadline, description], index) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-3";

    const card = document.createElement("div");
    card.className = "card shadow-sm";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titleEl = document.createElement("h5");
    titleEl.className = "card-title";
    titleEl.textContent = title;

    const textEl = document.createElement("p");
    textEl.className = "card-text";
    textEl.innerHTML = `
      ${deadline ? `<strong>Deadline:</strong> ${deadline.toLocaleString()}<br>` : ""}
      ${description ? `<strong>Description:</strong> ${description}` : ""}
    `;

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-warning me-2";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
      if (inputTitle) inputTitle.value = title;
      if (inputDeadline) inputDeadline.value = deadline ? deadline.toISOString().slice(0, 16) : "";
      if (inputDescription) inputDescription.value = description ?? "";
      editIndex = index;
      if (addTaskBtn) addTaskBtn.textContent = "Save Edit";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "mt-3";
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    cardBody.appendChild(titleEl);
    cardBody.appendChild(textEl);
    cardBody.appendChild(buttonGroup);

    card.appendChild(cardBody);
    col.appendChild(card);

    tasksList.appendChild(col);
  });
}

function clearInputs(): void {
  if (inputTitle) inputTitle.value = "";
  if (inputDeadline) inputDeadline.value = "";
  if (inputDescription) inputDescription.value = "";
}

addTaskBtn?.addEventListener("click", () => {
  const title = inputTitle?.value.trim();
  if (!title) return alert("Title is required!");

  const deadlineStr = inputDeadline?.value;
  const deadline = deadlineStr ? new Date(deadlineStr) : undefined;
  const description = inputDescription?.value.trim();

  createOrUpdateTask(title, deadline, description);
});
