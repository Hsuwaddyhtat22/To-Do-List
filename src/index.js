import './style.css';
import * as todo from './todo';

const addTaskButton = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const clearCompletedButton = document.getElementById('clear-completed-btn');

// Function to add a new task when the "Add Task" button is clicked
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        todo.addTodoItem(taskText);
        newTaskInput.value = '';
    }
});

// Function to clear all completed tasks when the "Clear Completed" button is clicked
clearCompletedButton.addEventListener('click', () => {
    todo.clearCompletedTasks();
});

// Load tasks from local storage and then render the todo list
todo.loadTasksFromLocalStorage();
todo.renderTodoList();