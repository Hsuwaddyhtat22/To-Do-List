import './style.css';
import * as todo from './todo';

const addTaskButton = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const clearCompletedButton = document.getElementById('clear-completed-btn');

// Add a new task
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        todo.addTodoItem(taskText);
        newTaskInput.value = '';
    }
});

// Clear all completed tasks
clearCompletedButton.addEventListener('click', () => {
    todo.clearCompletedTasks();
});

// Initial rendering of tasks
todo.loadTasksFromLocalStorage();
todo.renderTodoList();