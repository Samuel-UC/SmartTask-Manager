document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date');
    const categorySelect = document.getElementById('category-select');
    const sortSelect = document.getElementById('sort-select');
    const categoryFilter = document.getElementById('category-filter');
    const taskList = document.getElementById('task-list');
    const themeToggle = document.getElementById('theme-toggle');
    let isDarkMode = false;

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        // Sort tasks based on selected criterion
        const sortedTasks = sortTasks(tasks.filter(task => categoryFilter.value === 'all' || task.category === categoryFilter.value), sortSelect.value);
        sortedTasks.forEach((task, index) => {
            const li = document.createElement('li');

            const taskNameSpan = document.createElement('span');
            taskNameSpan.textContent = task.name;
            if (task.completed) {
                taskNameSpan.classList.add('completed');
            }
            li.appendChild(taskNameSpan);

            const taskDetailsSpan = document.createElement('span');
            taskDetailsSpan.textContent = ` (Priority: ${task.priority}, Due Date: ${task.dueDate}, Category: ${task.category}, Created: ${task.created})`;
            li.appendChild(taskDetailsSpan);

            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.addEventListener('click', () => {
                const newTaskName = prompt('Enter new task name:', task.name);
                if (newTaskName !== null && newTaskName.trim() !== '') {
                    tasks[index].name = newTaskName.trim();
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                }
            });
            li.appendChild(editButton);

            const completeButton = document.createElement('button');
            completeButton.innerHTML = '<i class="fas fa-check"></i>';
            completeButton.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            li.appendChild(completeButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            li.appendChild(deleteButton);

            taskList.appendChild(li);

            // Check if the task is due soon (within 24 hours) and show a notification
            const dueDate = new Date(task.dueDate);
            const currentTime = new Date();
            if (dueDate - currentTime < 24 * 60 * 60 * 1000 && dueDate - currentTime > 0) {
                const notificationOptions = {
                    body: `Task "${task.name}" is due soon!`,
                    icon: 'notification-icon.png'
                };
                const notification = new Notification('Task Due Soon', notificationOptions);
            }
        });
    }

    // Function to sort tasks
    function sortTasks(tasks, criterion) {
        if (criterion === 'priority') {
            return tasks.sort((a, b) => {
                const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        } else if (criterion === 'name') {
            return tasks.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        } else if (criterion === 'dueDate') {
            return tasks.sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        }
        return tasks;
    }

    renderTasks();

    // Add task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;
        const category = categorySelect.value;
        if (taskName !== '') {
            const currentDate = new Date().toLocaleString();
            tasks.push({ name: taskName, completed: false, priority: priority, dueDate: dueDate, category: category, created: currentDate });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
            dueDateInput.value = '';
        }
    });

    // Sort and filter tasks when selection changes
    sortSelect.addEventListener('change', renderTasks);
    categoryFilter.addEventListener('change', renderTasks);

    // Request permission for notifications
    Notification.requestPermission();

    // Function to toggle theme
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-theme', isDarkMode);
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', toggleTheme);

    // Initial theme based on user preference or time of day
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (localStorage.getItem('theme') === 'dark' || (prefersDarkScheme.matches && !localStorage.getItem('theme'))) {
        toggleTheme();
    }
});
