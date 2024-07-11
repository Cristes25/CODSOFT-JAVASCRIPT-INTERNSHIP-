// script.js

// Event listener to load tasks from local storage when DOM content is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener for adding a new task
document.querySelector('#task-form').addEventListener('submit', addTask);

// Event listener for modifying tasks (edit or delete)
document.querySelector('#task-list').addEventListener('click', modifyTask);

// Load tasks from local storage and display them
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => createTaskElement(task));
}

// Add a new task
function addTask(e) {
    e.preventDefault(); // Prevent form from submitting in the traditional way

    const taskInput = document.querySelector('#task-input');
    const taskText = taskInput.value;

    if (taskText === '') return; // Do nothing if the input is empty

    createTaskElement(taskText); // Create and display the new task
    storeTaskInLocalStorage(taskText); // Store the new task in local storage
    taskInput.value = ''; // Clear the input field
}

// Create and display a task element
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskText));
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed'); // Toggle 'completed' class
    });

    document.querySelector('#task-list').appendChild(li);
    
}

// Modify a task (edit or delete)
function modifyTask(e) {
    if (e.target.textContent === 'Delete'){
        deleteTask(e.target.parentElement);
    } else if (e.target.textContent === 'Edit') {
        editTask(e.target.parentElement);
    }
}

// Delete a task
function deleteTask(taskElement) {
    const taskText=taskElement.firstChild.textContent.style.alignItem="center"
    taskElement.remove(); // Remove the task from the DOM
    removeTaskFromLocalStorage(taskText); // Remove the task from local storage
}

// Edit a task
function editTask(taskElement) {
    const taskText = taskElement.firstChild.textContent;
    const newTaskText = prompt('Edit your task', taskText);

    if (newTaskText !== null && newTaskText !== '') {
        taskElement.firstChild.textContent = newTaskText; // Update the task in the DOM
        updateTaskInLocalStorage(taskText, newTaskText); // Update the task in local storage
    }
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Store a task in local storage
function storeTaskInLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove a task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update a task in local storage
function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(t => (t === oldTask ? newTask : t));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
