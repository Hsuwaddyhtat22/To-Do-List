// Array to store the tasks
let tasks = [];

// Function to update task indexes
function updateIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

// Function to save tasks to local storage
export function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
export function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// Function to delete a task
export function deleteTask(todoItem) {
  /* eslint-disable */
  const taskIndex = tasks.findIndex((task) => task.index === parseInt(todoItem.dataset.index));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateIndexes(); // Update task indexes after deleting a task
    /* eslint-disable */
    saveTasksToLocalStorage(); // Save updated tasks to local storage
    renderTodoList(); // Render the updated todo list
  }
}
// Function to edit a task
export function editTask(todoItem) {
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
        updateIndexes(); // Update task indexes after editing a task
        saveTasksToLocalStorage(); // Save updated tasks to local storage
      }
    }
  });
}

// Function to toggle the delete button visibility
export function toggleDeleteButton(todoItem) {
  const moreButton = todoItem.querySelector('.more-btn');
  const deleteButton = todoItem.querySelector('.delete-btn');
  moreButton.style.display = 'none';
  deleteButton.style.display = 'inline-block';
}

// Function to create a new todo item
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
  todoItem.setAttribute('data-index', task.index);
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

// Function to render the todo list
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

// Function to add a new task to the todo list
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

// Function to clear all completed tasks
export function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes(); // Update task indexes after clearing completed tasks
  renderTodoList();
  saveTasksToLocalStorage(); // Save updated tasks to local storage after clearing completed tasks
}