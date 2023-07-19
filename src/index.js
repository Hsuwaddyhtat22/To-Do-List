const addTaskButton = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed-btn');
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTodoItem(taskText);
        newTaskInput.value = '';
    }
});

function deleteTask(todoItem) { todoItem.remove(); }

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

function createTodoItem(taskText) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    const taskElement = document.createElement('span');
    taskElement.classList.add('task');
    taskElement.textContent = taskText;
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
    return todoItem;
}

function addTodoItem(taskText) {
    const todoItem = createTodoItem(taskText);
    todoList.appendChild(todoItem);
    const checkbox = todoItem.querySelector('.task-checkbox');
    const taskElement = todoItem.querySelector('.task');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskElement.classList.add('completed');
        } else { taskElement.classList.remove('completed'); }
    });
}
clearCompletedButton.addEventListener('click', () => {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((todoItem) => {
        const checkbox = todoItem.querySelector('.task-checkbox');
        if (checkbox.checked) { deleteTask(todoItem); }
    });
});