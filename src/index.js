import './style.css';
import { tasks, addTask, deleteTask, editTask, saveTasksToLocalStorage } from './todo.js'; // Import saveTasksToLocalStorage



const addTaskButton = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed-btn');

function deleteTaskHandler(todoItem) {
    const index = parseInt(todoItem.dataset.index);
    deleteTask(index);
    renderTodoList();
}

function editTaskHandler(todoItem) {
    const taskElement = todoItem.querySelector('.task');
    const index = parseInt(todoItem.dataset.index);
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
            editTask(index, newText);
            renderTodoList();
        }
    });
}

function createTodoItem(task) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.dataset.index = task.index;

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
        editTaskHandler(todoItem);
    });

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteTaskHandler(todoItem);
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

    // Sort tasks by index value before rendering
    tasks.sort((a, b) => a.index - b.index);

    tasks.forEach((task) => {
        const todoItem = createTodoItem(task);
        todoList.appendChild(todoItem);
    });
}

function addTodoItem(taskText) {
    addTask(taskText);
    renderTodoList();
}

addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTodoItem(taskText);
        newTaskInput.value = '';
    }
});

clearCompletedButton.addEventListener('click', () => {
    tasks.forEach((task, index) => {
        if (task.completed) {
            deleteTask(index);
        }
    });
    renderTodoList();
});

renderTodoList(); // Initial rendering of tasks