import { items, updateStatus, saveItemsToLocalStorage } from './status';

function updateIndexes() {
  items.forEach((task, index) => {
    task.index = index + 1;
  });
}

export function deleteTask(todoItem) {
  /* eslint-disable */
  const taskIndex = items.findIndex((task) => task.index === parseInt(todoItem.dataset.index));
  if (taskIndex !== -1) {
    items.splice(taskIndex, 1);
    updateIndexes();
    saveItemsToLocalStorage();
    renderTodoList();
  }
}

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

        const index = parseInt(todoItem.getAttribute('data-index'));
        const task = items.find((item) => item.index === index);
        if (task) {
          task.description = newText;
          saveItemsToLocalStorage();
        }
      }
    }
  });
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
    const index = parseInt(todoItem.getAttribute('data-index'));
    updateStatus(index, checkbox.checked);
    if (checkbox.checked) {
      taskElement.classList.add('completed');
    } else {
      taskElement.classList.remove('completed');
    }
    saveItemsToLocalStorage();
  });
  return todoItem;
}

export function renderTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  items.sort((a, b) => a.index - b.index);

  items.forEach((task) => {
    const todoItem = createTodoItem(task);
    todoList.appendChild(todoItem);
  });
}

export function addTodoItem(taskText) {
  const newTask = {
    description: taskText,
    completed: false,
    index: items.length + 1,
  };
  items.push(newTask);
  renderTodoList();
  saveItemsToLocalStorage();
}
export function clearCompletedTasks() {
  const completedTasks = items.filter((task) => !task.completed);
  items.length = 0; // Clear the array in-place
  completedTasks.forEach((task) => {
    items.push(task);
  });
  updateIndexes();
  renderTodoList();
  saveItemsToLocalStorage();
}