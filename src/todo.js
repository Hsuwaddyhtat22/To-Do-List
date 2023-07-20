let tasks = [];

function updateIndexes() {
    tasks.forEach((task, index) => {
        task.index = index + 1;
    });
}

export function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(todoItem) {
    todoItem.remove();
    updateIndexes(); // Update task indexes after deleting a task
    saveTasksToLocalStorage(); // Save updated tasks to local storage
}

export function editTask(todoItem) {
    // ... (rest of the editTask function remains the same)
}

export function toggleDeleteButton(todoItem) {
    const moreButton = todoItem.querySelector('.more-btn');
    const deleteButton = todoItem.querySelector('.delete-btn');
    moreButton.style.display = 'none';
    deleteButton.style.display = 'inline-block';
}

export function createTodoItem(task) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
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
        saveTasksToLocalStorage(); // Save updated tasks to local storage when checkbox is toggled
    });
    return todoItem;
}

export function renderTodoList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    // Sort tasks by index value before rendering
    tasks.sort((a, b) => a.index - b.index);

    tasks.forEach((task) => {
        const todoItem = createTodoItem(task);
        todoList.appendChild(todoItem);
    });
}

export function addTodoItem(taskText) {
    const newTask = {
        description: taskText,
        completed: false,
        index: tasks.length + 1,
    };
    tasks.push(newTask);
    renderTodoList();
    saveTasksToLocalStorage(); // Save updated tasks to local storage when a new task is added
}

export function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    updateIndexes(); // Update task indexes after clearing completed tasks
    renderTodoList();
    saveTasksToLocalStorage(); // Save updated tasks to local storage after clearing completed tasks
}

export function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}