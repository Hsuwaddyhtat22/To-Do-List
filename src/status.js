// status.js
/* eslint-disable */
export let items = [];

export function updateStatus(index, completed) {
  const task = items.find((item) => item.index === index);
  if (task) {
    task.completed = completed;
  }
}

export function saveItemsToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(items));
}

export function loadItemsFromLocalStorage() {
  const savedItems = localStorage.getItem('tasks');
  if (savedItems) {
    items = JSON.parse(savedItems);
  }
}

function filterCompletedTasks() {
  items = items.filter((task) => !task.completed);
}

export function clearCompletedTasks() {
  const completedTasks = items.filter((task) => !task.completed);
  items.length = 0; // Clear the array in-place
  completedTasks.forEach((task) => {
    items.push(task);
  });
  updateIndexes();
  saveItemsToLocalStorage();
}