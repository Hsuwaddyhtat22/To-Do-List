// todo.js

// Initialize tasks array from local storage or set to an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(description) {
    const newTask = {
        description,
        completed: false,
        index: tasks.length + 1,
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
}

function deleteTask(index) {
    tasks = tasks.filter((task) => task.index !== index);
    // Update the indexes of remaining tasks
    tasks.forEach((task, idx) => {
        task.index = idx + 1;
    });
    saveTasksToLocalStorage();
}

function editTask(index, description) {
    const task = tasks.find((task) => task.index === index);
    if (task) {
        task.description = description;
        saveTasksToLocalStorage();
    }
}

export { tasks, addTask, deleteTask, editTask, saveTasksToLocalStorage };