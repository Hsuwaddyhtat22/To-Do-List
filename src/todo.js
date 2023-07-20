const todoList = document.getElementById('todo-list');
let tasks = loadTasksFromLocalStorage();

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function deleteTask(todoItem) {
    const index = parseInt(todoItem.dataset.index);
    tasks.splice(index, 1);
    updateIndexes();
    saveTasksToLocalStorage();
    renderTodoList();
}

function editTask(todoItem) {
    const taskElement = todoItem.querySelector('.task');
    const taskText = taskElement.textContent;
    taskElement.innerHTML = '';
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskText;
    editInput.classList.add('edit-input');
    taskElement.appendChild(editInput);
    editInput.focus();
    editInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const newText = editInput.value.trim();
            if (newText !== '') {
                taskElement.textContent = newText;
                todoItem.style.backgroundColor = '';
                todoItem.querySelector('.more-btn').style.display = 'inline-block';
                todoItem.querySelector('.delete-btn').style.display = 'none';
                const index = parseInt(todoItem.dataset.index);
                tasks[index].description = newText;
                saveTasksToLocalStorage();
            }
        }
    });
}

function toggleDeleteButton(todoItem) {
    const moreButton = todoItem.querySelector('.more-btn');
    const deleteButton = todoItem.querySelector('.delete-btn');
    moreButton.style.display = 'none';
    deleteButton.style.display = 'inline-block';
}

function createTodoItem(task, index) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.dataset.index = index;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    const taskElement = document.createElement('span');
    taskElement.classList.add('task');
    taskElement.textContent = task.description;
    if (task.completed) {
        taskElement.classList.add('completed');
    }
    const moreButton = document.createElement('button');
    moreButton.classList.add('more-btn');
    moreButton.innerHTML = '<i class="material-icons">more_vert</i>';
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    todoItem.appendChild(checkbox);
    todoItem.appendChild(taskElement);
    todoItem.appendChild(moreButton);
    todoItem.appendChild(deleteButton);
    moreButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDeleteButton(todoItem);
        editTask(todoItem);
        todoItem.style.border = 'none';
    });
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteTask(todoItem);
    });
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        if (task.completed) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }
        saveTasksToLocalStorage();
    });
    return todoItem;
}

function renderTodoList() {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const todoItem = createTodoItem(task, index);

        todoList.appendChild(todoItem);
    });
}

function addTodoItem(taskText) {
    const newTask = {
        description: taskText,
        completed: false,
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTodoList();
}

function updateIndexes() {
    tasks.forEach((task, index) => {
        task.index = index + 1;
    });
    saveTasksToLocalStorage();
}

export { addTodoItem, deleteTask, editTask, renderTodoList, tasks };