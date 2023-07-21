import './style.css';
import * as todo from './todo';

const addTaskButton = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const clearCompletedButton = document.getElementById('clear-completed-btn');

todo.loadTasksFromLocalStorage();

addTaskButton.addEventListener('click', (event) => {
  event.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    todo.addTodoItem(taskText);
    newTaskInput.value = '';
  }
});

clearCompletedButton.addEventListener('click', () => {
  todo.clearCompletedTasks();
});

const todoList = document.getElementById('todo-list');

todoList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('delete-btn')) {
    const todoItem = target.parentElement;
    todo.deleteTask(todoItem);
  }
});

todo.renderTodoList();