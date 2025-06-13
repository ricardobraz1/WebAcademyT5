var tasks = [];
var editIndex = null;
var inputTitle = document.getElementById("taskTitle");
var inputDeadline = document.getElementById("taskDeadline");
var inputDescription = document.getElementById("taskDescription");
var addTaskBtn = document.getElementById("addTaskBtn");
var tasksList = document.getElementById("tasksList");
function createOrUpdateTask(title, deadline, description) {
    var createdAt = new Date();
    if (editIndex !== null) {
        var original = tasks[editIndex];
        tasks[editIndex] = [title, createdAt, deadline, description];
        editIndex = null;
        if (addTaskBtn)
            addTaskBtn.textContent = "Add Task";
    }
    else {
        var newTask = [title, createdAt, deadline, description];
        tasks.push(newTask);
    }
    renderTasks();
    clearInputs();
}
function renderTasks() {
    if (!tasksList)
        return;
    tasksList.innerHTML = "";
    tasks.forEach(function (_a, index) {
        var title = _a[0], createdAt = _a[1], deadline = _a[2], description = _a[3];
        var col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-3";
        var card = document.createElement("div");
        card.className = "card shadow-sm";
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        var titleEl = document.createElement("h5");
        titleEl.className = "card-title";
        titleEl.textContent = title;
        var textEl = document.createElement("p");
        textEl.className = "card-text";
        textEl.innerHTML = "\n      ".concat(deadline ? "<strong>Deadline:</strong> ".concat(deadline.toLocaleString(), "<br>") : "", "\n      ").concat(description ? "<strong>Description:</strong> ".concat(description) : "", "\n    ");
        var editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-warning me-2";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            if (inputTitle)
                inputTitle.value = title;
            if (inputDeadline)
                inputDeadline.value = deadline ? deadline.toISOString().slice(0, 16) : "";
            if (inputDescription)
                inputDescription.value = description !== null && description !== void 0 ? description : "";
            editIndex = index;
            if (addTaskBtn)
                addTaskBtn.textContent = "Save Edit";
        });
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            renderTasks();
        });
        var buttonGroup = document.createElement("div");
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
function clearInputs() {
    if (inputTitle)
        inputTitle.value = "";
    if (inputDeadline)
        inputDeadline.value = "";
    if (inputDescription)
        inputDescription.value = "";
}
addTaskBtn === null || addTaskBtn === void 0 ? void 0 : addTaskBtn.addEventListener("click", function () {
    var title = inputTitle === null || inputTitle === void 0 ? void 0 : inputTitle.value.trim();
    if (!title)
        return alert("Title is required!");
    var deadlineStr = inputDeadline === null || inputDeadline === void 0 ? void 0 : inputDeadline.value;
    var deadline = deadlineStr ? new Date(deadlineStr) : undefined;
    var description = inputDescription === null || inputDescription === void 0 ? void 0 : inputDescription.value.trim();
    createOrUpdateTask(title, deadline, description);
});
