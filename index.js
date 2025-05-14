// Select elements
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on page load
document.addEventListener('DOMContentLoaded', displayTasks);

// Event listener to add a new task
addButton.addEventListener('click', function () {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: priority,
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = ''; // Clear input field
    displayTasks();
  }
});

// Display tasks function
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);
    li.classList.add(task.priority); // Add class based on priority

    li.innerHTML = `
      <span onclick="toggleComplete(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  saveTasks();
  displayTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
