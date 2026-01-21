# TaskFlow-Pro — Smart Task Management System

[![JS: Vanilla](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS:3](https://img.shields.io/badge/CSS-3-blue.svg)](https://www.w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 📌 Overview
**TaskFlow-Pro** is a lightweight, high-performance web application designed for personal productivity. Built with pure **Vanilla JavaScript**, it allows users to organize their daily life through a smart interface that supports priorities, categories, and deadlines.

The application features **Browser Notification API** integration to alert users about upcoming tasks and utilizes `localStorage` to ensure data persistence without the need for a backend database.

---

## 🚀 Key Features
* **Full CRUD Lifecycle:** Create, Read, Update, and Delete tasks seamlessly.
* **Smart Sorting:** Organize tasks by Priority, Name, or Due Date.
* **Category Filtering:** Segregate your workflow into Personal, Work, Study, or Other.
* **Persistent Dark Mode:** A custom theme engine that remembers your visual preference.
* **Deadline Alerts:** Native browser notifications for tasks due within 24 hours.
* **Data Persistence:** Automatic synchronization with the browser's Local Storage.

---

## 🛠️ Technical Highlights

### 1. Dynamic Sorting Logic
The system uses a custom mapping to handle priority-based sorting, converting string values into numerical weights for accurate ordering.

```javascript
function sortTasks(tasks, criterion) {
    if (criterion === 'priority') {
        return tasks.sort((a, b) => {
            const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
    // ... logic for name and date sorting
}
2. Native Notification Engine
One of the most professional aspects of this project is the integration of the Notification API, which checks deadlines in real-time.

JavaScript
const dueDate = new Date(task.dueDate);
const currentTime = new Date();
if (dueDate - currentTime < 24 * 60 * 60 * 1000 && dueDate - currentTime > 0) {
    new Notification('Task Due Soon', {
        body: `Task "${task.name}" is due soon!`,
        icon: 'notification-icon.png'
    });
}
3. Theme State Management
The application implements a theme toggle that syncs with both the OS preference (prefers-color-scheme) and the user's manual selection.

JavaScript
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-theme', isDarkMode);
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}
📂 Project Structure
Plaintext
TaskFlow-Pro/
├── index.html      # Semantic HTML5 Structure
├── styles.css      # Custom Theme Engine & Responsive Layout
├── script.js      # Core Business Logic & DOM Manipulation
└── README.md
🔧 Installation & Usage
Clone this repository:

Bash
git clone [https://github.com/your-username/TaskFlow-Pro.git](https://github.com/your-username/TaskFlow-Pro.git)
Open index.html in your favorite web browser.

Important: Allow notification permissions when prompted to enable deadline alerts.

📈 Future Roadmap
[ ] Drag-and-drop task reordering.

[ ] Recurring task functionality.

[ ] Export task list to CSV/JSON.

[ ] Integration with Google Calendar API.

📄 License
This project is licensed under the MIT License.

Developed for high-performance productivity.