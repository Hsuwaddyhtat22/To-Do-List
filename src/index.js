import './style.css';
import { addTodoItem, deleteTask, editTask, renderTodoList, toggleDeleteButton, updateIndexes } from './todo';

const addTaskButton = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const clearCompletedButton = document.getElementById('clear-completed-btn');

addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTodoItem(taskText);
        newTaskInput.value = '';
    }
});

clearCompletedButton.addEventListener('click', () => {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((todoItem) => {
        const checkbox = todoItem.querySelector('.task-checkbox');
        if (checkbox.checked) { deleteTask(todoItem); }
    });
});

renderTodoList(); // Initial rendering of tasks