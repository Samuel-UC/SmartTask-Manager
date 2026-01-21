# TaskFlow-Pro — Sistema Inteligente de Gestión de Tareas

[![JS: Vanilla](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS: 3](https://img.shields.io/badge/CSS-3-blue.svg)](https://www.w3.org/Style/CSS/)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 📌 Descripción General
**TaskFlow-Pro** es una aplicación web ligera y de alto rendimiento diseñada para la productividad personal. Construida con **JavaScript Vanilla** puro, permite a los usuarios organizar su vida diaria a través de una interfaz inteligente que admite prioridades, categorías y fechas de entrega.

La aplicación integra la **API de Notificaciones del Navegador** para alertar sobre tareas próximas a vencer y utiliza `localStorage` para garantizar la persistencia de los datos sin necesidad de una base de datos externa.

---

## 🚀 Características Clave
* **Ciclo CRUD Completo:** Crear, leer, actualizar y eliminar tareas de forma fluida.
* **Ordenamiento Inteligente:** Organiza tareas por Prioridad, Nombre o Fecha de Vencimiento.
* **Filtrado por Categorías:** Clasifica tu flujo de trabajo en Personal, Trabajo, Estudio u Otros.
* **Modo Oscuro Persistente:** Motor de temas personalizado que recuerda la preferencia visual del usuario.
* **Alertas de Fecha Límite:** Notificaciones nativas del navegador para tareas que vencen en menos de 24 horas.
* **Persistencia de Datos:** Sincronización automática con el almacenamiento local del navegador (Local Storage).

---

## 🛠️ Aspectos Técnicos Destacados

### 1. Lógica de Ordenamiento Dinámico
El sistema utiliza un mapeo personalizado para gestionar el orden por prioridad, convirtiendo valores de texto en pesos numéricos para un ordenamiento preciso.

```javascript
function sortTasks(tasks, criterion) {
    if (criterion === 'priority') {
        return tasks.sort((a, b) => {
            const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
    // ... lógica adicional para nombres y fechas
}
2. Motor de Notificaciones Nativas
Uno de los puntos más profesionales del proyecto es la integración de la Notification API, que verifica los plazos en tiempo real.

JavaScript
const dueDate = new Date(task.dueDate);
const currentTime = new Date();

if (dueDate - currentTime < 24 * 60 * 60 * 1000 && dueDate - currentTime > 0) {
    new Notification('Tarea próxima a vencer', {
        body: `¡La tarea "${task.name}" vence pronto!`,
        icon: 'notification-icon.png'
    });
}
3. Gestión de Estado del Tema
La aplicación implementa un interruptor de tema que se sincroniza tanto con la preferencia del sistema operativo (prefers-color-scheme) como con la selección manual del usuario.

JavaScript
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-theme', isDarkMode);
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}
📂 Estructura del Proyecto
Plaintext
TaskFlow-Pro/
├── index.html      # Estructura HTML5 Semántica
├── styles.css      # Motor de Temas y Diseño Responsivo
├── script.js       # Lógica de Negocio y Manipulación del DOM
└── README.md
🔧 Instalación y Uso
Clona este repositorio:

Bash
git clone [https://github.com/tu-usuario/TaskFlow-Pro.git](https://github.com/tu-usuario/TaskFlow-Pro.git)
Abre el archivo index.html en tu navegador preferido.

Importante: Acepta los permisos de notificación cuando se te solicite para habilitar las alertas de vencimiento.

📈 Hoja de Ruta (Roadmap)
[ ] Reordenamiento de tareas mediante Drag-and-drop.

[ ] Funcionalidad para tareas recurrentes.

[ ] Exportación de lista de tareas a CSV/JSON.

[ ] Integración con la API de Google Calendar.

📄 Licencia
Este proyecto está bajo la Licencia MIT.

Desarrollado para un alto rendimiento y productividad.