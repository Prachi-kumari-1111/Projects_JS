document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    const inputField = document.querySelector('#newtask input');
    const addButton = document.querySelector('#push');

    // Add Task (Button Click)
    addButton.addEventListener("click", () => {
        addTaskFromInput();
    });

    // Add Task (Enter Key)
    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTaskFromInput();
        }
    });

    // Clear All Tasks
    document.querySelector('#clearAll').addEventListener("click", () => {
        document.querySelector("#tasks").innerHTML = "";
        localStorage.removeItem("tasks");
    });
});

// Function to add task from input field
function addTaskFromInput() {
    let taskValue = document.querySelector('#newtask input').value.trim();

    if (taskValue.length === 0) {
        alert("Please Enter a Task");
    } else {
        addTask(taskValue, false);
        document.querySelector("#newtask input").value = "";
        saveTasks();
    }
}

function addTask(taskText, completed) {
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task");
    if (completed) taskContainer.classList.add("completed");

    taskContainer.innerHTML = `
        <span class="taskname">${taskText}</span>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    `;

    // Delete
    taskContainer.querySelector(".delete").addEventListener("click", function (e) {
        e.stopPropagation(); // prevent toggling complete
        taskContainer.remove();
        saveTasks();
    });

    // Complete toggle
    taskContainer.addEventListener("click", function (e) {
        if (!e.target.classList.contains("delete") && !e.target.closest("button")) {
            taskContainer.classList.toggle("completed");
            saveTasks();
        }
    });

    document.querySelector("#tasks").appendChild(taskContainer);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push({
            text: task.querySelector(".taskname").innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        try {
            JSON.parse(savedTasks).forEach(task => {
                addTask(task.text, task.completed);
            });
        } catch (e) {
            console.error("Corrupted tasks in localStorage, clearing...", e);
            localStorage.removeItem("tasks"); // reset if data is invalid
        }
    }
}