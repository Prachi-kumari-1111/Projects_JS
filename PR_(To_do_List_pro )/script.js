const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const filters = document.querySelectorAll(".filter-btn");
const taskCount = document.getElementById("taskCount");

function updateCount() {
  const total = taskList.querySelectorAll("li").length;
  taskCount.textContent = `${total} items`;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    applyFilter();
  });

  // delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateCount();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  updateCount();
}

function clearAll() {
  taskList.innerHTML = "";
  updateCount();
}

function applyFilter() {
  const activeFilter = document.querySelector(".filter-btn.active").dataset.filter;
  const tasks = taskList.querySelectorAll("li");

  tasks.forEach(task => {
    switch (activeFilter) {
      case "all":
        task.style.display = "flex";
        break;
      case "active":
        task.style.display = task.classList.contains("completed") ? "none" : "flex";
        break;
      case "completed":
        task.style.display = task.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

clearBtn.addEventListener("click", clearAll);

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter();
  });
});
